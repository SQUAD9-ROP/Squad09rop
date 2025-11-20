ROP: Registro de Ocorrência Policial (App PM Mobile)
1. Descrição do Projeto
O ROP (Registro de Ocorrência Policial) é uma aplicação móvel desenvolvida em React Native, destinada a simplificar e agilizar o registro de ocorrências
policiais em campo. O objetivo principal é guiar o policial militar através de um fluxo estruturado de telas para a coleta completa e sequencial de dados, desde a identificação do fato até o relatório final consolidado.

A aplicação garante a persistência e a correta acumulação de dados críticos (Fato, Pessoas, Endereço, Apreensões) entre as diferentes etapas, culminando na geração de um token único de relatório e no envio
posterior ao sistema de gestão central (Backend).

2. Fluxo de Telas do Aplicativo
O aplicativo segue um fluxo de trabalho bem definido para garantir a integridade e a ordem dos dados coletados. As principais etapas de navegação são:

Tela Inicial: Ponto de partida, oferecendo opções de Login ou Cadastro.

Login Direto: Acesso para policiais já cadastrados.
Cadastro Principal: Criação de uma nova conta de usuário policial.
Menu Principal: Tela de navegação principal após o login. Início de um novo R.O.
Dados do Fato: Coleta de informações iniciais sobre a ocorrência (data, hora, natureza, etc.).
Dados Pessoais do Envolvido: Registro de informações dos envolvidos (vítimas, autores, testemunhas).
Endereço do Envolvido: Localização detalhada de cada envolvido.
Características do Envolvido: Enquadramento legal e descrição das características do envolvido.
Apreensões: Tela de coleta de itens (Armas, Drogas, Veículos, Dinheiro).
Relatório Final: Tela de Resumo e Histórico. Acumula todos os dados das telas anteriores e gera o Token Único de identificação (NU-XXXXXX-YYY).
Final Relatório: Tela de Envio ao Backend. É o ponto onde o relatório é salvo no servidor e, após confirmação de sucesso, o aplicativo retorna ao Menu Principal.

3. Funcionalidades Principais
   
Fluxo de Trabalho Estruturado: Sistema de navegação sequencial que força a completude dos dados.
Autenticação: Suporte a Login direto e Cadastro de novos usuários.
Acumulação de Dados: O objeto de ocorrência é construído incrementalmente, garantindo que todos os dados sejam persistidos e levados até a tela de envio.
Geração de Token Único: Criação de um identificador para rastreabilidade (NU-XXXXXX-YYY).
Validação: Validação mínima obrigatória para o campo Histórico/Narrativa (mínimo de 50 caracteres).

4. Tecnologias Utilizadas
   
Framework: React Native
Linguagem: JavaScript / ES6+
Navegação: React Navigation
Ícones: @expo/vector-icons (FontAwesome, MaterialCommunityIcons).
Plataformas: Android.

5. Configuração e Instalação
5.1. Pré-requisitos
Certifique-se de ter o Node.js, o npm (ou Yarn) e o Expo CLI instalados em sua máquina.
Bash

# Instalar o Expo CLI globalmente (se não tiver)
npm install -g expo-cli
5.2. Clonando o Repositório
Clonar o repositório do GitHub e navegar até o diretório do projeto:

Bash

git clone https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories
cd nome-do-diretorio-do-app
5.3. Instalação de Dependências
Instalar todas as dependências do projeto:

Bash

# Usando npm
npm install

# Ou usando Yarn
yarn install
5.4. Executando o Aplicativo
Para rodar o aplicativo em um emulador ou em seu dispositivo físico via Expo Go:

Bash

Após executar o comando, o terminal abrirá um menu interativo. Utilize as opções para abrir a aplicação em um emulador Android ou iOS, ou escaneie o QR Code usando o aplicativo Expo Go em seu celular.

expo start
Após executar o comando, o terminal abrirá um menu interativo. Utilize as opções para abrir a aplicação em um emulador Android ou iOS, ou escaneie o QR Code usando o aplicativo Expo Go em seu celular.
