const express = require('express');
const { postRegister, postLogin, postRefresh, postLogoutAll } = require('./auth.controller');
const { requireAuth } = require('../../core/auth/jwt');
const router = express.Router();

router.post('/register', postRegister);
router.post('/login', postLogin);
router.post('/refresh', postRefresh);
router.post('/logout-all', requireAuth, postLogoutAll);

module.exports = router;
