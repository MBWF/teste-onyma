import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Companies } from "../components/layout/companies";
import { EmployeeContainer } from "../components/layout/employee";
import { CreateEmployeeModal } from "../components/modals/createEmployee";
import { Button } from "../components/ui";
import { api } from "../services/api";
import {
  ContentContainer,
  Footer,
  Header,
  Icon,
  LinkedIn,
  LogoContainer,
  MainContainer,
} from "../styles/pages/Home";
import { Company } from "../types/company";

export default function Home() {
  const [currentCompany, setCurrentCompany] = useState<Company>({} as Company);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getCompanies() {
      const response = await api.get<Company[]>("/companies");

      setAllCompanies(response.data);
      setCurrentCompany(response.data[0]);
    }

    getCompanies();
  }, []);

  return (
    <MainContainer>
      <CreateEmployeeModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        currentCompany={currentCompany}
        setCurrentCompany={setCurrentCompany}
        allCompanies={allCompanies}
      />
      <Head>
        <title>Desafio Frontend - Onyma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <LogoContainer>
          <Image
            alt="Logo da Onyma by Bencorp"
            src="/assets/Logo Onyma by Bencorp.svg"
            width="88px"
            height="53.59px"
            layout="intrinsic"
          />
        </LogoContainer>
      </Header>

      <ContentContainer>
        <Companies
          setCurrentCompany={setCurrentCompany}
          allCompanies={allCompanies}
        />

        <Button
          onClick={() => setIsOpen(true)}
          data-testid="createNewEmployeeButton"
        >
          Cadastrar Funcionário
        </Button>
        {currentCompany && (
          <EmployeeContainer
            currentCompany={currentCompany}
            employees={currentCompany.employees}
            setAllCompanies={setAllCompanies}
            setCurrentCompany={setCurrentCompany}
            allCompanies={allCompanies}
          />
        )}
      </ContentContainer>

      <Footer>
        <p>
          Feito com
          <Icon>
            <Image
              alt="Coração violeta"
              src="/assets/Blob footer.svg"
              width="16px"
              height="10px"
            />
          </Icon>
          pela Onyma
        </p>
        <LinkedIn
          href="https://www.linkedin.com/company/onymadigital/mycompany/"
          target="_blank"
        >
          <FaLinkedinIn />
        </LinkedIn>
      </Footer>
    </MainContainer>
  );
}


