function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'Err 400: You should provide a good ID please(it must be an integer)' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const { subject, message } = req.body

    if (subject && message) {
        next()
    } else {
        res.status(400).json({ message: 'Err 400: There are mendatory fields(keys) like subject and message.Reffere to the documentation(README.md file) to see how to write them!' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}