import express from 'express';

import post from '../../models/sent/post';

import m from '../../helpers/sent/m';


const router = express.Router();


// router.use('/api/v1/messages', require('./post.routes'))
// router.use('/api/v1/sents', require('../sent/post.routes'))
// router.use('/api/v1/contacts', require('../contact/post.routes'))
// router.use('/api/v1/sent', require('../sent/post.routes'))
// router.use('/api/v1/inbox', require('../inbox/post.routes'))*
// router.use('/api/v1/group', require('../group/post.routes'))
// router.use('/api/v1/groupmbr', require('../groupmbr/post.routes'))

/* See every sent message by the admin.. */
router.get('/api/v1/sent/', async (req, res) => {
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

/* See a sent message by id and message code*/
router.get('/api/v1/sent/:id/:pwd', m.mustBeInteger, async (req, res) => {
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

/* Send message */
router.post('/api/v1/sent/', m.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => res.status(201).json({
        message: `201: sent number ${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* modify message */
router.put('/api/v1/sent/:id/:pwd', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.updatePost(id, pwd, req.body)
    .then(post => res.json({
        message: `201 : Profile information of sent number ${id} has been updated successfully`,
        content: post
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete one's sent message */
router.delete('/api/v1/sent/:id/:pwd', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.deletePost(id, pwd)
    .then(post => res.json({
        message: `200 : sent with id ${id} has been deleted successfully`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

export default router;