const express = require('express');
const database = require('../config/database');

const getUserName = async (userID) => {
    try {
        const [rows] = await database.query(
            `SELECT UserName FROM Users WHERE UserID = ?`,
            [userID]
        );
        if (rows.length > 0) {
            console.log("UserName: ", rows[0].UserName);
            return rows[0].UserName;
        } else {
            console.log("No user found with the given ID.");
            return null;
        }
    } catch (error) {
        console.error("Database error: ", error.message);
        return null;
    }
}

module.exports = getUserName;
