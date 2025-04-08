
<?php
// PHP MongoDB connection
require_once 'config/db_connect.php';

// Start session for authentication
session_start();

// Check if user is logged in
if(!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

// Get user profile from MongoDB
$userId = $_SESSION['user_id'];

try {
    // Create MongoDB client
    $mongoClient = new MongoDB\Client("mongodb://localhost:27017");
    
    // Select database and collection
    $collection = $mongoClient->jobportal->users;
    
    // Find user by ID
    $user = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($userId)]);
    
    if(!$user) {
        echo "User not found";
        exit();
    }
    
    // Handle form submission for profile update
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Personal info update
        if(isset($_POST['personal_submit'])) {
            $updateResult = $collection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($userId)],
                ['$set' => [
                    'name' => $_POST['fullName'],
                    'phone' => $_POST['phone'],
                    'location' => $_POST['location'],
                    'bio' => $_POST['bio']
                ]]
            );
            
            if($updateResult->getModifiedCount() > 0) {
                $successMessage = "Personal information updated successfully";
            }
        }
        
        // Professional info update
        if(isset($_POST['professional_submit'])) {
            $updateResult = $collection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($userId)],
                ['$set' => [
                    'title' => $_POST['title'],
                    'experience' => $_POST['experience'],
                    'education' => $_POST['education'],
                    'skills' => $_POST['skills']
                ]]
            );
            
            if($updateResult->getModifiedCount() > 0) {
                $successMessage = "Professional information updated successfully";
            }
        }
        
        // Refresh user data after update
        $user = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($userId)]);
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
    exit();
}
?>
