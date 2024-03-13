-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2024 at 11:15 AM
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
  `BookingRoomPrice` text NOT NULL,
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
  `Capacity` text NOT NULL,
  `numberOfNights` int(11) NOT NULL,
  `AmtToPaid` int(11) NOT NULL,
  `PaymentId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`BookingID`, `BookingRoomID`, `CheckInDate`, `CheckOutDate`, `TotalPrice`, `PaymentStatus`, `BookingRoomType`, `BookingRoomPrice`, `Adults`, `NumChildrens`, `Child1Age`, `Child2Age`, `Child3Age`, `ExtraBed`, `ExtraBedCost`, `ChildCost`, `UserName`, `UserPhone`, `UserEmail`, `UserAddress`, `IsGST`, `CompanyName`, `CompanyGST`, `CompanyAddress`, `SpecialRequest`, `RoomName`, `Capacity`, `numberOfNights`, `AmtToPaid`, `PaymentId`) VALUES
(1710324787890187, 1, '2024-03-13T18:30:00.000Z', '2024-03-14T18:30:00.000Z', 3500, 'paid', 'With Breakfast', '3500', '1', '0', '', '', '', '0', '0', '0', 'prathamesh gadhave', '8421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', '', 'Blue Bell cottage couple AC', '5', 1, 1050, 'pay_Nlnp7SURLdbqOb');

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
(1, 'River Orchid Resort', 'Sitaram Karande', 'riverorchid1313@gmail.com', '+91-9405751313 / +91-9403268501', 'River Orchid Resort AT-Pali Tarfe Aategaon, Post-Tapola, Taluka-Mahabaleshwar, Dist-Satara, Pin-412806', '800', '1200', '1000', '1600');

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
('1', '12:00 AM', '10:30 AM', 'Subject To Availability', '[\" If cancelled before 4 days of Check In date refundable amount would Be 100% of total billing.\" ]', 1);

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
  `capacity` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomID`, `RoomName`, `Description`, `RoomsClientID`, `RoomPhotos`, `RoomsWithBreakFast`, `RoomsWithAllMeals`, `capacity`, `available`) VALUES
(1, 'Blue Bell cottage couple AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'https://www.riverorchidresort.com/img/landing%20page%20img/bluebell%20couple.jpg, https://www.riverorchidresort.com/img/room%20img/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg,https://www.riverorchidresort.com/img/landing%20page%20img/bluebell%20family.jpg', '3500', '6000', 5, 1),
(3, 'Mango cottage Room AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'https://www.riverorchidresort.com/img/landing%20page%20img/mango.jpg,https://www.riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, https://www.riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg', '2800', '4000', 2, 1),
(14, 'Jasmanium Cottage 1 - Couple Room with Breakfast', 'An exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://www.riverorchidresort.com/img/landing%20page%20img/jasmanium%20family.jpg,https://www.riverorchidresort.com/img/landing%20page%20img/jasmanium%20family.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20washroom.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20balcony.jpg', '3500', '6000', 5, 1),
(16, 'Iris Family Cottage - Family Room with Breakfast', 'An exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/iris%20family%201.jpg, https://riverorchidresort.com/img/landing%20page%20img/iris%20family.jpg, https://riverorchidresort.com/img/landing%20page%20img/iris%20balcony.jpg', '5656', '888', 4, 0),
(17, 'Lilium Twin Rooms - Family Room with Breakfast', 'An exclusive Family cottage with private sit out facing lawn n lake, the cottage is equipped with Two kingsize bed sleeping accommodation, and two bed rooms among which one is master bedroom with attached bathroom,blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility.', 1, 'https://www.riverorchidresort.com/img/landing%20page%20img/lilium.jpg, https://www.riverorchidresort.com/img/landing%20page%20img/lilium%20balcony.jpg, https://www.riverorchidresort.com/img/landing%20page%20img/lilium%202.jpg', '4200', '7000', 5, 1);

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
  MODIFY `BookingID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1710324787890188;

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
