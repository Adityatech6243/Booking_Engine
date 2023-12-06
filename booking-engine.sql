-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 12:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
  `numberOfNights` int(11) NOT NULL,
  `AmtToPaid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`BookingID`, `BookingRoomID`, `CheckInDate`, `CheckOutDate`, `TotalPrice`, `PaymentStatus`, `BookingRoomType`, `Adults`, `NumChildrens`, `Child1Age`, `Child2Age`, `Child3Age`, `ExtraBed`, `ExtraBedCost`, `ChildCost`, `UserName`, `UserPhone`, `UserEmail`, `UserAddress`, `IsGST`, `CompanyName`, `CompanyGST`, `CompanyAddress`, `SpecialRequest`, `RoomName`, `numberOfNights`, `AmtToPaid`) VALUES
(1697806126035, 1, '2023-10-24T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 18450, 'pending', 'All Inclusive', '2', '2', '3', '9', '', '0', '0', '2400', 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'yes', 'a', 'b', 'c', 'wwwwww', 'Blue Bell cottage couple AC', 3, 0),
(1701862509723449, 1, '2023-12-26T18:30:00.000Z', '2023-12-27T18:30:00.000Z', 0, 'paid', 'All Inclusive', '1', '0', '', '', '', '', '0', '1200', 'sagar', '9970565243', 'awdawdw@gail.com', 'sdwewe hh', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 0, 0),
(1701862509723450, 17, '2023-12-29T18:30:00.000Z', '2023-12-30T18:30:00.000Z', 0, 'paid', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0);

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
  `ClientAddress` text NOT NULL,
  `ChildCostForBreakfast` text NOT NULL,
  `ChildCostForAllMeals` text NOT NULL,
  `AdultCostForBreakfast` text NOT NULL,
  `AdultCostForAllMeals` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`ClientID`, `ClientBusinessName`, `ClientName`, `ClientEmail`, `ClientPhone`, `ClientAddress`, `ChildCostForBreakfast`, `ChildCostForAllMeals`, `AdultCostForBreakfast`, `AdultCostForAllMeals`) VALUES
(1, 'River Orchid Resort', 'Sitaram Karande', 'riverorchid1313@gmail.com', '+91-9405751313 / +91-9158785725 / +91-9403268501', 'Tapola', '800', '1200', '1200', '1500');

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
  `RoomsWithAllMeals` text NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomID`, `RoomName`, `Description`, `RoomsClientID`, `RoomPhotos`, `RoomsWithBreakFast`, `RoomsWithAllMeals`, `capacity`) VALUES
(1, 'Blue Bell cottage couple AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'http://riverorchidresort.com/img/landing%20page%20img/mango.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg', '3520', '4950', 4),
(3, 'Mango cottage Room AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/mango.jpg,https://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, https://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg', '\r\n 7200 ', ' 10000', 2),
(14, 'Jasmanium Cottage 1 - Couple Room with Breakfast', 'An exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20couple.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20washroom.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20balcony.jpg', '', '', 4),
(16, 'Iris Family Cottage - Family Room with Breakfast', 'An exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/iris%20family%201.jpg, https://riverorchidresort.com/img/landing%20page%20img/iris%20family.jpg, https://riverorchidresort.com/img/landing%20page%20img/iris%20balcony.jpg', '', '', 4),
(17, 'Lilium Twin Rooms - Family Room with Breakfast', 'An exclusive Family cottage with private sit out facing lawn n lake, the cottage is equipped with Two kingsize bed sleeping accommodation, and two bed rooms among which one is master bedroom with attached bathroom,blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/lilium%202.jpg, https://riverorchidresort.com/img/landing%20page%20img/lilium%20balcony.jpg, https://riverorchidresort.com/img/landing%20page%20img/lilium.jpg', '', '', 4);

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
(18, 1, 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', '');

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
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `BookingID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1701862509723451;

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
  MODIFY `RoomID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
