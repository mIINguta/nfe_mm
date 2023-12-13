const express = require('express');
const app = express();
const PORT = process.env.port || 5050;

//pegando dados do formulário
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// configurando rotas get
app.use('/', require('./src/routes/pages'));
app.set("view engine", "ejs");

//configurando rotas post
app.use("/auth", require('./src/routes/auth'));




app.listen(PORT, () => console.log(`Servidor esta ligado`));