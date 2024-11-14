CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

<?php
// db_connection.php: Replace with your actual database connection details
$servername = "localhost";
$username = "Sabrina Wang";
$password = "9eXBmP!6Ze2N";
$dbname = "login_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Example user data
$user = 'testuser';
$pass = password_hash('testpassword', PASSWORD_DEFAULT); // Hash the password

$sql = "INSERT INTO users (username, password) VALUES ('$user', '$pass')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>