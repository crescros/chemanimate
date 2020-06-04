const fs = require('fs')

module.exports = {
    getAll,
    getOne,
    getTrials
};

const animations = JSON.parse(fs.readFileSync('data/animations.json', 'utf8'))


async function getAll(params) {
    console.log(params.type)

    if (params.type === 'other'){
        return animations.data.filter(a => {
            return !["Single Replacement", "Double Replacement", "Synthesis", "Decomposition"].includes(a.series)
        })
    } else if (params.type){
        return animations.data.filter(a => {
            console.log(a)
            return a.series === params.type
        })
    } else {
        return animations.data
    }
}

async function getOne(id) {
    return animations.data.find(a => {
        return a.id == id
    })
}
async function getTrials() {
    return animations.data.filter(a => {
        if (a.tags) {
            console.log(a.tags)
            return a.tags.includes("trial")
        }
    })
}
