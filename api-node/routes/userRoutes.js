const route = require('express').Router();

const User = require('../models/User')

//Criar Usuário
route.post('/', async (req,res) => {
    const {matricula, email, password} = req.body

    const user = {
        matricula,
        email,
        password
    }
    try{
        await User.create(user)
        
        res.status(201).json({message: 'Usuário registrado com sucesso!!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

route.patch('/:id', async (req,res) => {
    const id = req.params.id

    const {matricula, email, password} = req.body

    const user = {
        matricula,
        email,
        password
    }

    try{
        const updateUser = await User.updateOne({_id: id}, user)
    } catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = route