const express = require('express');
const router = express.Router();
const database = require('../config/database');
const getUserName = require('../services/getUserName');
const getEmail = require('../services/getUserEmail');
const getContactNumber = require('../services/getUserContactNumber');
const getDateFormat = require('../services/getDateFormat');
 

// add registration
// -> /admin/add-registration
router.post('/add-registration', async (req, res) => {
    const { UserID, RoomID, StartDate, EndDate, AdminID } = req.body;
  if (!UserID || !RoomID || !StartDate || !EndDate || !AdminID) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const [result] = await database.query(
      `INSERT INTO Registrations (UserID, RoomID, StartDate, EndDate, AdminID)
       VALUES (?, ?, ?, ?, ?)`,
      [UserID, RoomID, StartDate, EndDate, AdminID]
    );

    res.status(201).json({ message: 'Registration added.'});
  } catch (err) {
    console.error('Error inserting registration:', err);
    res.status(500).json({ message: 'Database error.', error: err });
  }
});


// view all registrations 
// -> /admin/all-registrations
router.get('/all-registrations', async (req, res) => {
    let allRegistrations = []
    try {
        const [registrations] = await database.query(
            `SELECT * FROM Registrations`
        )
        for(let i = 0; i < registrations.length; i++) {
            let items = {
                RegistrationID: registrations[i].RegistrationID,
                UserID: registrations[i].UserID,
                RoomID: registrations[i].RoomID,
                StartDate: registrations[i].StartDate,
                EndDate: registrations[i].EndDate,
                AdminID: registrations[i].AdminID,
                UserName: await getUserName(registrations[i].UserID),
                ContactNumber: await getContactNumber(registrations[i].UserID),
                Email: await getEmail(registrations[i].UserID)
            }
            allRegistrations.push(items);
        }
        res.status(200).json({message: 'registrations fetched', allRegistrations});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
 })

module.exports = router; 