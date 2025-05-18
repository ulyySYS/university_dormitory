
import React, { useState, useEffect } from 'react';

const RoomDetails = ({ selectedRoom, onUpdateSuccess }) => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [updateStatusError, setUpdateStatusError] = useState(null);

  // Fetch users when a room is selected
  useEffect(() => {
    if (selectedRoom) {
      fetchRoomUsers();
    }
  }, [selectedRoom]);

  const fetchRoomUsers = async () => {
    if (!selectedRoom) return;

    setIsLoadingUsers(true);
    setUsersError(null);
    
    try {
      const response = await fetch(`http://localhost:8000/admin/room/${selectedRoom.RoomID}/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch room users');
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setUsersError('Error fetching room users: ' + err.message);
      console.error('Error fetching room users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleToggleOperational = async () => {
    if (!selectedRoom) return;

    setIsUpdatingStatus(true);
    setUpdateStatusError(null);

    try {
      const response = await fetch('http://localhost:8000/admin/update-room-availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomID: selectedRoom.RoomID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update room status');
      }


      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (err) {
      setUpdateStatusError(err.message);
      console.error('Error updating room status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (!selectedRoom) {
    return (
      <div className="rooms-details">
        <p className="rooms-no-selection">Select a room to view details</p>
      </div>
    );
  }

  return (
    <div className="rooms-details">
      <div className="rooms-details-header">
        <h4 className="rooms-details-title">Room Details</h4>
        <button
          onClick={handleToggleOperational}
          disabled={isUpdatingStatus}
          className={`rooms-toggle-btn ${
            selectedRoom.isOperational ? 'rooms-toggle-disable' : 'rooms-toggle-enable'
          }`}
        >
          {isUpdatingStatus
            ? 'Updating...'
            : selectedRoom.isOperational
            ? 'Set Non-operational'
            : 'Set Operational'
          }
        </button>
      </div>

      {updateStatusError && (
        <div className="rooms-error">{updateStatusError}</div>
      )}

      <div className="rooms-details-info">
        <div className="rooms-details-grid">
          <div className="rooms-detail-item">
            <p className="rooms-detail-label">Room ID</p>
            <p className="rooms-detail-value">{selectedRoom.RoomID}</p>
          </div>
          <div className="rooms-detail-item">
            <p className="rooms-detail-label">Building Name</p>
            <p className="rooms-detail-value">{selectedRoom.BuildingName || 'N/A'}</p>
          </div>
          <div className="rooms-detail-item">
            <p className="rooms-detail-label">Capacity</p>
            <p className="rooms-detail-value">{selectedRoom.Capacity}</p>
          </div>
          <div className="rooms-detail-item">
            <p className="rooms-detail-label">Operational Status</p>
            <p className={`rooms-detail-status ${selectedRoom.isOperational ? 'rooms-operational' : 'rooms-non-operational'}`}>
              {selectedRoom.isOperational ? 'True' : 'False'}
            </p>
          </div>
          <div className="rooms-detail-item">
            <p className="rooms-detail-label">Room Name</p>
            <p className="rooms-detail-value">{selectedRoom.RoomName}</p>
          </div>
        </div>
      </div>

      <div className="rooms-users-section">
        <h5 className="rooms-users-title">Residents</h5>
        {isLoadingUsers ? (
          <p className="rooms-loading">Loading residents...</p>
        ) : usersError ? (
          <p className="rooms-error">{usersError}</p>
        ) : users.length === 0 ? (
          <p className="rooms-no-residents">No student is registered in this room</p>
        ) : (
          <div className="rooms-users-list">
            {users.map((user) => (
              <div key={user.RegistrationID} className="rooms-user-card">
                <div className="rooms-user-info">
                  <div className="rooms-user-detail">
                    <p className="rooms-user-label">Registration ID</p>
                    <p className="rooms-user-value">{user.RegistrationID}</p>
                  </div>
                  <div className="rooms-user-detail">
                    <p className="rooms-user-label">Username</p>
                    <p className="rooms-user-value">{user.UserName}</p>
                  </div>
                  <div className="rooms-user-detail">
                    <p className="rooms-user-label">Email</p>
                    <p className="rooms-user-value">{user.Email}</p>
                  </div>
                  <div className="rooms-user-detail">
                    <p className="rooms-user-label">Contact Number</p>
                    <p className="rooms-user-value">{user.ContactNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;