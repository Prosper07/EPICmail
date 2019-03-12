const express = require('express')
const router = express.Router()

router.use('/api/v1/messages', require('./post.routes'))
router.use('/api/v1/users', require('../user/post.routes'))
router.use('/api/v1/signin', require('../signin/post.routes'))

module.exports = router