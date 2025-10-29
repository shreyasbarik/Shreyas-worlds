const usernames = ["Bishesh_04","Ayush_05","Soumya_01","Shreyas_00","Refer_09"];
const bcryptHash = "$2a$10$O3iRa7sA4jENxb3r5TK9FeW.ZPt13qJ/JGk/IGR71CBOxJw0gLfUy";
document.getElementById('loginForm').onsubmit = async function(e){
  e.preventDefault();
  let uname = this.username.value.trim();
  let psw = this.password.value;
  if (!usernames.includes(uname)) {
    showStatus('Incorrect username');
    return;
  }
  let match = await bcrypt.compare(psw, bcryptHash);
  if (!match) {
    showStatus('Incorrect password');
    return;
  }
  showStatus('Login successful! Redirecting...');
  setTimeout(() => { window.location.href="authority-dashboard.html"; }, 900);
};
function showStatus(msg){ document.getElementById('auth-status').innerText = msg; }
