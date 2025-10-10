import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/sobre-mim");
  return null;
}
