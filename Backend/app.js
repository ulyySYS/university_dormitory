const express = require('express');
const userRoutes = require('./routes/userRoutes');
const maintenanceRequestRoutes = require('./routes/maintenanceRequestRoutes');
const maintenanceLogsRoutes = require('./routes/maintenanceLogsRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const dormBuildingsRoutes = require('./routes/dormBuildingsRoutes');
const registrationRoutes = require('./routes/registrationsRoutes');
const paymentRoutes = require('./routes/paymentsRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); 

app.use('/login', userRoutes);
app.use('/users', maintenanceRequestRoutes);
app.use('/admin', userRoutes);
app.use('/admin', maintenanceRequestRoutes);
app.use('/admin', maintenanceLogsRoutes);
app.use('/admin', roomsRoutes);
app.use('/admin', dormBuildingsRoutes);
app.use('/admin', registrationRoutes);
app.use('/admin', paymentRoutes);




module.exports = app;