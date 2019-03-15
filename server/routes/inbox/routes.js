import express from 'express';

import post from '../../models/inbox/post';

import middlewares from '../../helpers/inbox/m';


const router = express.Router();

/* See a inbox message by id and message code*/
router.get('/api/v1/inbox/:id/:password', middlewares.mustBeInteger, async (req, res) => {
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

/* Delete one's inbox message */
router.delete('/api/v1/inbox/:id/:password', middlewares.mustBeInteger, async (req, res) => {
    const id = req.params.id
    const password = req.params.password

    await post.deletePost(id, password)
    .then(post => res.json({
        message: `200 : inbox with id ${id} has been deleted successfully`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

export default router;