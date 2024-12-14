const users = [
  // Students
  { 
      username: 'ofer', 
      password: 'ofer', 
      role: 'student',
      courses: [
          { name: 'Algo', attendance: '90%' },
          { name: 'Web', attendance: '100%' }
      ]
  },
  { 
      username: 'tomer', 
      password: 'tomer', 
      role: 'student',
      courses: [
          { name: 'Machine Learning', attendance: '95%' },
          { name: 'Web', attendance: '100%' }
      ]
  },
  { 
    username: 'oran', 
    password: 'oran', 
    role: 'student',
    courses: [
        { name: 'Machine Learning', attendance: '50%' },
        { name: 'Web', attendance: '0%' }
    ]
},

  // Lecturer
  { 
      username: 'lect1', 
      password: 'lect1', 
      role: 'lecturer',
      courses: [
          { name: 'Machine Learning', students:[
            {name: 'tomer', attendance: '95%' },
            {name: 'oran', attendance: '0%'}
          ] },
          { name: 'Singing' }
      ]
  },
  { 
    username: 'lect2', 
    password: 'lect2', 
    role: 'lecturer',
    courses: [
        { name: 'Algo', students: [
          { name: 'ofer', attendance: '90%' },
      ] },
        { name: 'Web', students: [
          { name: 'ofer', attendance: '100%' },
          { name: 'tomer', attendance: '100%' },
          { name: 'oran', attendance: '0%' }
      ] }
    ]
}
];

// Page elements
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');

// Login functionality with role-based routing
document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      loginPage.classList.add('hidden');
      
      if (user.role === 'student') {
          renderStudentDashboard(user);
      } else if (user.role === 'lecturer') {
          renderLecturerDashboard(user);
      }
  } else {
    displayUsernamesAndPasswords();
  }
});

function renderStudentDashboard(user) {
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">Student Dashboard</h1>
      <div class="grid gap-4">
          <button id="view-courses-btn" class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-md transition-all">
              View My Courses
          </button>
          <button id="profile-btn" class="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 shadow-md transition-all">
              Manage Profile
          </button>
          <button id="logout-btn" class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 shadow-md transition-all">
              Logout
          </button>
      </div>
  `;
  dashboardPage.classList.remove('hidden');

  document.getElementById('view-courses-btn').addEventListener('click', () => {
      renderStudentCourses(user);
  });

  document.getElementById('profile-btn').addEventListener('click', () => {
      renderStudentProfile(user);
  });

  document.getElementById('logout-btn').addEventListener('click', logout);
}

function renderLecturerDashboard(user) {
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">Lecturer Dashboard</h1>
      <div class="grid gap-4">
          <button id="view-courses-btn" class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-md transition-all">
              My Courses
          </button>
          <button id="profile-btn" class="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 shadow-md transition-all">
              Manage Profile
          </button>
          <button id="logout-btn" class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 shadow-md transition-all">
              Logout
          </button>
      </div>
  `;
  dashboardPage.classList.remove('hidden');

  document.getElementById('view-courses-btn').addEventListener('click', () => {
      renderLecturerCourses(user);
  });

  document.getElementById('profile-btn').addEventListener('click', () => {
      renderLecturerProfile(user);
  });

  document.getElementById('logout-btn').addEventListener('click', logout);
}

function renderStudentCourses(user) {
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">My Courses</h1>
      <table class="w-full bg-white rounded-lg shadow-md">
          <thead>
              <tr class="bg-blue-500 text-white">
                  <th class="px-4 py-3">Course</th>
                  <th class="px-4 py-3">Attendance</th>
              </tr>
          </thead>
          <tbody>
              ${user.courses.map(course => `
                  <tr>
                      <td class="border px-4 py-3">${course.name}</td>
                      <td class="border px-4 py-3">${course.attendance}</td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
      <button id="back-to-dashboard" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all">
          Back to Dashboard
      </button>
  `;

  document.getElementById('back-to-dashboard').addEventListener('click', () => {
      renderStudentDashboard(user);
  });
}

function renderLecturerCourses(user) {
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">My Courses</h1>
      <div class="grid gap-4">
          ${user.courses.map((course, index) => `
              <button id="course-${index}" class="course-btn bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-md transition-all">
                  ${course.name}
              </button>
          `).join('')}
      </div>
      <button id="back-to-dashboard" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all">
          Back to Dashboard
      </button>
  `;

  // Add event listeners for each course
  user.courses.forEach((course, index) => {
      document.getElementById(`course-${index}`).addEventListener('click', () => {
          renderCourseStudents(course);
      });
  });

  document.getElementById('back-to-dashboard').addEventListener('click', () => {
      renderLecturerDashboard(user);
  });
}

function renderCourseStudents(course) {
  //if there are no student
  if (!course.students || course.students.length === 0) {
    dashboardPage.innerHTML = `
        <h1 class="text-4xl font-bold mb-6 text-gray-800">${course.name}</h1>
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p>No students are currently enrolled in this course.</p>
        </div>
        <button id="back-to-courses" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all">
            Back to Courses
        </button>
    `;
    document.getElementById('back-to-courses').addEventListener('click', () => {
        renderLecturerCourses(JSON.parse(localStorage.getItem('currentUser')));
    });
    return;
}
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">${course.name} - Students</h1>
      <table class="w-full bg-white rounded-lg shadow-md">
          <thead>
              <tr class="bg-blue-500 text-white">
                  <th class="px-4 py-3">Student Name</th>
                  <th class="px-4 py-3">Attendance</th>
                  <th class="px-4 py-3">Actions</th>
              </tr>
          </thead>
          <tbody>
              ${course.students.map((student, index) => `
                  <tr>
                      <td class="border px-4 py-3">${student.name}</td>
                      <td class="border px-4 py-3">${student.attendance}</td>
                      <td class="border px-4 py-3">
                          <button id="edit-attendance-${index}" class="bg-yellow-500 text-white px-2 py-1 rounded">
                              Edit Attendance
                          </button>
                      </td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
      <button id="back-to-courses" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all">
          Back to Courses
      </button>
  `;

  document.getElementById('back-to-courses').addEventListener('click', () => {
      renderLecturerCourses(JSON.parse(localStorage.getItem('currentUser')));
  });
}

function renderStudentProfile(user) {
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">Profile: ${user.username}</h1>
      <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl mb-4">Change Password</h2>
          <input type="password" placeholder="Current Password" class="w-full mb-4 p-3 border rounded">
          <input type="password" placeholder="New Password" class="w-full mb-4 p-3 border rounded">
          <input type="password" placeholder="Confirm New Password" class="w-full mb-4 p-3 border rounded">
          <button id="change-password-btn" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Change Password
          </button>
      </div>
      <button id="back-to-dashboard" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all">
          Back to Dashboard
      </button>
  `;
  document.getElementById('change-password-btn').addEventListener('click', () => {
    alert("Password changed simulation")
  });
  document.getElementById('back-to-dashboard').addEventListener('click', () => {
      renderStudentDashboard(JSON.parse(localStorage.getItem('currentUser')));
  });
}

function renderLecturerProfile(user) {
  dashboardPage.innerHTML = `
      <h1 class="text-4xl font-bold mb-6 text-gray-800">Profile: ${user.username}</h1>
      <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl mb-4">Change Password</h2>
          <input type="password" placeholder="Current Password" class="w-full mb-4 p-3 border rounded">
          <input type="password" placeholder="New Password" class="w-full mb-4 p-3 border rounded">
          <input type="password" placeholder="Confirm New Password" class="w-full mb-4 p-3 border rounded">
          <button class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Change Password
          </button>
      </div>
      <button id="back-to-dashboard" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md transition-all">
          Back to Dashboard
      </button>
  `;

  document.getElementById('back-to-dashboard').addEventListener('click', () => {
      renderLecturerDashboard(JSON.parse(localStorage.getItem('currentUser')));
  });
}

function logout() {
  localStorage.removeItem('currentUser');
  dashboardPage.innerHTML = ''; // Reset dashboard
  loginPage.classList.remove('hidden');
  dashboardPage.classList.add('hidden');
}


function displayUsernamesAndPasswords() {
    let userList = "Those are the hard coded logins for now: \n";
  
    users.forEach(user => {
      userList += `Username: ${user.username},    Password: ${user.password}\n`;
    });

    userList = userList.slice(0, -1);
  
    // Display the alert with the formatted list of usernames and passwords
    alert(userList);
  }