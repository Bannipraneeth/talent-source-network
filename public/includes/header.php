
<header class="site-header">
  <div class="container">
    <nav class="main-nav">
      <div class="logo">
        <i class="briefcase-icon"></i>
        <span>JobConnect</span>
      </div>
      
      <div class="nav-links">
        <a href="index.php" class="nav-link">
          <i class="home-icon"></i>
          <span>Home</span>
        </a>
        
        <a href="jobs.php" class="nav-link">
          <i class="briefcase-icon"></i>
          <span>Jobs</span>
        </a>
        
        <?php if(isset($_SESSION['user_id'])): ?>
          <a href="profile.php" class="nav-link active">
            <i class="user-icon"></i>
            <span>Profile</span>
          </a>
          
          <?php if(isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'provider'): ?>
            <a href="my-jobs.php" class="nav-link">
              <i class="briefcase-icon"></i>
              <span>My Jobs</span>
            </a>
          <?php endif; ?>
        <?php endif; ?>
      </div>
      
      <div class="auth-buttons">
        <?php if(isset($_SESSION['user_id'])): ?>
          <a href="logout.php" class="btn outline-btn">
            <i class="logout-icon"></i>
            <span>Logout</span>
          </a>
        <?php else: ?>
          <a href="login.php" class="btn outline-btn">
            <i class="login-icon"></i>
            <span>Login</span>
          </a>
          
          <a href="register.php" class="btn primary-btn">
            <i class="user-plus-icon"></i>
            <span>Register</span>
          </a>
        <?php endif; ?>
      </div>
    </nav>
  </div>
</header>
