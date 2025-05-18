const express = require('express');
const router = express.Router();
const database = require('../config/database');


// get all rooms
// -> /admin/all-rooms
router.get('/all-rooms', async (req, res) => {
    const { DormBuildingID } = req.params; 
    try {
        const [rooms] = await database.query(
            `SELECT 
                r.RoomID,
                r.DormBuildingID,
                r.Capacity,
                r.isOperational,
                r.RoomName,
                d.BuildingName
            FROM Rooms r
            JOIN DormBuildings d ON r.DormBuildingID = d.DormBuildingID`,
            [DormBuildingID]
        )
        res.status(200).json({message: 'rooms fetched', rooms});

    } catch(err) {
        console.log("error: ")
        console.log(err)
        res.status(500).json({message: 'Error fetching rooms'});
    }
});

// get all users registered to a specific room
// -> /admin/room/:roomID/users
router.get('/room/:roomID/users', async (req, res) => {
    const { roomID } = req.params; 
    try {
        const [users] = await database.query(
            `SELECT 
                r.RegistrationID,
                u.UserName,
                u.Email,
                u.ContactNumber
            FROM Registrations r
            JOIN Users u ON r.UserID = u.UserID
            WHERE r.RoomID = ?`,
            [roomID]
        );
        res.status(200).json({message: 'users fetched', users});

    } catch(err) {
        console.log("error: ");
        console.log(err);
        res.status(500).json({message: 'Error fetching users'});
    }
});

// update isoperational in rooms table
router.put('/update-room-availability', async (req, res) => {

    const { roomID } = req.body;
    try {
        // Get current isOperational value
        const [room] = await database.query('SELECT isOperational FROM Rooms WHERE RoomID = ?', [roomID]);

        if (room.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const currentStatus = room[0].isOperational;
        const newStatus = !currentStatus;

        // If trying to set to false (0), check if there are no users in the room
        if (newStatus == false) {
            const [registrations] = await database.query(
                'SELECT COUNT(*) as userCount FROM Registrations WHERE RoomID = ?',
                [roomID]
            );
            
            const userCount = registrations[0].userCount;
            if (userCount > 0) {
                return res.status(400).json({ 
                    message: 'Cannot set room as non-operational. There are users currently residing in this room.' 
                });
            }
        }

        await database.query('UPDATE Rooms SET isOperational = ? WHERE RoomID = ?', [newStatus, roomID]);

        res.status(200).json({ message: `Room availability updated to ${newStatus}` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating room availability' });
    }
    
})

module.exports = router; 