const neDB = require('../configurations/database')
const api = {}

api.findAll = (request, response) => {
    neDB.find({}).sort({ id: 1 }).exec((exception, cards) => {
        if (exception) {
            const sentence = 'Deu ruim na tentativa de listar todos os Cards!'
            console.log(sentence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        response.json(cards)
    })
}

api.save = (request, response) => {
const canonical = request.body
    neDB.insert(canonical, (exception, cards) => {
        if (exception) {
            const sentence = 'Deu ruim na tentativa de listar todos os Cards!'
            console.log(sentence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': sentence })
        }
        response.status(201)
        response.json(cards)
    })
}


module.exports = api