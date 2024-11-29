// script.js

// Page elements
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const reportPage = document.getElementById('report-page');

// Login functionality
document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    alert(`Welcome, ${username}!`);
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
  } else {
    alert('Please enter both username and password.');
  }
});

// View attendance report
document.getElementById('view-attendance-btn').addEventListener('click', () => {
  dashboardPage.classList.add('hidden');
  reportPage.classList.remove('hidden');

  const sampleData = [
    { name: 'Alice', course: 'Math 101', attendance: '90%' },
    { name: 'Bob', course: 'Physics 201', attendance: '85%' },
    { name: 'Charlie', course: 'History 301', attendance: '95%' },
  ];

  const reportBody = document.getElementById('report-body');
  reportBody.innerHTML = sampleData
    .map(
      (row) => `
      <tr class="hover:bg-gray-100">
        <td class="border px-4 py-3">${row.name}</td>
        <td class="border px-4 py-3">${row.course}</td>
        <td class="border px-4 py-3">${row.attendance}</td>
      </tr>
    `
    )
    .join('');
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
  dashboardPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
  alert('You have been logged out.');
});

// Back to dashboard
document.getElementById('back-to-dashboard').addEventListener('click', () => {
  reportPage.classList.add('hidden');
  dashboardPage.classList.remove('hidden');
});
