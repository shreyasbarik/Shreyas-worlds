const allowedUsers = ["Bishesh_04", "Ayush_05", "Soumya_01", "Shreyas_00", "Refer_09"];
const allowedPass = "Lovejust";
const form = document.getElementById('auth-form');
const statusDiv = document.getElementById('login-status');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  if (allowedUsers.includes(username) && password === allowedPass) {
    statusDiv.textContent = "Success. Redirecting…";
    setTimeout(() => window.location.href="authority-dashboard.html", 1200);
  } else {
    statusDiv.textContent = "Incorrect credentials.";
  }
});
