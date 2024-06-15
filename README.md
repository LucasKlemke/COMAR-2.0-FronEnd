# Integrantes

Daniel Douglas dos Santos  
Felipe Obertier Gesser  
Guilherme Mafra Paluski  
Gustavo Mafra Paluski  
Lucas Antônio Daniel  
Lucas Affonso Klemke

# Instituto Comar

O projeto realizado para o Instituto Comar possui a finalidade de fazer a gestão de projetos da ONG, como criação e exclusão dos projetos, além de cadastrar os usuários.

# Tecnologias Utilizadas

- [JavaScript]
- [MySQL]
- [HTML]
- [CSS]
- [Node]
- [React]
- [Vite]
- [MUI]


# Instruções

1. Digite 'npm i' no console para instalar os pacotes npm necessários.
2. Após isso, vá para a pasta Backend e digite 'npm run dev' no terminal (backend).
3. Agora, dentro da pasta de frontend, digite 'npm run dev' no terminal (front end).
4. Agora, acesse a tabela do banco de dados e cria um usuário para entrar no sistema (siga o modelo de banco de dados representado na pasta script).
5. Após criar o usuário, faça login.

# ERROS
1. Sempre verifique se tanto o *banco de dados*, o *backend* e o *frontend* estão sendo executados.

# Mapeamento
1. Começa no App.jsx (definicao de rotas)
2. rota /login vai para SingIn.jsx
3. rota /system vai para System.jsx
4. Se tentar entrar no /system sem estar com o login (auth) dentro do localstorage, ele vai redirecionar para o /login
(caso aconteça, verifique se criou o usuario no banco de dados para acessar o sistema)
5. Dentro System tem o Header e o Content, Header vai para Header.jsx que é o cabeçalho e Content vai para o conteudo da pagina, Content.jsx

# Fazer:
0. Estudar um pouco de react para mexer no front ( não é dificil )
1. Hash de senha no back e adaptar o front para o hash
2. Tolken do backend e adaptar o front para inserção de tolken de inspiração
3. Procurar um host ( URGENTE )
4. Procurar por bugs e resolve-los
5. Tirar a senha do localstorage (isso tem que ver no token)
6. Procurar host free para testar o projeto
7. Utilizar e testar o programa para resolver os bugs

# BOA SORTE AMIGOS

