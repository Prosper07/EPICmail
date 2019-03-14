let posts = require('../../data/message/posts.json')
const filename = './server/data/message/posts.json'
const helper = require('../../helpers/sent/helper.js')

function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                status: 202,
                message: ' 202: There is no message'
            })
        }

        resolve(posts)
    })
}

//for (let i=posts.id; i<posts.length; i++)
function getPost(id, pwd) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id, pwd)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(posts) }
        const date = { 
            createdOn: helper.newDate(),
            updatedOn: helper.newDate()
        } 
        newPost = { ...id, ...date, ...newPost }
        posts.push(newPost)
        helper.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

function updatePost(id, pwd, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id, pwd)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdOn: post.createdAt,
                updatedOn: helper.newDate()
            } 
            posts[index] = { ...id, ...date, ...newPost }
            helper.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

function deletePost(id, pwd) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id, pwd)
        .then(() => {
            posts = posts.filter(p => p.id != id)
            helper.writeJSONFile(filename, posts)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertPost,
    getPosts,
    getPost, 
    updatePost,
    deletePost
}