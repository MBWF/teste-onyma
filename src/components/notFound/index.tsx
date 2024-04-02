import Image from "next/image";
import { Text, Title } from "../ui";
import { NotFoundContainer } from "./styles";

export function NotFoundEmployee() {
  return (
    <NotFoundContainer>
      <Image
        src="/assets/empty-page.webp"
        alt="Nenhum funcionário cadastrado"
        width="500px"
        height="320px"
        style={{ mixBlendMode: "multiply" }}
      />
      <Title>Ainda não há funcionários cadastrados nesta empresa.</Title>
    </NotFoundContainer>
  );
}
