
import React from 'react';

const RoomsList = ({ rooms, selectedRoom, onSelectRoom }) => {
  return (
    <div className="rooms-list">
      <h4 className="rooms-list-title">All Rooms</h4>
      {rooms.length === 0 ? (
        <p className="rooms-no-data">No rooms available</p>
      ) : (
        <div className="rooms-list-container">
          {rooms.map((room) => (
            <div
              key={room.RoomID}
              className={`rooms-list-item ${
                selectedRoom?.RoomID === room.RoomID ? 'rooms-selected' : ''
              }`}
              onClick={() => onSelectRoom(room)}
            >
              <div className="rooms-list-item-header">
                <h5 className="rooms-list-item-name">{room.RoomName}</h5>
                <span className={`rooms-status ${room.isOperational ? 'rooms-operational' : 'rooms-non-operational'}`}>
                  {room.isOperational ? 'Operational' : 'Non-operational'}
                </span>
              </div>
              <div className="rooms-list-item-details">
                <p className="rooms-list-item-detail">Room ID: {room.RoomID}</p>
                <p className="rooms-list-item-detail">Capacity: {room.Capacity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsList;