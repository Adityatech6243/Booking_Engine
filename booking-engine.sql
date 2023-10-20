-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2023 at 02:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking-engine`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `BookingID` bigint(100) NOT NULL,
  `BookingRoomID` int(11) NOT NULL,
  `CheckInDate` text NOT NULL,
  `CheckOutDate` text NOT NULL,
  `TotalPrice` int(11) NOT NULL,
  `PaymentStatus` text NOT NULL,
  `BookingRoomType` text NOT NULL,
  `Adults` text NOT NULL,
  `NumChildrens` text NOT NULL,
  `Child1Age` text NOT NULL,
  `Child2Age` text NOT NULL,
  `Child3Age` text NOT NULL,
  `ExtraBed` text NOT NULL,
  `ExtraBedCost` text NOT NULL,
  `ChildCost` text NOT NULL,
  `UserName` text NOT NULL,
  `UserPhone` text NOT NULL,
  `UserEmail` text NOT NULL,
  `UserAddress` text NOT NULL,
  `IsGST` text NOT NULL,
  `CompanyName` text NOT NULL,
  `CompanyGST` text NOT NULL,
  `CompanyAddress` text NOT NULL,
  `SpecialRequest` text NOT NULL,
  `RoomName` text NOT NULL,
  `numberOfNights` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`BookingID`, `BookingRoomID`, `CheckInDate`, `CheckOutDate`, `TotalPrice`, `PaymentStatus`, `BookingRoomType`, `Adults`, `NumChildrens`, `Child1Age`, `Child2Age`, `Child3Age`, `ExtraBed`, `ExtraBedCost`, `ChildCost`, `UserName`, `UserPhone`, `UserEmail`, `UserAddress`, `IsGST`, `CompanyName`, `CompanyGST`, `CompanyAddress`, `SpecialRequest`, `RoomName`, `numberOfNights`) VALUES
(1697805793117568, 1, '2023-10-20T18:30:00.000Z', '2023-10-21T18:30:00.000Z', 3520, 'paid', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 0),
(1697806126035842, 1, '2023-10-24T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 18450, 'pending', 'All Inclusive', '2', '2', '3', '9', '', '0', '0', '2400', 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'yes', 'a', 'b', 'c', 'wwwwww', 'Blue Bell cottage couple AC', 3),
(1697806284164476, 1, '2023-10-27T18:30:00.000Z', '2023-10-30T18:30:00.000Z', 35550, 'pending', 'All Inclusive', '5', '3', '9', '5', '2', '9', '4500', '4800', 'prathamesh', '997056524', 'awd@ad.com', 'awdawd', 'no', '', '', '', 'a', 'Blue Bell cottage couple AC', 3),
(1697806577186152, 1, '2023-10-27T18:30:00.000Z', '2023-10-30T18:30:00.000Z', 23760, 'pending', 'With Breakfast', '5', '3', '3', '5', '9', '3', '3600', '2400', 'suraj', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', 'aa', 'Blue Bell cottage couple AC', 3);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `ClientID` int(11) NOT NULL,
  `ClientBusinessName` text NOT NULL,
  `ClientName` text NOT NULL,
  `ClientEmail` text NOT NULL,
  `ClientPhone` text NOT NULL,
  `ClientAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`ClientID`, `ClientBusinessName`, `ClientName`, `ClientEmail`, `ClientPhone`, `ClientAddress`) VALUES
(1, 'River Orchid Resort', 'Sitaram Karande', 'riverorchid1313@gmail.com', '+91-9405751313 / +91-9158785725 / +91-9403268501', 'Tapola');

-- --------------------------------------------------------

--
-- Table structure for table `policies`
--

CREATE TABLE `policies` (
  `ClientID` text NOT NULL,
  `CheckIn` text NOT NULL,
  `CheckOut` text NOT NULL,
  `LateCheckOut` text NOT NULL,
  `CancellationPolicies` longtext NOT NULL,
  `PolicyID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `policies`
--

INSERT INTO `policies` (`ClientID`, `CheckIn`, `CheckOut`, `LateCheckOut`, `CancellationPolicies`, `PolicyID`) VALUES
('1', '12:00 PM', '12:00 AM', 'Subject To Availability', '[\" If cancelled before 15 days of Check In date refundable amount would Be 100% of total billing.\", \"If cancelled before 7 days of Check In date refundable amount would Be 50% of total billing.\", \"If cancelled before 6 days of Check In date booking will Be Non Refundable.\"]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `RoomID` int(11) NOT NULL,
  `RoomName` text NOT NULL,
  `Description` text NOT NULL,
  `RoomsClientID` int(11) NOT NULL,
  `RoomPhotos` longtext NOT NULL,
  `RoomsWithBreakFast` text NOT NULL,
  `RoomsWithAllMeals` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomID`, `RoomName`, `Description`, `RoomsClientID`, `RoomPhotos`, `RoomsWithBreakFast`, `RoomsWithAllMeals`) VALUES
(1, 'Blue Bell cottage couple AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'http://riverorchidresort.com/img/landing%20page%20img/mango.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg', '3520', '4950'),
(2, 'Blue Bell cottage couple AC', 'An exclusive cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'http://riverorchidresort.com/img/room%20img/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg, http://riverorchidresort.com/img/landing%20page%20img/bluebell%20couple.jpg', '4400', '5500');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `UsersClientID` int(11) NOT NULL,
  `UserName` text NOT NULL,
  `UserPhone` text NOT NULL,
  `UserEmail` text NOT NULL,
  `UserAddress` text NOT NULL,
  `IsGST` text NOT NULL,
  `CompanyName` text NOT NULL,
  `CompanyGST` text NOT NULL,
  `CompanyAddress` text NOT NULL,
  `SpecialRequest` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UsersClientID`, `UserName`, `UserPhone`, `UserEmail`, `UserAddress`, `IsGST`, `CompanyName`, `CompanyGST`, `CompanyAddress`, `SpecialRequest`) VALUES
(18, 1, 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(19, 1, 'suraj', '9907565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(20, 1, 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', ''),
(21, 1, 'suraj', '9907565243', 'awd@ad.com', 'awdawd', 'no', '', '', '', ''),
(22, 1, 'prathamesh', '9907565243', 'awd@ad.com', 'sdwewe', 'no', '', '', '', ''),
(23, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(24, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(25, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(26, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(27, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(28, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(29, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(30, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(31, 1, 'suraj', '997056524', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', ''),
(32, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(33, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(34, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(35, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(36, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(37, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(38, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(39, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(40, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(41, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(42, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(43, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(44, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(45, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(46, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(47, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(48, 1, 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', ''),
(49, 1, 'suraj', '9907565243', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', ''),
(50, 1, 'suraj', '9907565243', 'awd@ad.com', 'sdwewe hh', 'no', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `FK_RoomID` (`BookingRoomID`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`ClientID`);

--
-- Indexes for table `policies`
--
ALTER TABLE `policies`
  ADD PRIMARY KEY (`PolicyID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`RoomID`),
  ADD KEY `ClientID` (`RoomsClientID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `FK_ClientID` (`UsersClientID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `ClientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `policies`
--
ALTER TABLE `policies`
  MODIFY `PolicyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `RoomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FK_RoomID` FOREIGN KEY (`BookingRoomID`) REFERENCES `rooms` (`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `FK_RoomsClientID` FOREIGN KEY (`RoomsClientID`) REFERENCES `clients` (`ClientID`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_ClientID` FOREIGN KEY (`UsersClientID`) REFERENCES `clients` (`ClientID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
