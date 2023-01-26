
const uploadError = (error, req, res, next) =>  {
    
    res.send(400).send({ error: error.message })

    next()
}

module.exports = uploadError