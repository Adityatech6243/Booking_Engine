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

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}  
function sanitizeInput($data) {   
    return $data;
} 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
   if (isset($data->searchAvailability)) {
   
    echo "availability";
        $checkInDate = sanitizeInput($data->CheckIn);
      $checkOutDate = sanitizeInput($data->CheckOut);

       $sql = "SELECT * FROM rooms
       WHERE RoomID NOT IN (
           SELECT BookingRoomID FROM bookings
           WHERE (
               (checkInDate <= '$checkOutDate' AND checkOutDate >= '$checkInDate')
               OR
               (checkInDate <= '$checkInDate' AND checkOutDate >= '$checkInDate')
               OR
               (checkInDate >= '$checkInDate' AND checkOutDate <= '$checkOutDate')
           )
       )";
$result = $conn->query($sql);

if ($result) {
    $rooms = array(); // Initialize an array to store room data
    
    while ($row = mysqli_fetch_assoc($result)) {
        $rooms[] = $row;
    }
    // Encode the array as a JSON object
    $jsonObject = json_encode($rooms);

    // Output the JSON object
    echo $jsonObject;
}
}
    if (isset($data->YourDetails)) {
        $numAdults = sanitizeInput($data->Adults);
        $checkInDate = sanitizeInput($data->CheckIn);
        $checkOutDate = sanitizeInput($data->CheckOut);
        $bookingRoomType = sanitizeInput($data->RoomType);
        $clientID = sanitizeInput($data->ClientID);
        $numChildren = sanitizeInput($data->Childrens);
        $children1Ages = sanitizeInput($data->Child1Age);
        $children2Ages = sanitizeInput($data->Child2Age);
        $children3Ages = sanitizeInput($data->Child3Age);
        $totalPrice = sanitizeInput($data->price);
    
        // Insert user data
        $userName = sanitizeInput($data->UserName);
        $userPhone = sanitizeInput($data->UserPhone);
        $userEmail = sanitizeInput($data->UserEmail);
        $userAddress = sanitizeInput($data->UserAddress);
        $IsGST = sanitizeInput($data->IsGST);
        $companyName = ($IsGST === 'yes') ? sanitizeInput($data->CompanyName) : '';
        $companyGST = ($IsGST === 'yes') ? sanitizeInput($data->CompanyGST) : '';
        $companyAddress = ($IsGST === 'yes') ? sanitizeInput($data->CompanyAddress) : '';
        $specialRequest = sanitizeInput($data->SpecialRequest);
    

        
        $insertUserSQL = "INSERT INTO users (UsersClientID, UserName, UserPhone, UserEmail, UserAddress, IsGST, CompanyName, CompanyGST, CompanyAddress, SpecialRequest) VALUES ($clientID, '$userName', '$userPhone', '$userEmail', '$userAddress', '$IsGST', '$companyName', '$companyGST', '$companyAddress', '$specialRequest')";

        if ($conn->query($insertUserSQL) === TRUE) {
            $userClientID = $conn->insert_id; // Get the auto-generated user ID
            // Next, insert booking data
            $roomID = sanitizeInput($data->RoomID);
 // Check if the room with the specified RoomID exists in the "rooms" table
            $checkRoomSQL = "SELECT RoomID FROM rooms WHERE RoomID = '$roomID'";
            $roomResult = $conn->query($checkRoomSQL);
            if ($roomResult->num_rows > 0) {
                // The room exists, so we can proceed with the booking
                $insertBookingSQL = "INSERT INTO bookings (BookingRoomID, BookingUserID, Adults, NumChildrens, Child1Age, Child2Age, Child3Age, CheckInDate, CheckOutDate, TotalPrice) VALUES ('$roomID', '$userClientID', '$numAdults', '$numChildren', '$children1Ages', '$children2Ages', '$children3Ages', '$checkInDate', '$checkOutDate', '$totalPrice')";
    
                if ($conn->query($insertBookingSQL) === TRUE) {
                    echo "Success";
                } else {
                    echo "Error inserting booking data: " . $conn->error;
                }
            } else {
                echo "Error: The specified room (RoomID) does not exist.";
            }
        } else {
            echo "Error inserting user data: " . $conn->error;
        }
    }
}
if (isset($_GET['ClientID'])) {
    $clientID = $_GET['ClientID'];

    $sql = "SELECT r., c., p.* FROM rooms r
            LEFT JOIN clients c ON r.RoomsClientID = c.ClientID
            LEFT JOIN policies p ON c.ClientID = p.ClientID
            WHERE r.RoomsClientID = $clientID";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = array(); // Create an array to store the combined data
        $data['client'] = array(); // Initialize the client data as an object
        $data['rooms'] = array(); // Initialize the rooms data as an array
        $data['policies'] = array(); // Initialize the rooms data as an array

        while ($row = $result->fetch_assoc()) {
            if (empty($data['client'])) {
                $clientData = array_filter($row, function ($key) {
                    // Define an array of keys that are related to the 'client' object
                    $clientKeys = ['ClientID', 'ClientBusinessName', 'ClientName', 'ClientEmail', 'ClientPhone', 'ClientAddress'];
            
                    // Check if the key is in the 'clientKeys' array
                    return in_array($key, $clientKeys);
                }, ARRAY_FILTER_USE_KEY);
            
                $data['client'] = $clientData;
            }
            
            $includeKeys = ['RoomsClientID','RoomsWithAllMeals','RoomsWithBreakFast', 'RoomPhotos', 'RoomName', 'RoomID', 'PricePerNight', 'Description'];

            $roomsData = array_filter($row, function ($key) use ($includeKeys) {
                return in_array($key, $includeKeys);
            }, ARRAY_FILTER_USE_KEY);
            
            $data['rooms'][] = $roomsData;
            
            if (empty($data['policies'])) {
                $policiesData = array_filter($row, function ($key) {
                    $includeKeys = ['CheckIn', 'CheckOut', 'LateCheckOut', 'CancellationPolicies', 'PolicyID'];
                    return in_array($key, $includeKeys);
                }, ARRAY_FILTER_USE_KEY);
            
                // Convert the CancellationPolicies string to an array
                if (isset($policiesData['CancellationPolicies'])) {
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