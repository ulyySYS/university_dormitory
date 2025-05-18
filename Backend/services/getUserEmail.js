const express = require('express');
const database = require('../config/database');

const getEmail = async (userID) => {
    try {
        const [rows] = await database.query(
            `SELECT Email FROM Users WHERE UserID = ?`,
            [userID]
        );
       
        if (rows.length > 0) {
            return rows[0].Email;
        } else {
            console.log("No email found for the given user ID.");
            return null;
        }
    } catch (error) {
        console.error("Database error: ", error.message);
        return null;
    }
}

module.exports = getEmail;