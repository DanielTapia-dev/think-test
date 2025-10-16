const express = require('express');
const { requireAuth } = require('../../core/auth/jwt');
const { requireRoles } = require('../../core/auth/rbac');
const ctl = require('./empleados.controller');
const router = express.Router();

router.get('/', requireAuth, ctl.getEmpleados);

router.post('/', requireAuth, requireRoles('ADMIN'), ctl.postEmpleado);

module.exports = router;
