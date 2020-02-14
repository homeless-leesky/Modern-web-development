var express = require('express')
var createError = require('http-errors')
var router = express.Router();

const jwt = require('jsonwebtoken')
const cfg = require('../../../../config/inedx')
const User = require('../../../models/users')



const signToken = (id, name) => {
    return new Promise((resolve, reject) => {
        jwt.sign({id, name}, cfg.secretKey , (err, token)=>{
            if (err) reject(err)
            resolve(token)
        })
    })
}

//post 방식의 호출의 두번째 인자는 => body
//get 방식의 호출의 두번째 인자는 => option -> request header 같은거

router.post('/in', (req,res,next) => {
    const {id,pwd} = req.body;
    if (!id) return res.send({
        success: false,
        msg: '아이디를 입력해 주세요'
    });
    if (!pwd) return res.send({
        success: false,
        msg: '비밀번호를 입력해 주세요'
    });

    User.findOne({id}).then((r)=>{
        if(!r) throw new Error('존재하지 않는 아이디입니다.')
        if(r.pwd !== pwd) throw new Error('비밀번호가 틀립니다.')
        return signToken(r.id, r.name)
    }).then((r) => {
        res.send({success: true, token: r})
    }).catch((e) => {
        res.send({success: false, msg: e.message})
    })
});

router.post('./out', (req,res,next) => {
    res.send({
        success: false,
        msg: '아직 준비 안됨'
    });
});

router.all('*', (req,res,next)=>{
    next(createError(404,'[WARNING] there is no api in sign!'))
});

module.exports = router
