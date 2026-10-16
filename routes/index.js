const express = require('express');
const routes = express.Router();

const authenticationRoutes = require('./authentication/authenticationRoutes');
const userRoutes = require('./users/userRoutes');
const instructorProfileRoutes = require('./instructorProfiles/instructorProfileRoutes');
const learnerProfileRoutes = require('./learnerProfiles/learnerProfileRoutes');
const categoryRoutes = require('./categories/categoryRoutes');
const courseRoutes = require('./courses/courseRoutes');
const moduleRoutes = require('./modules/moduleRoutes');
const enrollmentRoutes = require('./enrollments/enrollmentRoutes');
const paymentRoutes = require('./payments/paymentsRoutes');

//authentication
routes.use('/auth', authenticationRoutes);
routes.use('/user', userRoutes);
routes.use('/instructorProfile', instructorProfileRoutes);
routes.use('/learnerProfile', learnerProfileRoutes);
routes.use('/category', categoryRoutes);
routes.use('/course', courseRoutes);
routes.use('/module', moduleRoutes);
routes.use('/enrollment', enrollmentRoutes);
routes.use('/payment', paymentRoutes);

module.exports = routes;
