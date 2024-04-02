# Cadastro de Funcionários para Empresas de RH

Este projeto consiste em uma interface de cadastro de funcionários para empresas de Recursos Humanos. A aplicação permite que os usuários cadastrem novos funcionários, escolhendo em qual empresa o funcionário será inserido, e também possibilita a visualização e edição dos dados dos funcionários cadastrados.

## Funcionalidades

1. Cadastro de novos funcionários com nome, CPF, RG, data de nascimento, email, telefone, endereço, setor e cargo.
2. Validação dos campos obrigatórios.

3. Verificação para evitar que dois funcionários tenham o mesmo CPF, inclusive em empresas diferentes.

4. Captura automática do endereço do funcionário com Google Maps.
5. Listagem dos funcionários cadastrados por empresa.
6. Inativação de um funcionário em determinada empresa.
7. Edição dos dados de um funcionário.
8. Alteração da ordem dos cards por meio de drag and drop.

## Tecnologias Utilizadas
- As principais tecnologias utilizadas no desenvolvimento do projeto foram:

1. React
2. Next.js
3. TypeScript
4. React Hook Form + Zod
5. Google Maps Api
6. Json-server
7. React-dnd
- Entre várias outras para criar outras funcionalidades.

## Instalação e Execução

Clone o repositório:
```bash
git clone https://github.com/MBWF/teste-onyma.git
```

Instale todas as dependências do projeto:
```bash
cd teste-onyma
yarn install
```

Adicione a variáveis de ambiente para a api do Google Maps no arquivo .env.local:
-  Sei que não é recomendado deixar a chave de API exposta em um repositório público, mas para fins de teste, deixarei a minha da API do Google Maps para facilitar a execução do projeto.
```bash
NEXT_PUBLIC_GOOGLE_API_KEY="AIzaSyCLozxCUYPp5qYSP8atSFq_pZoymCoyrlk"
```

Inicie PRIMEIRO o json-server para simular a API que irá atuar na porta localhost:3000:
```bash
yarn json-server db.json
```

Inicie o projeto que irá atuar na porta localhost:3001:
```bash
yarn dev
```

Para iniciar os testes E2E, execute o seguinte comando:
```bash
yarn cypress open
```

## Considerações Finais

O projeto foi desenvolvido com o intuito de demonstrar as habilidades do desenvolvedor em relação ao desenvolvimento de aplicações web utilizando React, Next.js e TypeScript. A aplicação foi desenvolvida com base nas funcionalidades solicitadas e também com algumas funcionalidades extras que foram implementadas para enriquecer a experiência do usuário.

Feito com ❤️ por Márcio Filho
