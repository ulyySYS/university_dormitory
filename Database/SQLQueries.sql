create database University_Dormitory;

use University_Dormitory;

create table Users(
	UserID int auto_increment primary key,
    UserName varchar(255) not null,
    Role enum("student", "admin") not null,
    ContactNumber varchar(255) not null,
    Email varchar(255) not null unique,
    Password varchar(255) not null
);


create table User_Creation_Logs(
	Log_ID int auto_increment primary key,
    UserID int not null,
	UserName Varchar(255) not null,
    Log_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    Foreign key (UserID) references Users(UserID)
);

create table Registrations (
	RegistrationID int auto_increment primary key,
    UserID int not null, 
    RoomID int not null,
    StartDate date not null, 
    EndDate date not null, 
    AdminID int not null,
    foreign key (UserID) references Users(UserID),
    foreign key(RoomId) references Rooms(RoomID),
    foreign key (AdminID) references Users(UserID)
);

create table Payments(
	PaymentId int auto_increment primary key,
    RegistrationID int not null,
	AdminId int not null,
    PaymentDate DATETIME not null,
    Amount Decimal(10,2),
    foreign key (RegistrationID) references Registrations(RegistrationID),
    foreign key (AdminID) references Users(UserID)
);

create table DormBuildings(
	DormBuildingID int auto_increment primary key,
    BuildingName varchar(255) not null unique,
    Address varchar(255) not null,
    TotalRooms int not null,
    AvailableRooms int not null
);

create table Rooms(
	RoomID int auto_increment primary key,
    DormBuildingID int not null,
    Capacity int not null, 
    isOperational bool not null,
    RoomName varchar(255) not null unique,
    foreign key (DormBuildingID) references DormBuildings(DormBuildingID)
);



create table MaintenanceRequests(
	RequestId int auto_increment primary key,
    RoomID int not null,
    UserID int not null, 
    Issue TEXT not null,
    Date datetime DEFAULT CURRENT_TIMESTAMP,
    Status enum("fixed", "not_fixed") not null,
    DateFixed DATETIME,
    foreign key (RoomID) references Rooms(RoomID),
    foreign key (UserID) references Users(UserID)
);

create table MaintenanceLogs(
	MaintenanceLogs int auto_increment primary key,
    RequestID int not null,
    LogDate	datetime DEFAULT CURRENT_TIMESTAMP,
    RepairDescription TEXT not null
);




Insert into users(UserName, Role, ContactNumber, Email, Password) 
values("Edmar Jhon", "admin", 09458149345, "EJ@gmail.com", "Pass1");
    
Insert into users(UserName, Role, ContactNumber, Email, Password) 
values("Lowie Sumatra", "admin", 09455432145, "LS@gmail.com", "pass2");

Insert into users(UserName, Role, ContactNumber, Email, Password) 
values("Randy Cunatan", "admin", 09098762145, "RC@gmail.com", "Pass3");

INSERT INTO Users (UserName, Role, ContactNumber, Email, Password) VALUES
('Alice Ramos', 'student', '09171234567', 'alice.ramos@example.com', "Pass1"),
('Ben Cruz', 'student', '09181234567', 'ben.cruz@example.com', "Pass1"),
('Carla Santos', 'student', '09191234567', 'carla.santos@example.com', "Pass1"),
('David Reyes', 'student', '09201234567', 'david.reyes@example.com', "pass2"),
('Ella Lim', 'student', '09211234567', 'ella.lim@example.com', "pass2"),
('Francis Dela Cruz', 'student', '09221234567', 'francis.dc@example.com', "pass2"),
('Grace Tan', 'student', '09231234567', 'grace.tan@example.com', "Pass3"),
('Henry Yu', 'student', '09241234567', 'henry.yu@example.com', "Pass3"),
('Isla Gomez', 'student', '09251234567', 'isla.gomez@example.com', "Pass3"),
('Jake Navarro', 'student', '09261234567', 'jake.navarro@example.com', "Pass1"),
('Kyla Bautista', 'student', '09271234567', 'kyla.bautista@example.com', "pass2"),
('Liam Mendoza', 'student', '09281234567', 'liam.mendoza@example.com', "Pass3");


Insert into DormBuildings(BuildingName, Address, TotalRooms, AvailableRooms)
values ("Magsaysay Bld", "Jacinto Street, Davao City", 10, 10);

Insert into DormBuildings(BuildingName, Address, TotalRooms, AvailableRooms)
values ("Aguinaldo Bld", "Jacinto Street, Davao City", 10, 10);

Insert into DormBuildings(BuildingName, Address, TotalRooms, AvailableRooms)
values ("Quirino Bld", "Jacinto Street, Davao City", 10, 10);

select * from Rooms;
Insert into Rooms(DormBuildingID, Capacity, isOperational, RoomName) 
values(1, 1, 1, "Magsaysay Admin Room");
Insert into Rooms(DormBuildingID, Capacity, isOperational, RoomName) 
values(2, 1, 1, "Aguinaldo Admin Room");
Insert into Rooms(DormBuildingID, Capacity, isOperational, RoomName) 
values(3, 1, 1, "Quirino Admin Room");


INSERT INTO Rooms (DormBuildingID, Capacity, isOperational, RoomName) VALUES
-- DormBuildingID 1
(1, 2, TRUE, 'M101'),
(1, 1, TRUE, 'M102'),
(1, 2, TRUE, 'M103'),
(1, 2, True, 'M104'),
(1, 1, TRUE, 'M105'),
-- second floor
(1, 2, TRUE, 'M206'),
(1, 3, TRUE, 'M207'),
(1, 1, TRUE, 'M208'),
(1, 2, TRUE, 'M209'),
(1, 2, TRUE, 'M210'),

-- DormBuildingID 2
(2, 2, TRUE, 'A101'),
(2, 1, TRUE, 'A102'),
(2, 2, TRUE, 'A103'),
(2, 2, TRUE, 'A104'),
(2, 1, TRUE, 'A105'),
-- second floor
(2, 2, TRUE, 'A206'),
(2, 3, TRUE, 'A207'),
(2, 1, TRUE, 'A208'),
(2, 2, TRUE, 'A209'),
(2, 2, TRUE, 'A210'),

-- DormBuildingID 3
(3, 2, TRUE, 'Q101'),
(3, 1, TRUE, 'Q102'),
(3, 2, TRUE, 'Q103'),
(3, 1, TRUE, 'Q104'),
(3, 2, TRUE, 'Q105'),
-- second floor of the building
(3, 2, TRUE, 'Q206'),
(3, 3, TRUE, 'Q207'),
(3, 1, TRUE, 'Q208'),
(3, 2, TRUE, 'Q209'),
(3, 2, TRUE, 'Q210');



INSERT INTO Registrations (UserID, RoomID, StartDate, EndDate, AdminID) VALUES
(4, 4, '2025-06-01', '2026-05-31', 1),   -- Alice Ramos in M101
(5, 5, '2025-06-01', '2026-05-31', 1),   -- Ben Cruz in M102
(6, 6, '2025-06-01', '2026-05-31', 1),   -- Carla Santos in M103
(7, 7, '2025-06-01', '2026-05-31', 1),   -- David Reyes in M104
(8, 8, '2025-06-01', '2026-05-31', 1),   -- Ella Lim in M105
(9, 9, '2025-06-01', '2026-05-31', 1),  -- Francis Dela Cruz in M206
(10, 10, '2025-06-01', '2026-05-31', 1),  -- Grace Tan in M207
(11, 11, '2025-06-01', '2026-05-31', 1),  -- Henry Yu in M208
(12, 14, '2025-06-01', '2026-05-31', 2),  -- Isla Gomez in A101
(13, 15, '2025-06-01', '2026-05-31',2), -- Jake Navarro in A102
(14, 24, '2025-06-01', '2026-05-31', 3), -- Kyla Bautista in Q101
(15, 25, '2025-06-01', '2026-05-31', 3); -- Liam Mendoza in Q102



DELIMITER $$

CREATE TRIGGER UpdateRequestStatusAfterLog
AFTER INSERT ON MaintenanceLogs
FOR EACH ROW
BEGIN
  UPDATE MaintenanceRequests
  SET Status = 'fixed',
      DateFixed = NOW()
  WHERE RequestID = NEW.RequestID;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER LogUserCreation
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
  INSERT INTO User_Creation_Logs (UserID, UserName)
  VALUES (NEW.UserID, NEW.UserName);
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER UpdateTotalRoomsAvailable
AFTER UPDATE ON Rooms
FOR EACH ROW
BEGIN
  -- If operational status changed from true to false, subtract 1
  IF OLD.isOperational = TRUE AND NEW.isOperational = FALSE THEN
    UPDATE DormBuildings
    SET AvailableRooms = AvailableRooms - 1
    WHERE DormBuildingID = NEW.DormBuildingID;

  -- If operational status changed from false to true, add 1
  ELSEIF OLD.isOperational = FALSE AND NEW.isOperational = TRUE THEN
    UPDATE DormBuildings
    SET AvailableRooms = AvailableRooms + 1
    WHERE DormBuildingID = NEW.DormBuildingID;
  END IF;
END$$

DELIMITER ;


select * from users;
select * from registrations;