const express = require('express');
const database = require('../config/database');

const getRoomName = async(RoomID)  => {
    const [RoomName] = await database.query(
        `SELECT RoomName FROM Rooms WHERE RoomID = ?`,
        [RoomID]
    )

    return RoomName[0].RoomName;
}

module.exports = getRoomName;