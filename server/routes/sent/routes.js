import express from 'express';

import post from '../../models/sent/post';

import middlewares from '../../helpers/sent/m';


const router = express.Router();

/* See every sent message by the admin.. */
 router.get('/api/v1/adminmessages/', async (req, res) => {
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
router.get('/api/v1/sent/:id/:password', middlewares.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const password = req.params.password

    await post.getPost(id, password)
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
router.post('/api/v1/sent/', middlewares.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => res.status(201).json({
        message: `201: sent number ${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Delete one's sent message */
router.delete('/api/v1/sent/:id/:password', middlewares.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const password = req.params.password

    await post.deletePost(id, password)
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