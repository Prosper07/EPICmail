function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'Err 400: You should provide a good ID please(it must be an integer)' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const { name } = req.body

    if (name) {
        next()
    } else {
        res.status(400).json({ message: 'Err 400: The name of the group is mendatory.Reffere to the documentation(README.md file) to see how to write them!' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}