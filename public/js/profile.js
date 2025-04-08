
// Profile page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding tab content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Form validation
  const personalForm = document.querySelector('#personal-tab form');
  const professionalForm = document.querySelector('#professional-tab form');
  
  if (personalForm) {
    personalForm.addEventListener('submit', function(e) {
      const fullName = document.getElementById('fullName').value.trim();
      
      if (!fullName) {
        e.preventDefault();
        alert('Please enter your full name');
        return false;
      }
      
      // Could add more validation here
      return true;
    });
  }
  
  // Success message fade out
  const successMessage = document.querySelector('.success-message');
  if (successMessage) {
    setTimeout(() => {
      successMessage.style.opacity = '0';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 500);
    }, 3000);
  }
  
  // Implement AJAX form submission (alternative to traditional form submission)
  // This would be useful for a more modern approach without page reloads
  /*
  const forms = document.querySelectorAll('.profile-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      
      fetch('profile.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Show success message
          showNotification(data.message, 'success');
        } else {
          // Show error message
          showNotification(data.message || 'An error occurred', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showNotification('An error occurred while saving', 'error');
      });
    });
  });
  
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }
  */
});
