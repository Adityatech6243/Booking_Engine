<?php
// Database connection details
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$database = "booking-engine";

$conn = new mysqli($servername, $username, $password, $database);

if($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
}
function sanitizeInput($data) {
    return $data;
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json);


    if(isset($data->roomId) && isset($data->priceWithBreakfast) && isset($data->priceWithBreakfast) && isset($data->priceWithAllMeals) && isset($data->priceWithAllMeals) && isset($data->changePrice) && $data->changePrice == "true") {
        $updateRoomPriceSQL = "UPDATE rooms SET RoomsWithBreakfast='$data->priceWithBreakfast', RoomsWithAllMeals='$data->priceWithAllMeals' WHERE RoomID='$data->roomId'";
        if($conn->query($updateRoomPriceSQL) === TRUE) {
            echo "true";
        } else {
            echo "false";
        }
    }

    if(isset($data->bookingID) && isset($data->delete) && $data->delete == "true") {

        $sql = "DELETE FROM bookings WHERE BookingID = $data->bookingID";
        $result = $conn->query($sql);

        if($result) {
            echo "true";
        } else {
            echo "false";
        }
    }

    if(isset($data->username) && isset($data->password)) {
        if($data->username == "sitaram" && $data->password == "karande") {
            echo "true";
        } else {
            echo "false";
        }
    }


    if(isset($data->bookingRoomId) && isset($data->checkInDate) && isset($data->checkOutDate) && isset($data->newBooking) && $data->newBooking == "true") {
        $insertBookingSQL = "INSERT INTO bookings (BookingRoomID, CheckInDate, CheckOutDate, PaymentStatus) VALUES (
                                                                '$data->bookingRoomId', 
                                                                '$data->checkInDate', 
                                                                '$data->checkOutDate', 
                                                                'paid')";
        if($conn->query($insertBookingSQL) === TRUE) {

            // Fetch booking details
            $sql = "SELECT BookingID, BookingRoomID, CheckInDate, CheckOutDate FROM bookings WHERE PaymentStatus = 'paid'";
            $result = $conn->query($sql);

            $bookingsData = array(); // Create an array to store booking details
            while($row = $result->fetch_assoc()) {
                $bookingDetails = array(
                    'BookingID' => $row['BookingID'],
                    'BookingRoomID' => $row['BookingRoomID'],
                    'CheckInDate' => $row['CheckInDate'],
                    'CheckOutDate' => $row['CheckOutDate']
                );
                $bookingsData[] = $bookingDetails; // Append booking details to the bookingsData array
            }

            // Output the $data array as JSON
            echo json_encode($bookingsData);
            //echo "ok ki r" . $data->bookingRoomId . $data->checkInDate . $data->checkOutDate;
        }
    }

    if(isset($data->searchAvailability)) {


        $checkInDate = sanitizeInput($data->CheckIn);
        $checkOutDate = sanitizeInput($data->CheckOut);
        $checkInTimestamp = strtotime($checkInDate);
        $checkOutTimestamp = strtotime($checkOutDate);

        $numAdults = sanitizeInput($data->Adults);
        $numChildren = sanitizeInput($data->Childrens);
        $children1Ages = sanitizeInput($data->Child1Age);
        $children2Ages = sanitizeInput($data->Child2Age);
        $children3Ages = sanitizeInput($data->Child3Age);

        if($numChildren <= 3 && $numAdults <= 5 && $children1Ages <= 9 && $children2Ages <= 9 && $children3Ages <= 9 && strtotime($checkInDate) !== false && strtotime($checkOutDate) !== false) {
            // Your code to execute when all conditions are met
            $sql = "SELECT r.*, c.ChildCostForBreakfast, c.ChildCostForAllMeals, c.AdultCostForBreakfast, c.AdultCostForAllMeals
        FROM rooms r
        LEFT JOIN clients c ON 1=1
        WHERE r.RoomID NOT IN (
            SELECT BookingRoomID FROM bookings
            WHERE (
                (checkInDate <= '$checkOutDate' AND checkOutDate >= '$checkInDate')
                OR
                (checkInDate <= '$checkInDate' AND checkOutDate >= '$checkInDate')
                OR
                (checkInDate >= '$checkInDate' AND checkOutDate <= '$checkOutDate')
            ) 
            AND paymentStatus = 'paid'
        )";


            $result = $conn->query($sql);

            if($result) {
                $rooms = array(); // Initialize an array to store room data

                while($row = mysqli_fetch_assoc($result)) {
                    if($numAdults <= $row['capacity']) {
                        // Calculate the updated price per night based on the number of adults and children's ages
                        $RoomsWithAllMeals = floatval($row['RoomsWithAllMeals']);
                        $RoomsWithBreakFast = floatval($row['RoomsWithBreakFast']);
                        $rateChildCostForBreakfast = floatval($row['ChildCostForBreakfast']);
                        $rateChildCostForAllMeals = floatval($row['ChildCostForAllMeals']);
                        $ChildCostForBreakfast = 0;
                        $ChildCostForAllMeals = 0;
                        $AdultCostForAllMeals = floatval($row['AdultCostForAllMeals']);
                        $AdultCostForBreakfast = floatval($row['AdultCostForBreakfast']);
                        $ExtraBed = 0;
                        $ChildCost = 0;
                        $dateDifference = $checkOutTimestamp - $checkInTimestamp;
                        $numberOfNights = floor($dateDifference / (60 * 60 * 24)); // 60 seconds * 60 minutes * 24 hours



                        if($row['RoomName'] == "Mango cottage Room AC") {
                            if($numAdults == 1 && $numChildren == 1) {

                                $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                                $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                                $row['ExtraBed'] = $ExtraBed;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                            }
                            //if adults == 1 and child == 1
                            // adult = adult+child
                            // adult == capacity ==  regular p[rice]

                            if($numAdults == 1 && $numChildren > 1) {
                                if(($numAdults + $numChildren - 2) == 1) {
                                    if($children2Ages > 5 && $children2Ages < 10) {

                                        $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                        $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                    }
                                }
                                if(($numAdults + $numChildren - 2) == 2) {
                                    if($children3Ages > 5 && $children3Ages < 10) {

                                        $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                        $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                    }
                                }
                                $RoomsWithBreakFast += $ChildCostForBreakfast; //- $ratetosubtract*$rateChildCostForBreakfast;
                                $RoomsWithAllMeals += $ChildCostForAllMeals;
                                $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                                $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                                $row['ExtraBed'] = $ExtraBed;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                            }
                            // if adults  == 1 & children > 1
                            // adult + child (2) = 3
                            //  3 - ca[acity = 1
                            // regular + extra for 1 child

                            if($numAdults == 2 && $numChildren >= 1) {
                                if($children1Ages > 5 && $children1Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                if($children2Ages > 5 && $children2Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                if($children3Ages > 5 && $children3Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                $RoomsWithBreakFast += $ChildCostForBreakfast; //- $ratetosubtract*$rateChildCostForBreakfast;
                                $RoomsWithAllMeals += $ChildCostForAllMeals;
                                $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                                $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                                $row['ExtraBed'] = $ExtraBed;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;

                            }
                            // if adults  == 2 & children >=1
                            // adult + child (2) = 4
                            //  4 - ca[acity = 2
                            // regular + extra for 2 child
                            if($numAdults == 2 && $numChildren == 0) {

                                $row['ChildCostForBreakfast'] = 0;
                                $row['ChildCostForAllMeals'] = 0;
                                $row['ExtraBed'] = 0;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                            }

                            //if adults == 2 child == 0
                            //regular

                            ; //- $ratetosubtract*$rateChildCostForAllMeals;

                            // if( $numAdults=1 && $numChildren>=2 ){ 
                            //     if ($children1Ages > 5 && $children1Ages < 10)
                            //     {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     if ($children2Ages > 5 && $children2Ages < 10) {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     if ($children3Ages > 5 && $children3Ages < 10) {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     $ChildCostForBreakfast=$ChildCostForBreakfast-$rateChildCostForBreakfast;
                            //     $ChildCostForAllMeals=$ChildCostForAllMeals- $rateChildCostForAllMeals;
                            //     $RoomsWithBreakFast +=  $ChildCostForBreakfast;
                            //     $RoomsWithAllMeals +=  $ChildCostForAllMeals;
                            // }



                        }

                        if($row['RoomName'] !== "Mango cottage Room AC") {
                            if($numAdults + $numChildren <= 4) {
                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;
                                $row['numberOfNights'] = $numberOfNights;
                                $row['where'] = "5";
                            }
                            //if adults == 1 and child == 1
                            // adult = adult+child
                            // adult == capacity ==  regular p[rice]

                            if($numAdults == 3 && $numChildren > 1) {
                                if($children2Ages > 5 && $children2Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                if($children3Ages > 5 && $children3Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }

                                $RoomsWithBreakFast += $ChildCostForBreakfast; //- $ratetosubtract*$rateChildCostForBreakfast;
                                $RoomsWithAllMeals += $ChildCostForAllMeals;
                                $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                                $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                                $row['ExtraBed'] = $ExtraBed;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                                $row['where'] = "0";
                            }

                            if($numAdults == 2 && $numChildren == 3) {

                                if($children3Ages > 5 && $children3Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                $RoomsWithBreakFast += $ChildCostForBreakfast; //- $ratetosubtract*$rateChildCostForBreakfast;
                                $RoomsWithAllMeals += $ChildCostForAllMeals;
                                $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                                $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                                $row['ExtraBed'] = $ExtraBed;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                                $row['where'] = "30";
                            }

                            if($numAdults >= 4 && $numChildren >= 1) {
                                $RoomsWithBreakFast += ($numAdults - 4) * $AdultCostForBreakfast;
                                $RoomsWithAllMeals += ($numAdults - 4) * $AdultCostForAllMeals;
                                $ExtraBed += $numAdults - 4;

                                if($children1Ages > 5 && $children1Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                if($children2Ages > 5 && $children2Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }
                                if($children3Ages > 5 && $children3Ages < 10) {

                                    $ChildCostForBreakfast += $rateChildCostForBreakfast;
                                    $ChildCostForAllMeals += $rateChildCostForAllMeals;
                                }

                                $RoomsWithBreakFast += $ChildCostForBreakfast; //- $ratetosubtract*$rateChildCostForBreakfast;
                                $RoomsWithAllMeals += $ChildCostForAllMeals;
                                $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                                $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                                $row['ExtraBed'] = $ExtraBed;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                                $row['where'] = "3";
                            }
                            // if adults  == 1 & children > 1
                            // adult + child (2) = 3
                            //  3 - ca[acity = 1
                            // regular + extra for 1 child

                            //    if($numAdults==4 && $numChildren>=1){
                            //     if ($children1Ages > 5 && $children1Ages < 10)
                            //     {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     if ($children2Ages > 5 && $children2Ages < 10) {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     if ($children3Ages > 5 && $children3Ages < 10) {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     $RoomsWithBreakFast +=  $ChildCostForBreakfast ;//- $ratetosubtract*$rateChildCostForBreakfast;
                            //     $RoomsWithAllMeals +=  $ChildCostForAllMeals  ;
                            //     $row['ChildCostForBreakfast'] = $ChildCostForBreakfast * $numberOfNights;
                            //     $row['ChildCostForAllMeals'] = $ChildCostForAllMeals * $numberOfNights;
                            //     $row['ExtraBed'] = $ExtraBed;

                            //     $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                            //     $row['RoomsWithBreakFast'] = $RoomsWithBreakFast *$numberOfNights;

                            //     $row['numberOfNights'] = $numberOfNights;
                            //     $row['where'] = "1";

                            //    }
                            // if adults  == 2 & children >=1
                            // adult + child (2) = 4
                            //  4 - ca[acity = 2
                            // regular + extra for 2 child
                            //    if($numAdults==4 && $numChildren==0){

                            //     $row['ChildCostForBreakfast'] =0;
                            //     $row['ChildCostForAllMeals'] = 0;
                            //     $row['ExtraBed'] = 0;

                            //     $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                            //     $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                            //     $row['numberOfNights'] = $numberOfNights;
                            //     $row['where'] = "2";
                            //    }
                            if($numAdults > 4 && $numChildren == 0) {
                                $RoomsWithBreakFast += ($numAdults - 4) * $AdultCostForBreakfast;
                                $RoomsWithAllMeals += ($numAdults - 4) * $AdultCostForAllMeals;
                                $ExtraBed += $numAdults - 4;


                                $row['ChildCostForBreakfast'] = 0;
                                $row['ChildCostForAllMeals'] = 0;
                                $row['ExtraBed'] = 0;

                                $row['RoomsWithAllMeals'] = $RoomsWithAllMeals * $numberOfNights;
                                $row['RoomsWithBreakFast'] = $RoomsWithBreakFast * $numberOfNights;

                                $row['numberOfNights'] = $numberOfNights;
                                $row['where'] = "2";
                            }

                            //if adults == 2 child == 0
                            //regular

                            ; //- $ratetosubtract*$rateChildCostForAllMeals;

                            // if( $numAdults=1 && $numChildren>=2 ){ 
                            //     if ($children1Ages > 5 && $children1Ages < 10)
                            //     {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     if ($children2Ages > 5 && $children2Ages < 10) {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     if ($children3Ages > 5 && $children3Ages < 10) {

                            //         $ChildCostForBreakfast += $rateChildCostForBreakfast;
                            //         $ChildCostForAllMeals += $rateChildCostForAllMeals;
                            //     }
                            //     $ChildCostForBreakfast=$ChildCostForBreakfast-$rateChildCostForBreakfast;
                            //     $ChildCostForAllMeals=$ChildCostForAllMeals- $rateChildCostForAllMeals;
                            //     $RoomsWithBreakFast +=  $ChildCostForBreakfast;
                            //     $RoomsWithAllMeals +=  $ChildCostForAllMeals;
                            // }



                        }
                        // if($numAdults+$numChildren>4 && $row['RoomName'] !=="Mango cottage Room AC")
                        //     {

                        //         $RoomsWithBreakFast += ($numAdults - 2) * $AdultCostForBreakfast;
                        //         $RoomsWithAllMeals += ($numAdults - 2) * $AdultCostForAllMeals;
                        //         $ExtraBed += $numAdults - 2;

                        //         if ($children1Ages > 5 && $children1Ages < 10) {
                        //         $RoomsWithBreakFast +=  $ChildCostForBreakfast;
                        //         $RoomsWithAllMeals +=  $ChildCostForAllMeals;
                        //         $ChildCostForBreakfast += $ChildCostForBreakfast;
                        //         $ChildCostForAllMeals += $ChildCostForAllMeals;
                        //     }
                        //     if ($children2Ages > 5 && $children2Ages < 10) {
                        //         $RoomsWithBreakFast +=  $ChildCostForBreakfast;
                        //         $RoomsWithAllMeals +=  $ChildCostForAllMeals;
                        //         $ChildCostForBreakfast += $ChildCostForBreakfast;
                        //         $ChildCostForAllMeals += $ChildCostForAllMeals;
                        //     }
                        //     if ($children3Ages > 5 && $children3Ages < 10) {
                        //         $RoomsWithBreakFast +=  $ChildCostForBreakfast;
                        //         $RoomsWithAllMeals +=  $ChildCostForAllMeals;
                        //         $ChildCostForBreakfast += $ChildCostForBreakfast;
                        //         $ChildCostForAllMeals += $ChildCostForAllMeals;
                        //     }
                        // }


                        // Update the price per night in the room data




                        // Add the room data to the array
                        $rooms[] = $row;
                    }
                }

                // Encode the array as a JSON object
                $jsonObject = json_encode($rooms);

                // Output the JSON object
                echo $jsonObject;
            }
        } else {
            // Your code to execute when one or more conditions are not met
            echo "Information is invalid.";
        }
    }
    if(isset($data->YourDetails)) {

        $checkInDate = sanitizeInput($data->CheckIn);
        $checkOutDate = sanitizeInput($data->CheckOut);
        $bookingRoomType = sanitizeInput($data->RoomType);
        $clientID = sanitizeInput($data->ClientID);
        $roomID = sanitizeInput($data->RoomID);
        $numAdults = sanitizeInput($data->Adults);
        $numChildren = sanitizeInput($data->Childrens);
        $children1Ages = sanitizeInput($data->Child1Age);
        $children2Ages = sanitizeInput($data->Child2Age);
        $children3Ages = sanitizeInput($data->Child3Age);
        $RoomName = sanitizeInput($data->RoomName);

        //$ChildCost = sanitizeInput($data->ChildCost);
        $ExtraBed = sanitizeInput($data->ExtraBed);
        $numberOfNights = sanitizeInput($data->numberOfNights);
        $RoomsWithAllMeals = sanitizeInput($data->RoomsWithAllMeals);
        $RoomsWithBreakFast = sanitizeInput($data->RoomsWithBreakFast);
        $userName = sanitizeInput($data->UserName);
        $userPhone = sanitizeInput($data->UserPhone);
        $userEmail = sanitizeInput($data->UserEmail);
        $userAddress = sanitizeInput($data->UserAddress);
        $IsGST = sanitizeInput($data->IsGST);
        $companyName = ($IsGST === 'yes') ? sanitizeInput($data->CompanyName) : '';
        $companyGST = ($IsGST === 'yes') ? sanitizeInput($data->CompanyGST) : '';
        $companyAddress = ($IsGST === 'yes') ? sanitizeInput($data->CompanyAddress) : '';
        $totalPrice = ($bookingRoomType === 'All Inclusive') ? $RoomsWithAllMeals : $RoomsWithBreakFast;
        $ExtraBedCost = 0;
        $specialRequest = sanitizeInput($data->SpecialRequest);
        if($numAdults > 2) {
            $ExtraBedCost = ($bookingRoomType === 'All Inclusive') ? ($numAdults - 2) * 1500 : ($numAdults - 2) * 1200;
        }
        $ChildCost = ($bookingRoomType === 'All Inclusive') ? sanitizeInput($data->ChildCostForAllMeals) : sanitizeInput($data->ChildCostForBreakfast);

        $BookingID = round(microtime(true) * 1000).mt_rand(100, 999);
        $AmtToPaid = $totalPrice * 0.30;

        $insertBookingSQL = "INSERT INTO bookings ( UserName,
                                                                UserPhone, 
                                                                UserEmail, 
                                                                UserAddress, 
                                                                IsGST, 
                                                                CompanyName, 
                                                                CompanyGST, 
                                                                CompanyAddress, 
                                                                SpecialRequest,
                                                                BookingID ,
                                                                BookingRoomID, 
                                                                RoomName,
                                                                numberOfNights,
                                                                Adults, 
                                                                NumChildrens, 
                                                                Child1Age, 
                                                                Child2Age, 
                                                                Child3Age, 
                                                                CheckInDate, 
                                                                CheckOutDate, 
                                                                TotalPrice, 
                                                                BookingRoomType, 
                                                                ExtraBed, 
                                                                ExtraBedCost, 
                                                                ChildCost,
                                                                PaymentStatus,
                                                                AmtToPaid
                                                            ) VALUES (
                                                                '$userName', 
                                                                '$userPhone', 
                                                                '$userEmail', 
                                                                '$userAddress', 
                                                                '$IsGST', 
                                                                '$companyName', 
                                                                '$companyGST', 
                                                                '$companyAddress', 
                                                                '$specialRequest',
                                                                '$BookingID',
                                                                '$roomID', 
                                                                '$RoomName',
                                                                '$numberOfNights',
                                                                '$numAdults', 
                                                                '$numChildren', 
                                                                '$children1Ages', 
                                                                '$children2Ages', 
                                                                '$children3Ages', 
                                                                '$checkInDate', 
                                                                '$checkOutDate', 
                                                                '$totalPrice', 
                                                                '$bookingRoomType', 
                                                                '$ExtraBed', 
                                                                '$ExtraBedCost', 
                                                                '$ChildCost',
                                                                'pending',
                                                                '$AmtToPaid'
                                                                
                                                                )";

        if($conn->query($insertBookingSQL) === TRUE) {
            if($numAdults <= 2) {
                $sql = "SELECT * FROM bookings WHERE BookingID=$BookingID";
                $result = $conn->query($sql);
                echo json_encode(mysqli_fetch_assoc($result));
            } else {
                $sql = "SELECT * FROM bookings WHERE BookingID = $BookingID AND capacity = 4";
                $result = $conn->query($sql);
                echo json_encode(mysqli_fetch_assoc($result));
            }

        } else {
            echo "Error inserting booking data: ".$conn->error;
        }
    }
}

if(isset($_GET['getAllBookings'])) {
    $data = array(); // Create an array to store the combined data

    // Fetch room details
    $roomsSql = "SELECT RoomID, RoomName FROM rooms";
    $roomsSqlresult = $conn->query($roomsSql);

    $roomsData = array(); // Create an array to store room details
    while($row = $roomsSqlresult->fetch_assoc()) {
        $rooms = array(
            'RoomID' => $row['RoomID'],
            'RoomName' => $row['RoomName'],
        );
        $roomsData[] = $rooms; // Append room details to the roomsData array
    }
    $data["rooms"] = $roomsData; // Assign roomsData array to 'rooms' key in $data

    // Fetch booking details
    $sql = "SELECT BookingID, BookingRoomID, CheckInDate, CheckOutDate FROM bookings WHERE PaymentStatus = 'paid'";
    $result = $conn->query($sql);

    $bookingsData = array(); // Create an array to store booking details
    while($row = $result->fetch_assoc()) {
        $bookingDetails = array(
            'BookingID' => $row['BookingID'],
            'BookingRoomID' => $row['BookingRoomID'],
            'CheckInDate' => $row['CheckInDate'],
            'CheckOutDate' => $row['CheckOutDate']
        );
        $bookingsData[] = $bookingDetails; // Append booking details to the bookingsData array
    }
    $data["bookings"] = $bookingsData; // Assign bookingsData array to 'bookings' key in $data

    // Output the $data array as JSON
    echo json_encode($data);
}



if(isset($_GET['ClientID'])) {
    $clientID = $_GET['ClientID'];

    $sql = "SELECT r.*, c.*, p.* FROM rooms r
            LEFT JOIN clients c ON r.RoomsClientID = c.ClientID
            LEFT JOIN policies p ON c.ClientID = p.ClientID
            WHERE r.RoomsClientID = $clientID";

    $result = $conn->query($sql);

    if($result->num_rows > 0) {
        $data = array(); // Create an array to store the combined data
        $data['client'] = array(); // Initialize the client data as an object
        $data['policies'] = array(); // Initialize the rooms data as an array

        while($row = $result->fetch_assoc()) {
            if(empty($data['client'])) {
                $clientData = array_filter($row, function ($key) {
                    $clientKeys = ['ClientID', 'ClientBusinessName', 'ClientName', 'ClientEmail', 'ClientPhone', 'ClientAddress'];
                    return in_array($key, $clientKeys);
                }, ARRAY_FILTER_USE_KEY);
                $data['client'] = $clientData;
            }
            if(empty($data['policies'])) {
                $policiesData = array_filter($row, function ($key) {
                    $includeKeys = ['CheckIn', 'CheckOut', 'LateCheckOut', 'CancellationPolicies', 'PolicyID'];
                    return in_array($key, $includeKeys);
                }, ARRAY_FILTER_USE_KEY);
                if(isset($policiesData['CancellationPolicies'])) {
                    $policiesData['CancellationPolicies'] = json_decode($policiesData['CancellationPolicies'], true);
                }
                $data['policies'] = $policiesData;
            }
        }

        echo json_encode($data);
    } else {
        echo "Client or rooms not found.";
    }
}
$conn->close();
?>