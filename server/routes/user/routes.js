import express from 'express';

import post from '../../models/user/post';

import middlewares from '../../helpers/user/m';


const router = express.Router();

/* See every user by the admin.. */
router.get('/api/v1/passwordusers/', async (req, res) => {
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

/* Signin a user by id and password*/
router.get('/api/v1/users/:id/:password', middlewares.mustBeInteger, async (req, res) => {
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

/* Create User */
router.post('/api/v1/users/', middlewares.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => res.status(201).json({
        message: `201: User number ${post.id} has been created`,
        content: post
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* update one's account profile information */
router.put('/api/v1/users/:id/:password', middlewares.mustBeInteger, middlewares.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    const password = req.params.password

    await post.updatePost(id, password, req.body)
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
router.delete('/api/v1/users/:id/:password', middlewares.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const password = req.params.password

    await post.deletePost(id, password)
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

export default router;