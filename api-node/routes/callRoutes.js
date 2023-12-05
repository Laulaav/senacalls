const route = require('express').Router();

const Call = require('../models/Call')

//Criar Chamados
route.post('/', async (req, res) => {
    const{computer, code, room, issue, image, type} = req.body

    if(!computer || !code || !room || !issue || !image || !type) {
        res.status(422).json({error: 'Preencha todos os dados!!'})
        return
    }

    const call = {
        computer,
        code,
        room,
        issue,
        image,
        type
    }

    try{
        await Call.create(call)

        res.status(201).json({message: 'Chamado registrado com Sucesso!!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})


//Listar Chamados
route.get('/list', async (req,res) => {
    try {
        const call = await Call.find()

        res.status(200).json(call)
    } catch (error) {
        res.status(500).json(error)
    }
})

route.patch('/:id', async (req,res) => {

    const id = req.params.id

    const {computer, code, room, issue, image, type} = req.body

    const call = {
        computer,
        code,
        room,
        issue,
        image,
        type
    }

    try {
        const updateCall = await Call.updateOne({_id: id}, call)

        if(updateCall.matchedCount === 0){
            res.status(422).json({error: 'Chamado não Encontrada'})
        }

        res.status(200).json(call)
    } catch (error) {
        res.status(500).json({error: error})
    }
})


route.delete('/:id', async (req,res) => {
    const id = req.params.id

    const call = await Call.findOne({_id:id})
    
    if(!call){
        res.status(422).json({error: 'Chamado não Encontrado'})
        return
    }

    try {
        await Call.deleteOne({_id: id})

        res.status(200).json({message: 'Chamado Deletado com Sucesso!!'})
    } catch (error){
        res.status(500).json({error: error})
    }


})



module.exports = route