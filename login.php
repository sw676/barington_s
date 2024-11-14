<?php
// login.php: Handle the login logic
session_start();

// Get the form data
$username = $_POST['username'];
$password = $_POST['password'];

// Connect to the database
require('db_connection.php');

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Login successful
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $user['username'];
        header("Location: dashboard.php"); // Redirect to a logged-in page
    } else {
        echo "Invalid password!";
    }
} else {
    echo "User not found!";
}

$stmt->close();
$conn->close();
?>
