<?php
// Database connection details
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$database = "booking-engine";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $database);



// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


  
// Function to sanitize and validate input data
function sanitizeInput($data) {
    // Sanitize and validate data here (e.g., using mysqli_real_escape_string, filter_var, etc.)
    // Return the sanitized data
    return $data;
} 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
$data = json_decode($json);
// if (!empty($data->formName=="user")) {

//     }
    // Get and sanitize user input from the form
    $clientID = sanitizeInput($data->ClientID);
    $userName = sanitizeInput($data->UserName);
    $userPhone = sanitizeInput($data->UserPhone);
    $userEmail = sanitizeInput($data->UserEmail);
    $userAddress = sanitizeInput($data->UserAddress);
    $IsGST = sanitizeInput($data->IsGST);
    $companyName = ($data->IsGST === 'yes') ? sanitizeInput($data->CompanyName) : '';
    $companyGST = ($data->IsGST === 'yes') ? sanitizeInput($data->CompanyGST) : '';
    $companyAddress = ($data->IsGST === 'yes') ? sanitizeInput($data->CompanyAddress) : '';
    $specialRequest = sanitizeInput($data->SpecialRequest);

    // Check if a user with the same information already exists
    $userExistsSQL = "SELECT * FROM users WHERE UsersClientID = $clientID AND UserName = '$userName' AND UserPhone = '$userPhone' AND UserEmail = '$userEmail' AND UserAddress = '$userAddress'";
    $userExistsResult = $conn->query($userExistsSQL);

    if ($userExistsResult->num_rows > 0) {
        echo "alreadyExists";
    } else {
        // Client does not exist, insert user data into the users table
        $insertUserSQL = "INSERT INTO users (UsersClientID, UserName, UserPhone, UserEmail, UserAddress, IsGST, CompanyName, CompanyGST, CompanyAddress, SpecialReq) VALUES ($clientID, '$userName', '$userPhone', '$userEmail', '$userAddress', '$IsGST', '$companyName', '$companyGST', '$companyAddress', '$specialReq')";

        if ($conn->query($insertUserSQL) === TRUE) {
            echo "success";
        } else {
            echo "Error";
        }
    }

}

if (isset($_GET['ClientID'])) {
    $clientID = $_GET['ClientID'];

    $sql = "SELECT r.*, c.*, p.* FROM rooms r
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
