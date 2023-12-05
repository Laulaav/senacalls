const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');

server.use(cors())

//Metodo para Ler JSON
server.use(
    express.urlencoded({
        extended: true
    })
)
server.use(express.json())

//Inicial
server.get('/', (req,res) =>{
    res.json({message: 'Iniciado com Sucesso!!'})
})


//Rotas
const callRoutes = require('./routes/callRoutes')
server.use('/call', callRoutes)

const userRoutes = require('./routes/userRoutes')
server.use('/user', userRoutes)

//Conexão com Banco
mongoose.connect('mongodb+srv://server:sZcfTzXh2xPWOIwT@api-cluster.qfiw8sf.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Database Connected')
    server.listen(3000)
})
.catch((err) => console.log(err))




