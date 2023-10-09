-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2023 at 01:51 PM
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
  `BookingID` int(11) NOT NULL,
  `BookingUserID` int(11) NOT NULL,
  `BookingRoomID` int(11) NOT NULL,
  `CheckInDate` text NOT NULL,
  `CheckOutDate` text NOT NULL,
  `TotalPrice` int(11) NOT NULL,
  `Status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'River Orchid Resort', 'Sitaram Karande', 'lk', 'hh', 'Tapola');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `PaymentID` int(11) NOT NULL,
  `PaymentBookingID` int(11) NOT NULL,
  `PaymentAmount` int(11) NOT NULL,
  `PaymentDate` text NOT NULL,
  `PaymentMethod` text NOT NULL,
  `PaymentStatus` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `RoomID` int(11) NOT NULL,
  `RoomName` text NOT NULL,
  `Description` text NOT NULL,
  `PricePerNight` int(11) NOT NULL,
  `RoomsClientID` int(11) NOT NULL,
  `RoomPhotos` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomID`, `RoomName`, `Description`, `PricePerNight`, `RoomsClientID`, `RoomPhotos`) VALUES
(1, 'Blue Bell cottage couple AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 3190, 1, 'http://riverorchidresort.com/img/landing%20page%20img/mango.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg'),
(2, 'Blue Bell cottage couple AC', 'An exclusive cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 3520, 1, 'http://riverorchidresort.com/img/room%20img/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg, http://riverorchidresort.com/img/landing%20page%20img/bluebell%20couple.jpg');

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
(1, 1, '', '', '', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `FK_RoomID` (`BookingRoomID`),
  ADD KEY `FK_UserId` (`BookingUserID`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`ClientID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `FK_BookingID` (`PaymentBookingID`);

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
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `ClientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `RoomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FK_RoomID` FOREIGN KEY (`BookingRoomID`) REFERENCES `rooms` (`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_UserId` FOREIGN KEY (`BookingUserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FK_BookingID` FOREIGN KEY (`PaymentBookingID`) REFERENCES `bookings` (`BookingID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
