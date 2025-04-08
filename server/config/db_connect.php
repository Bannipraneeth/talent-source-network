
<?php
// Require the MongoDB PHP library
// Note: You need to install this via Composer:
// composer require mongodb/mongodb

require_once __DIR__ . '/../../vendor/autoload.php';

// MongoDB connection string from .env file
$mongoUri = getenv('MONGO_URI') ?: 'mongodb://localhost:27017/jobportal';

// Create a MongoDB client instance
try {
    $mongoClient = new MongoDB\Client($mongoUri);
    // Test connection by getting server info
    $serverInfo = $mongoClient->selectDatabase('admin')->command(['ping' => 1]);
    
    // Optional: Log successful connection
    error_log('MongoDB connection established');
} catch (Exception $e) {
    // Log and handle connection failure
    error_log('MongoDB connection failed: ' . $e->getMessage());
    throw new Exception('Database connection failed');
}

// Return the MongoDB client instance for use in other files
function getMongoClient() {
    global $mongoClient;
    return $mongoClient;
}
?>
