// these routes get verify auth middleware on them
// and all requests proxy passthrough

const express = require('express');
const router = express.Router();

const axios = require('axios');

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxy();

// this causes weird socket hangup errors

// proxy passthrough route
// router.use('/', (req,res,next) => {
//     console.log("Proxied:", req.method, req.url)
//     const target = req.url
//     proxy.web( req, res, {target: target});

//     proxy.on('response', (proxyRes, req, res) => {
//         console.log(proxyRes);
//     })

//     proxy.on('error', (err,req,res) => {
//         next(err)
//     })
//})

// proxy passthrough route using axios
router.use('/', (req,res,next) => {
    console.log("Proxied:", req.method, req.headers.target)
    const target = req.headers.target
    const config = {
        url: target,
        method: req.method,
    }
    axios(target)
    .then(response => {
        console.log(response);
        res.send(response.data)
    })
    .catch(err => {
        next(err)
    })
})


module.exports = router;

