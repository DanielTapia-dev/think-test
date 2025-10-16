const express = require('express');
const { requireAuth } = require('../../core/auth/jwt');
const { requireRoles } = require('../../core/auth/rbac');
const ctl = require('./solicitudes.controller');
const router = express.Router();

router.get('/', requireAuth, ctl.getSolicitudes);

router.post('/', requireAuth, requireRoles('ADMIN'), ctl.postSolicitud);
router.patch('/:id', requireAuth, requireRoles('ADMIN'), ctl.patchSolicitud);
router.put('/:id', requireAuth, requireRoles('ADMIN'), ctl.putSolicitud);
router.delete('/:id', requireAuth, requireRoles('ADMIN'), ctl.deleteSolicitud);

module.exports = router;
