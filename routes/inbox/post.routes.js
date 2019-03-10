const express = require('express')
const router = express.Router()
const post = require('../../models/inbox/post.model')
const m = require('../../helpers/inbox/middlewares')

/* All messages.. */
router.get('/', async (req, res) => {
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

/* A user by id and password*/
router.get('/:id/:pwd', m.mustBeInteger, async (req, res) => {
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

/* Send a message to a user according to their id */
router.post('/', m.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => res.status(201).json({
        message: `201: User number ${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* update one's account profile information */
router.put('/:id/:pwd', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.updatePost(id, pwd, req.body)
    .then(post => res.json({
        message: `201 : Profile information of user number ${id} has been updated successfully`,
        content: post
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete one's account */
router.delete('/:id/:pwd', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const pwd = req.params.pwd

    await post.deletePost(id, pwd)
    .then(post => res.json({
        message: `200 : User with id ${id} has been deleted successfully`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router