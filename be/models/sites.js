const mongoose = require('mongoose')
const cfg = require('../../config/inedx')

const siteSchema = new mongoose.Schema({
    title : {type: String, default: '등록 필요'},
    copyright: {type: String, default:'등록 필요'},
    dark: {type: Boolean, default: true}
})

const Site = mongoose.model('Site', siteSchema)

Site.findOne().then((r) => {
    if(!r) return Site.create({title: '등록 필요함'})
    return Prommise.resolve(r)
}).then((r) => {
    if(r) console.log(`${r.title} created`)
}).catch((e)=>{
    console.error(e.message)
})


module.exports = Site