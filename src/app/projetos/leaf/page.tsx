import Link from "next/link";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Leaf: linguagem de script tipada e sem GC, embarcável em Rust",
  description:
    "Linguagem de script estaticamente tipada para jogos, compilada para bytecode de uma VM de registradores, sem coletor de lixo e sem panic. Por que escrever uma em vez de usar Lua, Rhai ou Rune.",
  path: "/projetos/leaf",
  absoluteTitle: true,
});

const EXAMPLE = `@implements(Atualizavel)

@export(min=0, max=100) let vida: int = 100
let tempo: float = 0.0

pub def atualizar(dt: float) -> void:
\ttempo = tempo + dt
\tif vida <= 0:
\t\tconsole.log("morreu")

pub def dano(v: int) -> void:
\tvida = vida - v`;

const ANNOTATIONS = `@implements(Atualizavel)

@export(min=0, max=100, step=1) let vida: int = 100
@export(values=["copas", "paus", "ouro", "espada"]) let naipe: string`;

const TRAIT_ERROR = `error: script "inimigo" declara @implements(Atualizavel)
       mas não satisfaz a trait
  --> inimigo.leaf:1:1
  - método faltando: atualizar(float) -> void
  - assinatura incorreta: obter_descricao
      esperado:    () -> string
      encontrado: (int) -> string`;

const LeafPage = () => {
  return (
    <div className="contentPage">
      <h1>Leaf — uma linguagem de script embarcável em Rust</h1>

      <p>
        <strong>Em construção.</strong> A especificação da linguagem está
        fechada e o plano de implementação está escrito — 27 etapas em 6 fases.
        O compilador ainda não existe. Esta página é sobre por que a linguagem
        precisa existir e quais decisões já foram tomadas.
      </p>

      <h2>O problema que originou a linguagem</h2>
      <p>
        No <Link href="/projetos/rustle">Rustle</Link>, a engine de jogos que
        estou escrevendo em Rust, criar um componente novo exige recompilar o
        projeto inteiro.
      </p>
      <p>
        A causa está numa decisão anterior, e correta. Para integrar componentes
        ao editor eu escolhi WebAssembly em vez de biblioteca nativa, porque a
        ABI do Rust não é estável — um plugin compilado com uma versão do
        compilador pode simplesmente não carregar em outra.
      </p>
      <p>
        O WebAssembly resolveu isso e trouxe um ganho que não estava no plano:
        ele carrega o schema junto. O editor inspeciona o módulo, descobre quais
        campos ele exporta, de que tipo e com quais limites, e monta o painel de
        propriedades sozinho. Nunca precisei escrever interface para um
        componente.
      </p>
      <p>O preço foi o ciclo. Toda alteração passa pelo compilador.</p>

      <h2>Por que não usar uma linguagem pronta</h2>
      <p>
        É a pergunta óbvia, e eu não a respondi lendo documentação — respondi
        construindo. A prova de conceito da engine tem uma camada de script
        inteira em Rune, com ciclo de vida completo, schema para o editor e
        módulos carregados sem recompilar. Funcionou. E foi usando que os
        limites apareceram.
      </p>
      <p>
        Um módulo em Rune não pode segurar uma referência à cena. A consequência
        é que ele não executa ações no mundo: ele <em>retorna</em> uma lista de
        efeitos — <code>despawn</code>, <code>emit</code> — que o hospedeiro
        traduz e aplica. Também não dá para registrar tipos Rust próprios na VM,
        então tudo atravessa a fronteira como dado genérico. E o próprio README
        que escrevi na época já avisava para deixar o trabalho pesado no núcleo
        nativo.
      </p>
      <p>
        Nada disso é falha do Rune. São consequências de um projeto que não foi
        feito para esse uso. O mesmo vale para Lua e Rhai, que também avaliei.
      </p>

      <h2>Os cinco requisitos</h2>
      <p>
        Escrever a minha deixou de ser capricho quando ficou claro que eu
        precisava das cinco coisas ao mesmo tempo:
      </p>
      <ul>
        <li>
          <strong>Tipagem estática</strong> — requisito, não preferência
          estética
        </li>
        <li>
          <strong>Compilada para uma VM</strong>, não interpretada a partir da
          árvore sintática
        </li>
        <li>
          <strong>Integração nativa com Rust</strong>, sem marshalling de dados
          na fronteira
        </li>
        <li>
          <strong>Sem coletor de lixo</strong> — pausa imprevisível é
          inaceitável num loop de frame
        </li>
        <li>
          <strong>Sem panic na VM</strong> — um script mal escrito não pode
          derrubar o editor
        </li>
      </ul>
      <p>Cada linguagem que avaliei atende algumas. Nenhuma atende todas.</p>

      <h2>Como Leaf se parece</h2>
      <pre>
        <code>{EXAMPLE}</code>
      </pre>
      <p>
        A sintaxe é próxima da de Python — <code>def</code>, dois-pontos, blocos
        por indentação — só que com o tipo de tudo escrito explicitamente. As
        linhas que começam com <code>@</code> são anotações, e elas merecem
        seção própria.
      </p>

      <h2>Anotações</h2>
      <p>
        Uma anotação é um prefixo de declaração, e pode marcar um módulo, uma
        variável, uma função ou um tipo. Parece detalhe de sintaxe, mas é a peça
        que resolve três problemas diferentes de uma vez só.
      </p>
      <pre>
        <code>{ANNOTATIONS}</code>
      </pre>

      <p>
        <strong>Fazem a ponte entre o script e o editor.</strong>{" "}
        <code>@export(min=0, max=100, step=1)</code> não é decoração: é a
        descrição do campo que o editor vai desenhar. O tipo da variável decide
        o widget, os limites decidem a faixa, e <code>values</code> transforma
        uma string num seletor de opções. É a mesma ideia que faz o editor do
        Rustle gerar painéis sozinho a partir dos tipos em Rust, agora
        disponível para quem escreve script — um componente em Leaf ganha sua
        interface de propriedades sem que ninguém escreva interface.
      </p>

      <p>
        <strong>Substituem código repetitivo.</strong>{" "}
        <code>@implements(Atualizavel)</code> declara que o arquivo inteiro é a
        implementação de uma interface. Não há bloco de implementação, não há
        método para encaixar numa estrutura: as funções públicas do script já
        são os métodos. E a economia não é só de digitação — o compilador
        transforma isso numa tabela de despacho, então o motor chama o script
        por índice, sem procurar função por nome em tempo de execução.
      </p>

      <p>
        <strong>Validam.</strong> Como as anotações são tipadas, o compilador
        checa o que elas dizem. <code>min</code> maior que <code>max</code> é
        erro; <code>step</code> zero é erro; cada elemento de{" "}
        <code>values</code> é verificado contra o tipo da variável. E{" "}
        <code>@implements</code> vira uma promessa que o compilador cobra,
        listando tudo o que falta de uma vez em vez de parar no primeiro
        problema:
      </p>
      <pre>
        <code>{TRAIT_ERROR}</code>
      </pre>

      <p>
        O vocabulário também não é fixo. O programa que hospeda a VM registra as
        próprias anotações, com alvo e parâmetros declarados — é assim que uma
        engine ensina aos scripts os conceitos que só ela conhece. E anotação
        desconhecida é <strong>erro de compilação</strong>, o oposto do que
        costuma acontecer com decoradores por aí, onde uma anotação que ninguém
        trata é silenciosamente ignorada e o erro de digitação só aparece quando
        o comportamento esperado não acontece. Para metadados que a VM deve
        mesmo ignorar existe um espaço reservado, <code>@meta</code>.
      </p>

      <h2>Sem coletor de lixo, e sem vazamento</h2>
      <p>
        Contagem de referências é a forma mais simples de gerenciar memória sem
        coletor: cada valor sabe quantos o apontam, e some quando ninguém mais
        aponta. O problema clássico é o ciclo — se A aponta para B e B volta a
        apontar para A, a contagem de nenhum dos dois chega a zero, e os dois
        vazam.
      </p>
      <p>
        A resposta usual é acrescentar um detector de ciclos. Só que um detector
        de ciclos é um coletor de lixo pequeno, com o mesmo defeito: roda quando
        quer e para o mundo enquanto roda.
      </p>
      <p>
        Leaf resolve por construção. <code>Array</code>, <code>Map</code>,{" "}
        <code>string</code> e <code>struct</code> são imutáveis — só o vínculo
        da variável muda, nunca o valor. E um valor imutável não consegue passar
        a apontar para si mesmo depois de criado, porque para construir o filho
        o pai já teria que existir. Sem mutação, não há ciclo; sem ciclo, a
        contagem de referências basta sozinha.
      </p>
      <p>
        É por isso que a imutabilidade aqui é decisão estrutural, e não gosto
        pessoal. Ela é o que compra o "sem coletor de lixo" sem pagar em
        vazamento.
      </p>

      <h2>A VM não entra em pânico</h2>
      <p>
        Toda falha vira valor de retorno. Divisão inteira por zero, estouro de
        índice, overflow — nenhuma derruba o processo; todas sobem como{" "}
        <code>Err</code> para o Rust que chamou, com nome do script, função e
        linha.
      </p>
      <ul>
        <li>
          <strong>Divisão por zero</strong> segue o padrão de Rust e C#, sem o
          pânico: <code>float / 0.0</code> dá <code>inf</code>, que é IEEE 754 e
          não é erro; <code>int / 0</code> vira falha da VM; e dividir por{" "}
          <code>0</code> literal é erro de compilação, porque isso é sempre bug.
        </li>
        <li>
          <strong>Combustível.</strong> Um contador cai a cada volta de laço e a
          cada chamada. Zerou, a execução para com <code>OutOfFuel</code>. Sem
          isso, um <code>while true</code> num script travaria o frame inteiro.
        </li>
        <li>
          <strong>Release não muda a semântica.</strong> Verificação de overflow
          e de limite de coleção nunca são removidas, nem no modo otimizado.
          Isso difere de C e de Rust — e é deliberado: em script de jogo, um
          erro localizado é sempre melhor que um valor errado silencioso.
        </li>
      </ul>

      <h2>Por que tipagem estática</h2>
      <p>
        Depois de anos mantendo sistemas grandes, a conclusão é difícil de
        escapar: em projeto longo ou com várias pessoas, a ausência de tipos
        cobra caro. E não é opinião isolada — linguagens que nasceram sem
        tipagem construíram mecanismos para adicioná-la. Python ganhou anotações
        de tipo; JavaScript ganhou o TypeScript. O mercado votou.
      </p>
      <p>
        Há um segundo motivo, este puramente técnico. Tipos conhecidos em tempo
        de compilação abrem otimizações que uma linguagem dinâmica não pode
        fazer: se a VM sabe que um registrador é um inteiro, ela não precisa
        carregar essa informação em runtime nem verificá-la a cada operação. Em
        Leaf isso é levado ao limite — a VM nunca pergunta "que tipo é isso?",
        porque o código gerado já sabe.
      </p>
      <p>
        E há um terceiro, específico deste caso: o Rustle já usa tipos para
        gerar a interface do editor. Uma linguagem de script tipada preserva
        essa propriedade em vez de quebrá-la.
      </p>

      <h2>Estado atual</h2>
      <p>
        A referência da linguagem está escrita e as decisões estruturais estão
        fechadas — indentação, resolução de nomes, conversão numérica, igualdade
        estrutural, layout de cada tipo na VM. O que ficou de fora da primeira
        versão está listado explicitamente, e a maior parte ficou de fora por
        projeto, não por prazo: não há <code>try</code>/<code>catch</code>, não
        há inferência de tipos, não há operador de identidade de referência.
      </p>
      <p>
        O plano de implementação tem 27 etapas em 6 fases, distribuídas em nove
        crates. Duas regras o organizam:
      </p>
      <ul>
        <li>
          <strong>Esqueleto que anda primeiro.</strong> A fase 1 entrega o
          pipeline completo — fonte, bytecode, execução, retorno ao Rust —
          suportando apenas <code>int</code>. Tudo depois é acrescentar tipo a
          uma máquina que já roda. É a defesa contra o erro clássico de escrever
          parser por três meses sem nunca executar nada.
        </li>
        <li>
          <strong>Critério de fim é teste que passa</strong>, não "está pronto".
          Quando não dá para escrever o teste, o critério está mal formulado.
        </li>
      </ul>

      <h2>Por que a linguagem antes do motor</h2>
      <p>
        A ordem é deliberada. Meu conhecimento de linguagens, estruturas de
        dados e algoritmos é bem mais sólido que meu conhecimento de computação
        gráfica. Começar pelo Leaf significa trabalhar em terreno onde consigo
        julgar minhas próprias decisões — e descobrir até onde levo uma
        linguagem antes de encarar rasterização e pipeline de renderização.
      </p>

      <h2>Competências em destaque</h2>
      <ul>
        <li>
          <strong>Projeto de linguagem:</strong> sistema de tipos sem
          inferência, semântica de valor, escopo de primeira versão definido por
          decisão e não por prazo
        </li>
        <li>
          <strong>Compiladores:</strong> lexer, parser, resolução de nomes,
          verificação de tipos, geração de código para uma VM de registradores
        </li>
        <li>
          <strong>Gerência de memória:</strong> arena com handle geracional,
          contagem de referências sem detector de ciclos
        </li>
        <li>
          <strong>Rust:</strong> separação de estado por quem muda quando, para
          que a VM seja compartilhável entre threads sem trava
        </li>
      </ul>

      <h2>Onde acompanhar</h2>
      <ul>
        <li>
          <Link href="/projetos/rustle">rustle.rs</Link> — a engine que motivou
          a linguagem
        </li>
        <li>
          <a
            href="https://github.com/pmatos2000"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          — o repositório do Leaf ainda não é público
        </li>
      </ul>
    </div>
  );
};

export default LeafPage;
