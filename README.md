O principal objetivo é simular um MVP de um aplicativo de gestão de RH com dois tipos de usuários: o usuário comum (funcionário) com acesso limitado a funcionalidades, e o usuário administrador responsável por gerenciar toda a aplicação. O desafio principal será identificar cada usuário e determinar suas permissões na aplicação.

A API já existente deve ser consumida a partir do repositório fornecido, com uma documentação simplificada disponível.

A aplicação web deve conter pelo menos 3 páginas principais:

Página Inicial: Exibir todas as empresas cadastradas e permitir filtrar por categoria. Deve também redirecionar ou criar os modais para que o usuário faça cadastro e/ou login.
Página/modal de Cadastro: Permitir a criação de novos usuários (não administradores).
Página/modal de Login: Realizar o login e direcionar o usuário para sua respectiva área.
Página do Usuário Comum: Renderizar as informações do usuário, nome, email, empresa e departamento que trabalha e colegas de departamento.

**Usando a API**
Para utilização desta API você precisa seguir os seguintes passos:
1. Clone este repositório em sua máquina, em uma pasta separada da pasta da aplicação (https://github.com/Kenzie-Academy-Brasil-Developers/kenzie-empresas-API);
2. Acesse o repositório clonado através de um terminal, pode ser o terminal integrado do vsCode ou o terminal do seu computador;
3. Digite o seguinte comando no terminal npm install, isso fará com que todas as dependências do projeto sejam instaladas
4. Digite o comando npm run start, isso criará o arquivo database.db na raiz do seu repositório, em outras palavras, criará o banco de dados da aplicação;
5. Digite o comando npm run build, isso populará o banco de dados, criando o usuário ADM, alguns usuários comuns, os setores(categorias), as empresas e alguns departamentos;
6. Digite o comando npm run dev, isso colocará a API em funcionamento no seguinte endereço: http://localhost:3333
7. Utilize a API normalmente
obs. Os passos 3, 4, 5 devem ser executados apenas uma vez!

**Tecnologias**: HTML, CSS, Javascript
**Link**: https://mvp-of-an-hr-management-application.vercel.app/
