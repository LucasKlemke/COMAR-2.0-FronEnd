
# Instruções

1. npm i
2. npm run dev (backend)
3. npm run dev (front end)
4. Criar usuario no banco de dados
(obs : o campo email não é mais pra email, seria pra usuario,porem o nome continua email, pode escrever qualquer coisa que vai dar bom)
5. Logar

# ERROS
1. Se der erro verifica se o banco esta rodando, verifica se o back esta rodando tambem, e tambem verifica se os dominios tanto do back quanto do front estao certos

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

