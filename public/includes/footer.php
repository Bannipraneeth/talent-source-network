
<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-logo">
        <i class="briefcase-icon"></i>
        <span>JobConnect</span>
      </div>
      
      <div class="footer-links">
        <div class="footer-section">
          <h3>Site Links</h3>
          <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="jobs.php">Browse Jobs</a></li>
            <li><a href="about.php">About Us</a></li>
            <li><a href="contact.php">Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>For Job Seekers</h3>
          <ul>
            <li><a href="profile.php">My Profile</a></li>
            <li><a href="saved-jobs.php">Saved Jobs</a></li>
            <li><a href="job-alerts.php">Job Alerts</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>For Employers</h3>
          <ul>
            <li><a href="post-job.php">Post a Job</a></li>
            <li><a href="my-jobs.php">My Listings</a></li>
            <li><a href="pricing.php">Pricing</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; <?php echo date('Y'); ?> JobConnect. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background-color: #1e293b;
    color: white;
    padding: 3rem 0 1rem;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
    }
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    flex-grow: 1;
  }
  
  @media (min-width: 640px) {
    .footer-links {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .footer-section h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #f1f5f9;
  }
  
  .footer-section ul {
    list-style: none;
  }
  
  .footer-section li {
    margin-bottom: 0.5rem;
  }
  
  .footer-section a {
    color: #94a3b8;
    transition: color 0.2s ease;
  }
  
  .footer-section a:hover {
    color: white;
  }
  
  .footer-bottom {
    padding-top: 1.5rem;
    border-top: 1px solid #334155;
    text-align: center;
    color: #94a3b8;
    font-size: 0.875rem;
  }
</style>
