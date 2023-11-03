-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2023 at 10:21 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`BookingID`, `BookingRoomID`, `CheckInDate`, `CheckOutDate`, `TotalPrice`, `PaymentStatus`, `BookingRoomType`, `Adults`, `NumChildrens`, `Child1Age`, `Child2Age`, `Child3Age`, `ExtraBed`, `ExtraBedCost`, `ChildCost`, `UserName`, `UserPhone`, `UserEmail`, `UserAddress`, `IsGST`, `CompanyName`, `CompanyGST`, `CompanyAddress`, `SpecialRequest`, `RoomName`, `numberOfNights`, `AmtToPaid`) VALUES
(1697805793117568, 1, '2023-10-20T18:30:00.000Z', '2023-10-21T18:30:00.000Z', 3520, 'paid', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 0, 0),
(1697806126035842, 1, '2023-10-24T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 18450, 'pending', 'All Inclusive', '2', '2', '3', '9', '', '0', '0', '2400', 'prathamesh', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'yes', 'a', 'b', 'c', 'wwwwww', 'Blue Bell cottage couple AC', 3, 0),
(1697806284164476, 1, '2023-10-27T18:30:00.000Z', '2023-10-30T18:30:00.000Z', 35550, 'pending', 'All Inclusive', '5', '3', '9', '5', '2', '9', '4500', '4800', 'prathamesh', '997056524', 'awd@ad.com', 'awdawd', 'no', '', '', '', 'a', 'Blue Bell cottage couple AC', 3, 0),
(1697806577186152, 1, '2023-10-27T18:30:00.000Z', '2023-10-30T18:30:00.000Z', 23760, 'pending', 'With Breakfast', '5', '3', '3', '5', '9', '3', '3600', '2400', 'suraj', '997056524', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', 'aa', 'Blue Bell cottage couple AC', 3, 0),
(1698217545666209, 2, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 7600, 'pending', 'With Breakfast', '4', '2', '5', '7', '', '2', '2400', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'sdwewe hh', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 0),
(1698218295808896, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 0),
(1698218638843500, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'suraj', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 0),
(1698219138115269, 1, '2023-10-25T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 7040, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'suraj', '997056524', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 2, 0),
(1698219749967906, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'suraj', '9907565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 0),
(1698219848453489, 1, '2023-11-13T18:30:00.000Z', '2023-11-14T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 0),
(1698220115837683, 2, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 4400, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 0),
(1698222086926651, 1, '2023-10-27T18:30:00.000Z', '2023-10-30T18:30:00.000Z', 10560, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'mayur@gmail.com', 'satara', 'no', '', '', '', 'M', 'Blue Bell cottage couple AC', 3, 0),
(1698222886257667, 1, '2023-10-27T18:30:00.000Z', '2023-10-30T18:30:00.000Z', 10560, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'mayur@gmail.com', 'satara', 'no', '', '', '', 'aa', 'Blue Bell cottage couple AC', 3, 0),
(1698223511950240, 1, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'masyur@gmail.com', 'satara', 'no', '', '', '', 'ssss', 'Blue Bell cottage couple AC', 1, 0),
(1698227678606236, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', 'nn', 'Blue Bell cottage couple AC', 1, 0),
(1698228250667475, 1, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', ';;', 'Blue Bell cottage couple AC', 1, 0),
(1698228475355879, 1, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', 'hh', 'Blue Bell cottage couple AC', 1, 0),
(1698228803235460, 1, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'masyur@gmail.com', 'satara', 'no', '', '', '', 'jj', 'Blue Bell cottage couple AC', 1, 0),
(1698230215898149, 1, '2023-10-25T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 7040, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'suraj', 'awd', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 2, 0),
(1698230649673100, 1, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'mayur@gmail.com', 'satara', 'no', '', '', '', 'ss', 'Blue Bell cottage couple AC', 1, 0),
(1698234566931801, 1, '2023-10-25T18:30:00.000Z', '2023-10-26T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', 'heloo ', 'Blue Bell cottage couple AC', 1, 0),
(1698314163238434, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', 'ss', 'Blue Bell cottage couple AC', 1, 10),
(1698315018481732, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', 'mm', 'Blue Bell cottage couple AC', 1, 10),
(1698315976202133, 1, '2023-10-26T18:30:00.000Z', '2023-10-27T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'mayur', '08421863607', 'gadhaveprathamesh16@gmail.com', 'satara', 'no', '', '', '', 'jj', 'Blue Bell cottage couple AC', 1, 1056),
(1698839925757231, 1, '2023-11-01T18:30:00.000Z', '2023-11-02T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698840004945605, 1, '2023-11-01T18:30:00.000Z', '2023-11-02T18:30:00.000Z', 5520, 'pending', 'With Breakfast', '3', '2', '6', '5', '', '1', '1200', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1656),
(1698840327282737, 1, '2023-11-14T18:30:00.000Z', '2023-11-15T18:30:00.000Z', 7120, 'pending', 'With Breakfast', '3', '2', '8', '7', '', '1', '1200', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 2136),
(1698909403385506, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698911426362430, 18, '2023-11-28T18:30:00.000Z', '2023-11-29T18:30:00.000Z', 4400, 'pending', 'With Breakfast', '5', '3', '3', '5', '9', '3', '3600', '0', 'suraj', '9970565245', 'awd@ad.com', 'awdawd ajm', 'no', '', '', '', '', 'Blue Bell Cottage 2 - Family Room with Breakfast', 1, 1320),
(1698918673072940, 1, '2023-11-08T18:30:00.000Z', '2023-11-09T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawd ajm', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698918767453747, 1, '2023-11-08T18:30:00.000Z', '2023-11-09T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698919488145203, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9970565243', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698924004916845, 1, '2023-11-08T18:30:00.000Z', '2023-11-09T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698927213604148, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927214611887, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927214831772, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927215128197, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927215298212, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927215473331, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927215638252, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927215796691, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927216112850, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927216290921, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927216475651, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927216641969, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927217227341, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927217398328, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927217605889, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927218206736, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927218489344, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927227454447, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927290721271, 1, '2023-11-22T18:30:00.000Z', '2023-11-23T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927374417202, 1, '2023-11-03T18:30:00.000Z', '2023-11-04T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927514911235, 1, '2023-11-02T18:30:00.000Z', '2023-11-03T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'yes', 'sdadasd', '22AAAAA0000A1Z5', 'asdasd', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698927633363186, 1, '2023-11-16T18:30:00.000Z', '2023-11-17T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'sdwewe hh', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698927662489309, 2, '2023-11-16T18:30:00.000Z', '2023-11-17T18:30:00.000Z', 5500, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1650),
(1698927924042535, 1, '2023-11-07T18:30:00.000Z', '2023-11-08T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698927941252430, 1, '2023-11-07T18:30:00.000Z', '2023-11-08T18:30:00.000Z', 4950, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awd@ad.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1485),
(1698928064517859, 1, '2023-11-03T18:30:00.000Z', '2023-11-06T18:30:00.000Z', 14850, 'pending', 'All Inclusive', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 3, 4455),
(1698928223783474, 1, '2023-11-09T18:30:00.000Z', '2023-11-10T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9970565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698928245271495, 1, '2023-11-09T18:30:00.000Z', '2023-11-10T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'yes', 'fgfdfgd', '22AAAAA0000A1Z5', 'dfdgds', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698928641891460, 2, '2023-11-24T18:30:00.000Z', '2023-11-28T18:30:00.000Z', 35200, 'pending', 'With Breakfast', '5', '3', '9', '5', '2', '3', '3600', '0', 'prathamesh', '9970565242', 'awdawdw@gail.com', 'sdwewe', 'yes', 'fgfdfgd', '22AAAAA0000A1Z5', 'asdasd', 'kj', 'Blue Bell cottage couple AC', 4, 10560),
(1698929819598336, 1, '2023-11-09T18:30:00.000Z', '2023-11-10T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056),
(1698996195241965, 1, '2023-11-06T18:30:00.000Z', '2023-11-07T18:30:00.000Z', 3520, 'pending', 'With Breakfast', '1', '0', '', '', '', '0', '0', '0', 'prathamesh', '9907565243', 'awdawdw@gail.com', 'awdawdawdawd', 'no', '', '', '', '', 'Blue Bell cottage couple AC', 1, 1056);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`ClientID`, `ClientBusinessName`, `ClientName`, `ClientEmail`, `ClientPhone`, `ClientAddress`, `ChildCostForBreakfast`, `ChildCostForAllMeals`, `AdultCostForBreakfast`, `AdultCostForAllMeals`) VALUES
(1, 'River Orchid Resort', 'Sitaram Karande', 'riverorchid1313@gmail.com', '+91-9405751313 / +91-9158785725 / +91-9403268501', 'Tapola', '800', '1200', '1200', '1500'),
(2, 'Royal Inn Stay', 'Ranjit Gaikwad', 'rgaikwad28@yahoo.com', '+91-8551000040', 'Address1 Satara | Address2 Pachwad\r\n', '800', '1200', '1200', '1500');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomID`, `RoomName`, `Description`, `RoomsClientID`, `RoomPhotos`, `RoomsWithBreakFast`, `RoomsWithAllMeals`) VALUES
(1, 'Blue Bell cottage couple AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'http://riverorchidresort.com/img/landing%20page%20img/mango.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg', '3520', '4950'),
(2, 'Blue Bell cottage couple AC', 'An exclusive cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'http://riverorchidresort.com/img/room%20img/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg, http://riverorchidresort.com/img/landing%20page%20img/bluebell%20couple.jpg', '4400', '5500'),
(3, 'Mango cottage Room AC', 'An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32” LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/mango.jpg,https://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, https://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg', '\r\n 7200 ', ' 10000'),
(14, 'Jasmanium Cottage 1 - Couple Room with Breakfast', 'An exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20couple.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20washroom.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20balcony.jpg', '', ''),
(15, 'Jasmanium Cottage 2 - Family Room With Breakfast', 'n exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with two kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20couple.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20washroom.jpg, https://riverorchidresort.com/img/landing%20page%20img/jasmanium%20balcony.jpg', '', ''),
(16, 'Iris Family Cottage - Family Room with Breakfast', 'An exclusive A/C cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, A/C, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/iris%20family%201.jpg, https://riverorchidresort.com/img/landing%20page%20img/iris%20family.jpg, https://riverorchidresort.com/img/landing%20page%20img/iris%20balcony.jpg', '', ''),
(17, 'Lilium Twin Rooms - Family Room with Breakfast', 'An exclusive Family cottage with private sit out facing lawn n lake, the cottage is equipped with Two kingsize bed sleeping accommodation, and two bed rooms among which one is master bedroom with attached bathroom,blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/lilium%202.jpg, https://riverorchidresort.com/img/landing%20page%20img/lilium%20balcony.jpg, https://riverorchidresort.com/img/landing%20page%20img/lilium.jpg', '', ''),
(18, 'Blue Bell Cottage 2 - Family Room with Breakfast', 'An exclusive cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32”LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.', 1, 'https://riverorchidresort.com/img/landing%20page%20img/bluebell%20family.jpg, https://riverorchidresort.com/img/room%20img/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg', '', '');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
