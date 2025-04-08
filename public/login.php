
<?php
// Start session
session_start();

// If already logged in, redirect to profile
if(isset($_SESSION['user_id'])) {
    header('Location: profile.php');
    exit();
}

// Handle login form submission
$error = '';
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once 'config/db_connect.php';
    
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Basic validation
    if(empty($email) || empty($password)) {
        $error = 'Please enter both email and password';
    } else {
        try {
            // Create MongoDB client
            $mongoClient = new MongoDB\Client("mongodb://localhost:27017");
            
            // Select database and collection
            $collection = $mongoClient->jobportal->users;
            
            // Find user by email
            $user = $collection->findOne(['email' => $email]);
            
            // Verify user exists and password is correct
            if($user && password_verify($password, $user->password)) {
                // Set session variables
                $_SESSION['user_id'] = (string)$user->_id;
                $_SESSION['user_name'] = $user->name;
                $_SESSION['user_email'] = $user->email;
                $_SESSION['user_role'] = $user->role;
                
                // Redirect to profile
                header('Location: profile.php');
                exit();
            } else {
                $error = 'Invalid email or password';
            }
            
        } catch (Exception $e) {
            $error = 'Login failed: ' . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - JobConnect</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <main class="auth-container">
        <div class="container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1>Welcome back</h1>
                    <p>Enter your credentials to access your account</p>
                </div>
                
                <?php if($error): ?>
                    <div class="error-message">
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>
                
                <form action="login.php" method="POST" class="auth-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <div class="input-icon">
                            <i class="email-icon"></i>
                            <input type="email" id="email" name="email" placeholder="name@example.com" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="label-row">
                            <label for="password">Password</label>
                            <a href="forgot-password.php" class="forgot-link">Forgot password?</a>
                        </div>
                        <div class="input-icon">
                            <i class="lock-icon"></i>
                            <input type="password" id="password" name="password" placeholder="••••••••" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn primary-btn auth-submit">
                        Sign In
                    </button>
                    
                    <div class="auth-footer">
                        Don't have an account?
                        <a href="register.php" class="auth-link">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    </main>
    
    <?php include 'includes/footer.php'; ?>
    
    <style>
        .auth-container {
            padding: 3rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 64px - 400px); /* Subtract header and footer heights */
        }
        
        .auth-card {
            background-color: white;
            border-radius: var(--radius);
            box-shadow: var(--card-shadow);
            width: 100%;
            max-width: 28rem;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .auth-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .auth-header h1 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .auth-header p {
            color: var(--light-text);
        }
        
        .error-message {
            background-color: #fee2e2;
            color: #b91c1c;
            padding: 0.75rem;
            border-radius: var(--radius);
            margin-bottom: 1.5rem;
        }
        
        .input-icon {
            position: relative;
        }
        
        .input-icon i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--light-text);
        }
        
        .input-icon input {
            padding-left: 2.5rem;
        }
        
        .label-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .forgot-link {
            font-size: 0.875rem;
            color: var(--primary-color);
        }
        
        .auth-submit {
            width: 100%;
            margin-top: 1.5rem;
        }
        
        .auth-footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.875rem;
        }
        
        .auth-link {
            color: var(--primary-color);
            font-weight: 500;
        }
    </style>
</body>
</html>
