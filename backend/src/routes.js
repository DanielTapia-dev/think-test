const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');
const empleadosRoutes = require('./modules/empleados/empleados.routes');
const solicitudesRoutes = require('./modules/solicitudes/solicitudes.routes');

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/empleados', empleadosRoutes);
router.use('/solicitudes', solicitudesRoutes);

module.exports = router;
