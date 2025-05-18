const express = require('express');
const router = express.Router();
const database = require('../config/database');
const getUserName = require('../services/getUserName');
const getEmail = require('../services/getUserEmail');
const getContactNumber = require('../services/getUserContactNumber');
const getUserID = require('../services/getUserID');



// add payment
// -> /admin/create-payment
router.post('/create-payment', async (req, res) => {
    const { registrationID, adminID, amount, paymentDate } = req.body;

    try {
        const [insert] = await database.query(
            `INSERT INTO Payments (RegistrationID, AdminID, PaymentDate, Amount) VALUES (?, ?, ?, ?)`,
            [registrationID, adminID, paymentDate, amount]
        );


        res.status(200).json({ message: 'Payment Created', paymentID: insert.insertId });


    } catch (err) {
        console.log("Error creating payment:");
        console.log(err);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

// view all payments 
// -> /admin/all-payments
router.get('/all-payments', async (req, res) => {
    let allPayments = []
    try {
        const [payments] = await database.query(
            `SELECT * FROM Payments`
        )
        for(let i = 0; i < payments.length; i++) {
            const userID = await getUserID(payments[i].RegistrationID);
            console.log("userID: ", userID);
            let items = {
                PaymentID: payments[i].PaymentID,
                RegistrationID: payments[i].RegistrationID,
                AdminID: payments[i].AdminID,
                PaymentDate: payments[i].PaymentDate,
                Amount: payments[i].Amount,
                UserName: await getUserName(userID),
                ContactNumber: await getContactNumber(userID),
                Email: await getEmail(userID)
            }
            allPayments.push(items);
        }

        res.status(200).json({message: 'payments fetched', allPayments});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
 })

module.exports = router; 