function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'Error 400: You should provide a good ID please(it must be an integer)' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const { general, confidential } = req.body

    if (general && confidential ) {
        next()
    } else {
        res.status(400).json({ message: 'Error 400: The fields you provided are not good,
            there are mendatory fields(keys) like "general" and "confidential" 
            -->Reffer to the documentation(README.md file) to see how to write them!' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}