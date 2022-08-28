// these routes get verify auth middleware on them
// and all requests proxy passthrough

const express = require('express');
const router = express.Router();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

// proxy passthrough route
router.get('/', (req,res,next) => {
    console.log('proxied')
    const target = `http://${req.headers.target}`
    proxy.web(req, res, {target: target});

    proxy.on('error', (err,req,res) => {
        next(err)
    })
})

router.post('/', (req,res,next) => {
    console.log('proxied')
    const target = `http://${req.headers.target}`
    proxy.web(req, res, {target: target});

    proxy.on('error', (err,req,res) => {
        next(err)
    })
});


module.exports = router;

