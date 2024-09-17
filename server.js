const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const app = express();
const PORT = 3001;


//Middleware de Autentificação de Sessão
app.use(session({
    secret: 'senai456',
    resave: false,
    saveUninitialized:true,
    cookie: {secure:false}
}))

const authRoutes = require('./routes/auth');
const routesPaginas = require('./routes/paginas');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

//Rotas de Páginas do Sistema - Com permissões de acesso
app.use('/api/auth', authRoutes)

app.use('/', routesPaginas)
app.use('/api/paginas', routesPaginas);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
