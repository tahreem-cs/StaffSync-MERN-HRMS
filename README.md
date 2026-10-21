Hi there, I'm Tahreem! 👋 

🚀 **Full-Stack MERN Developer** passionate about building scalable web applications and intuitive digital experiences. Currently focusing on developing full-stack HR management and enterprise systems.



🛠️ Tech Stack

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)



⭐ Featured Project: StaffSync - Modern HRMS (MERN)

*StaffSync* is a comprehensive, full-stack Human Resource Management System built to streamline and automate core HR processes within an organization. It provides distinct roles and access levels for HR personnel, managers, and employees to ensure efficient management, transparency, and a seamless workflow across departments.

✨ Key Features
* 🔐 **Role-Based Access Control (RBAC)**: Secure authentication and authorization for Admins, HR personnel, Managers, and Employees.
* 👥 **Employee CRUD**: Complete lifecycle tracking, personal record management, and workforce data oversight.
* 📅 **Attendance Tracking**: Real-time daily check-in/check-out system with historical logs and status management.
* 📝 **Leave Management System**: Streamlined leave applications, review workflows, status tracking, and manager approvals.
* 📢 **Announcements & Training**: Centralized communication portal for company-wide updates and professional development programs.



⚙️ Technology Stack
* **Frontend**: React.js, Tailwind CSS / Modern CSS, Axios, React Router
* **Backend**: Node.js, Express.js (Modular MVC Architecture)
* **Database**: MongoDB & Mongoose ODM
* **Security & Auth**: JSON Web Tokens (JWT), bcryptjs for password hashing, Cookie-Parser, CORS


 📁 Project Directory Structure
 ```
StaffSync/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/              # Business logic controllers
│   │   ├── announcementController.js
│   │   ├── attendanceController.js
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   ├── leaveController.js
│   │   └── trainingController.js
│   ├── middleware/
│   │   └── auth.js               # Authentication & Authorization middleware
│   ├── models/                   # Mongoose data models
│   │   ├── Announcement.js
│   │   ├── Attendance.js
│   │   ├── employee.js
│   │   ├── Leave.js
│   │   ├── training.js
│   │   └── User.js
│   ├── routes/                   # Express API routes
│   │   ├── announcementRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── leaveRoutes.js
│   │   └── trainingRoutes.js
│   ├── .env                      # Environment variables
│   ├── .gitignore                # Git ignore configuration
│   ├── package-lock.json         # Dependency tree lockfile
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server entry point
│
└── frontend/
    ├── index.html                # HTML template entry point
    ├── package-lock.json         # Dependency tree lockfile
    ├── package.json              # Frontend dependencies & scripts
    └── src/
        ├── App.css               # Main application styles
        ├── App.jsx               # Main React component
        ├── main.jsx              # React DOM render entry point
        ├── components/           # Reusable modular components
        │   ├── auth/             # Authentication components
        │   │   ├── Login.jsx
        │   │   └── Register.jsx
        │   ├── employee/         # Employee feature components
        │   │   ├── Announcements.jsx
        │   │   ├── Attendance.jsx
        │   │   ├── LeaveApply.jsx
        │   │   └── LeaveList.jsx
        │   ├── hr/               # HR feature components
        │   │   ├── Announcements.jsx
        │   │   ├── EmployeeCRUD.jsx
        │   │   └── LeaveApplication.jsx
        │   └── manager/          # Manager feature components
        │       └── TrainingManager.jsx
        ├── pages/                # Role-based dashboard pages
        │   ├── EmployeeDashboard.jsx
        │   ├── HrDashboard.jsx
        │   └── ManagerDashboard.jsx
        └── routes/               # Navigation & route protection
            └── ProtectedRoute.jsx
```
