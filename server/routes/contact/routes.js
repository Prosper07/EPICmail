import express from 'express';

import post from '../../models/contact/post';

import m from '../../helpers/contact/m';


const router = express.Router();


// router.use('/api/v1/messages', require('./post.routes'))
// router.use('/api/v1/sents', require('../sent/post.routes'))
// router.use('/api/v1/contacts', require('../contact/post.routes'))
// router.use('/api/v1/sent', require('../sent/post.routes'))
// router.use('/api/v1/inbox', require('../inbox/post.routes'))*
// router.use('/api/v1/group', require('../group/post.routes'))
// router.use('/api/v1/groupmbr', require('../groupmbr/post.routes'))

/* See every contact by the admin.. */
router.get('/api/v1/contacts/', async (req, res) => {
    await post.getPosts()
    .then(posts => res.json(posts))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* See a contact by id and message code*/
router.get('/api/v1/contacts/:id/:pwd', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.getPost(id, pwd)
    .then(post => res.json(post))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* create */
router.post('/api/v1/contacts/', m.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => res.status(201).json({
        message: `201: contact number ${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* modify  */
router.put('/api/v1/contacts/:id/:pwd', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.updatePost(id, pwd, req.body)
    .then(post => res.json({
        message: `201 : Profile information of contact number ${id} has been updated successfully`,
        content: post
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete one's contact */
router.delete('/api/v1/contacts/:id/:pwd', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.deletePost(id, pwd)
    .then(post => res.json({
        message: `200 : contact with id ${id} has been deleted successfully`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

export default router;