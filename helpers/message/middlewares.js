function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'Error 400: You should provide a good ID please(it must be an integer)' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const { subject, message, parentMessageId, status } = req.body

    if (subject && message && parentMessageId && status) {
        next()
    } else {
        res.status(400).json({ message: 'Error 400: The fields you provides are not good (Reffer to the docimentation please)!' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}