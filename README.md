
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
5. Dentro System tem o <Header/> e o <Content/>, Header vai para Header.jsx que é o cabeçalho e Content vai para o conteudo da pagina, Content.jsx
