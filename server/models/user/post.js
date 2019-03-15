let posts = require('../../data/user/posts.json')
const filename = './server/data/user/posts.json'
const helper = require('../../helpers/user/helper.js')

//function to get all information of a category (admin's)
function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                status: 202,
                message: ' 202: There is no user'
            })
        }

        resolve(posts)
    })
}

//function to get a given information
function getPost(id, password) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id, password)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

//function to insert information
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

//function to update a given information stored in the data file
function updatePost(id, password, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id, password)
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

//function to delete a given object from the data file
function deletePost(id, password) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id, password)
        .then(() => {
            posts = posts.filter(p => p.id != id)
            helper.writeJSONFile(filename, posts)
            resolve()
        })
        .catch(err => reject(err))
    })
}

//exporting functions
module.exports = {
    insertPost,
    getPosts,
    getPost, 
    updatePost,
    deletePost
}