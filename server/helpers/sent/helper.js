const fs = require('fs')

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, id, password) {
    return new Promise((resolve, reject) => {
         for (let i=1; i<=array.length; i++){
            resolve(array.filter(r => r.senderId == id && r.confidential.messageCode == password))}
        if (!(array.find(r => r.senderId == id && r.confidential.password == password))) {
            reject({
                message: 'Error 404: You should provide a good ID and good sender ID and good code please',
                status: 404
            })
        }
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content, null, 2 ), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile
}