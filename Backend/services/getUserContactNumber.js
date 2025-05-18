const express = require('express');
const database = require('../config/database');

const getContactNumber = async (userID) => {
    try {
        const [rows] = await database.query(
            `SELECT ContactNumber FROM Users WHERE UserID = ?`,
            [userID]
        );
        if (rows.length > 0) {
            console.log("ContactNumber: ", rows[0].ContactNumber);
            return rows[0].ContactNumber;
        } else {
            console.log("No contact number found for the given user ID.");
            return null;
        }
    } catch (error) {
        console.error("Database error: ", error.message);
        return null;
    }
}

module.exports = getContactNumber;
