const express = require('express');
const router = express.Router();
const database = require('../config/database');
const getRoomID = require('../services/getRoomID');
const getRoomName = require('../services/getRoomName');
const getUserName = require('../services/getUserName');

// add maintenance request
// -> /users/request
router.post('/request', async (req, res) => {
    const {  issue, UserID } = req.body;
    console.log("user id ipaHIASDHSDOKSNDK",UserID)
    const roomID =  await getRoomID(UserID);

    
    try {
        const [insert] = await database.query(
            `INSERT INTO MaintenanceRequests (RoomID, UserID, Issue, Status) VALUES (?, ?, ?, ?)`,
            [roomID,UserID, issue, "not_fixed"]
        )
        res.status(200).json({message: 'Request Sent and logged'});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

// view all maintenance requests for a single user
// -> /users/all-user-requests/:userID
router.get('/all-user-requests/:UserID', async (req, res) => {
    const { UserID } = req.params;

    
    try {
        const [requests] = await database.query(
            `SELECT Issue, Date, Status
             FROM MaintenanceRequests
             WHERE UserID = ?
             ORDER BY Date DESC`,
            [UserID]
        )
        res.status(200).json({message: 'requests fetched', requests});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

// view all maintenance requests for admin
// -> /admin/view-maintenance-requests
router.get('/view-maintenance-requests',async(req,res) =>{
    let requests = []
    try {
        const [logs] = await database.query(
            `
            
            SELECT * FROM MaintenanceRequests
            ORDER BY Date DESC;
            `
        )

        for (let i = 0; i < logs.length; i++) {
            let items = {
                RequestID: logs[i].RequestId,
                RoomID: logs[i].RoomID,
                UserID: logs[i].UserID,
                Issue: logs[i].Issue,
                Status: logs[i].Status,
                Date: logs[i].Date,
                RoomName: await getRoomName(logs[i].RoomID),
                Username: await getUserName(logs[i].UserID),
            };
            requests.push(items);
        }

        res.status(200).json({message: 'requests fetched', requests});

    } catch(err) {
        console.log("error: ")
        console.log(err)
    }
})

module.exports = router; 