module.exports = app => {
    var router = require("express").Router();
    const logger = require('./logger'); // Adjust the path if necessary

    const cyberschoolController = require('./controllers/cyberschool.controller');

    // add a student
    router.post('/students', async (req, res) => {
        try {
            const student = await cyberschoolController.addStudent(req, res);
            logger.info('Student added successfully', { studentId: student.id, studentName: `${student.first_name} ${student.last_name}` });
            res.status(201).json(student);
        } catch (error) {
            logger.error('Error adding student', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // find a student by student_id
    router.get('/students', async (req, res) => {
        try {
            const student = await cyberschoolController.findStudent(req, res);
            if (student) {
                logger.info('Student found', { studentId: student.id });
                res.json(student);
            } else {
                logger.warn('Student not found', { studentId: req.query.student_id });
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
            logger.error('Error finding student', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // update a student by student_id
    router.put('/students/:id', async (req, res) => {
        try {
            const updatedStudent = await cyberschoolController.updateStudent(req, res);
            logger.info('Student updated successfully', { studentId: req.params.id });
            res.json(updatedStudent);
        } catch (error) {
            logger.error('Error updating student', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // delete a student by student_id
    router.delete('/students/:id', async (req, res) => {
        try {
            await cyberschoolController.deleteStudent(req, res);
            logger.info('Student deleted successfully', { studentId: req.params.id });
            res.status(204).send(); // No content
        } catch (error) {
            logger.error('Error deleting student', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // make a payment
    router.post('/payments', async (req, res) => {
        try {
            const payment = await cyberschoolController.makePayment(req, res);
            logger.info('Payment processed successfully', { paymentId: payment.id });
            res.status(201).json(payment);
        } catch (error) {
            logger.error('Error processing payment', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // fetch school financial data
    router.get('/financials', async (req, res) => {
        try {
            const financialData = await cyberschoolController.getSchoolFinancialData(req, res);
            logger.info('Financial data retrieved successfully');
            res.json(financialData);
        } catch (error) {
            logger.error('Error fetching financial data', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // fetch detailed student data
    router.get('/students-details', async (req, res) => {
        try {
            const studentDetails = await cyberschoolController.getStudentDetails(req, res);
            logger.info('Student details retrieved successfully');
            res.json(studentDetails);
        } catch (error) {
            logger.error('Error fetching student details', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // fetch detailed payment data
    router.get('/payments-details', async (req, res) => {
        try {
            const paymentDetails = await cyberschoolController.getPaymentDetails(req, res);
            logger.info('Payment details retrieved successfully');
            res.json(paymentDetails);
        } catch (error) {
            logger.error('Error fetching payment details', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    router.post('/logs', (req, res) => {
        logger.info('Frontend log', { message: req.body.message, stack: req.body.stack });
        res.status(200).send('Log received');
    });
    

    app.use('/api/cyber_school', router);
};
