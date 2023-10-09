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

// $json = file_get_contents('php://input');
// $data = json_decode($json);
// if (!empty($data->formName=="user")) {

//     }
  
// Function to sanitize and validate input data
function sanitizeInput($data) {
    // Sanitize and validate data here (e.g., using mysqli_real_escape_string, filter_var, etc.)
    // Return the sanitized data
    return $data;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize user input from the form
    $clientID = sanitizeInput($_POST['ClientID']);
    $userName = sanitizeInput($_POST['UserName']);
    $userPhone = sanitizeInput($_POST['UserPhone']);
    $userEmail = sanitizeInput($_POST['UserEmail']);
    $userAddress = sanitizeInput($_POST['UserAddress']);
    $IsGST = sanitizeInput($_POST['IsGST']);
    $companyName = ($IsGST === 'yes') ? sanitizeInput($_POST['CompanyName']) : '';
    $companyGST = ($IsGST === 'yes') ? sanitizeInput($_POST['CompanyGST']) : '';
    $companyAddress = ($IsGST === 'yes') ? sanitizeInput($_POST['CompanyAddress']) : '';
    $specialRequest = sanitizeInput($_POST['SpecialRequest']);

    // Check whether the ClientID exists in the clients table
    $clientCheckSQL = "SELECT * FROM clients WHERE ClientID = $clientID";
    $clientCheckResult = $conn->query($clientCheckSQL);

    if ($clientCheckResult->num_rows > 0) {
        // Client exists, insert user data into the users table
        $insertUserSQL = "INSERT INTO users (UserClientID, UserName, UserPhone, UserEmail, UserAddress, IsGST, CompanyName, CompanyGST, CompanyAddress, SpecialReq) VALUES ($clientID, '$userName', '$userPhone', '$userEmail', '$userAddress', '$IsGST', '$companyName', '$companyGST', '$companyAddress', '$specialRequest')";

        if ($conn->query($insertUserSQL) === TRUE) {
            echo "User data inserted successfully.";
        } else {
            echo "Error: " . $insertUserSQL . "<br>" . $conn->error;
        }
    } else {
        echo "Client does not exist.";
    }
}


if (isset($_GET['ClientID'])) {
    $clientID = $_GET['ClientID'];

    $sql = "SELECT r.*, c.* FROM rooms r
            LEFT JOIN clients c ON r.RoomsClientID = c.ClientID
            WHERE r.RoomsClientID = $clientID";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = array(); // Create an array to store the combined data
        $data['client'] = array(); // Initialize the client data as an object
        $data['rooms'] = array(); // Initialize the rooms data as an array

        while ($row = $result->fetch_assoc()) {
            if (empty($data['client'])) {
                $data['client'] = array_filter($row, function ($key) {
                    return strpos($key, 'Client') === 0;
                }, ARRAY_FILTER_USE_KEY);
            }

          $roomsData = array_filter($row, function ($key) {
                return strpos($key, 'Client') !== 0;
            }, ARRAY_FILTER_USE_KEY);

            $data['rooms'][] = $roomsData;
        }

        echo json_encode($data);
    } else {
        echo "Client or rooms not found.";
    }
}

$conn->close();
?>
