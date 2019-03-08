const express = require('express')
const router = express.Router()

router.use('/api/v1/messages', require('./post.routes'))
router.use('/api/v1/users', require('../user/post.routes'))
router.use('/api/v1/contacts', require('../contact/post.routes'))
router.use('/api/v1/sent', require('../sent/post.routes'))
router.use('/api/v1/inbox', require('../inbox/post.routes'))

module.exports = router