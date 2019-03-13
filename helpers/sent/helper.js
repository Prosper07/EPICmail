const fs = require('fs')

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, id, pwd) {
    return new Promise((resolve, reject) => {
        if ( pwd==="all" ){
         resolve(array.filter(r => r.senderId == id))
        } else {
         for (let i=1; i<=array.length; i++){
            resolve(array.filter(r => r.senderId == id && r.confidential.messageCode == pwd))}}
        // row = array.find(r => r.receiverIndivId == id && r.confidential.messageCode == pwd)    
        if (!(array.find(r => r.senderId == id && r.confidential.password == pwd))) {
            reject({
                message: 'Error 404: You should provide a good ID and good sender ID and good code please',
                status: 404
            })
        }
       // resolve(row)
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