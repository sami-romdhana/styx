import { NotFound } from "@/components/NotFound";
import { Header } from "@/components/Header";

export default async function Game() {
  return (
    <>
      <Header />
      <NotFound />
    </>
  );
}
