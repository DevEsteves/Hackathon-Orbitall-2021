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

api.findById = function (request, response) {
    const id = request.params.id
    neDB.findOne({ _id: id }, function (exception, card) {
        if (exception) {
            jsonAsError = { message: exception }
            response.json(jsonAsError)
            response.status(exception.status | 501).end()
        }
        response.json(card)
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

api.update = function (request, response) {
    const primaryKey = request.params.id
    const canonical = request.body
    neDB.update({ _id: primaryKey }, canonical, (exception, hadUpdated) => {
        if (exception) {
            jsonAsError = { message: exception }
            response.json(jsonAsError)
            response.status(exception.status | 501).end()
        }
        if (hadUpdated) {
            canonical._id = primaryKey
            response.json(canonical)
        } else {
            jsonAsError = { message: exception }
            response.json(jsonAsError)
            response.status(exception.status | 501).end()
        }
    })
}

api.delete = function (request, res) {
    const primaryKey = request.params.id
    neDB.remove({ _id: primaryKey }, {}, (exception, hadDeleted) => {
        if (exception) {
            jsonAsError = { message: exception }
            response.json(jsonAsError)
            response.status(exception.status | 501).end()
        }
        if (hadDeleted) {
            res.json({ 'message': `Card id '${primaryKey}' had been deleted successfuly` })
            res.status(200)
        } else {
            jsonAsError = { message: exception }
            response.json(jsonAsError)
            response.status(exception.status | 501).end()
        }
    })
}

api.paginationAndSorting = (request, response) => {
    const page = request.query.page
    const limit = request.query.limit

    console.log(`page ${page}`)
    console.log(`limit ${limit}`)

    neDB.find({}).sort({ name: 1 }).skip(page).limit(limit).exec((exception, cards) => {
        if (exception) {
            jsonAsError = { message: exception }
            response.json(jsonAsError)
            response.status(exception.status | 501).end()
        }
        response.json(cards)
    })
}

module.exports = api