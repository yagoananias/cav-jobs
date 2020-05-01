const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

/*
Informa Express que estamos utilizando json no body
Express converte a requisição em json para que a aplicação entenda
*/
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

