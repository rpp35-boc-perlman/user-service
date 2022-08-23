// these routes get verify auth middleware on them
// and all requests proxy passthrough

const express = require('express');
const router = express.Router();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

// proxy passthrough route
router.get('/', (req,res,next) => {
    console.log(req.headers)
    const target = `http://${req.headers.host}`
    proxy.web(req, res, {target: target});
})


module.exports = router;

