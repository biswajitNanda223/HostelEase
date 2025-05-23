# 🏨 Hostel Management System - Full Project README

## 📌 Project Overview
The **Hostel Management System** is a modern web application built using **Vite + React** for the frontend and **Firebase** for backend services. It serves both **Admin** and **Student** roles with role-based access and a rich set of features aimed at digitizing and simplifying hostel operations.

---

## 🚀 Tech Stack

### 🔧 Frontend:
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + Bootstrap
- **Animations**: Framer Motion
- **Routing**: React Router DOM

### 🔥 Backend:
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Hosting (Optional)**: Firebase Hosting

### 📦 Others:
- Context API for global state management
- Utility functions and custom hooks
- Framer Motion for UI enhancements

---

## 🧑‍🎓 Student Role Features
1. **Student Dashboard**
   - View personal details
   - View hostel rules and information

2. **Leave Request System**
   - Apply for leave
   - View leave status (approved/rejected)

3. **Library Pass Request**
   - Request access
   - View approval status

4. **Notices**
   - View announcements or notices pushed by Admin

5. **Emergency Contacts**
   - View emergency contact list

6. **Parcel Notifications**
   - View if a parcel is received
   - Acknowledge pickup

7. **Complaints Section**
   - Submit complaints
   - Track complaint resolution status

---

## 🧑‍💼 Admin Role Features
1. **Admin Dashboard**
   - Overview of hostel status and pending requests

2. **Student Management**
   - View and manage student records
   - Add, update, delete student data

3. **Leave Requests Panel**
   - View leave requests
   - Approve/Reject with comments

4. **Library Pass Management**
   - Approve library access requests

5. **Notice Management**
   - Push notices to students

6. **Mess Menu Management**
   - Update weekly menu

7. **Emergency Contact Management**
   - Add/update/remove emergency contacts

8. **Parcel Management**
   - Add parcel notification
   - Mark as received/picked up

9. **Complaint Resolution**
   - View submitted complaints
   - Mark status as pending/resolved

---

## 🧩 Project Structure
```
📦 hostel-management-app
├── 📁 public
├── 📁 src
│   ├── 📁 assets
│   ├── 📁 components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── CardItem.jsx
│   ├── 📁 pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── LeaveRequest.jsx
│   │   ├── ParcelList.jsx
│   │   ├── ComplaintForm.jsx
│   │   ├── LibraryPass.jsx
│   │   ├── Notices.jsx
│   │   ├── EmergencyContacts.jsx
│   │   ├── MessMenu.jsx
│   │   └── StudentDetails.jsx
│   ├── 📁 context
│   │   └── AuthContext.jsx
│   ├── 📁 firebase
│   │   ├── firebaseConfig.js
│   │   └── firebaseUtils.js
│   ├── 📁 utils
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── 📁 hooks
│   │   └── useAuth.js
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🔐 Firebase Setup

### ✳️ Authentication:
- Email/Password auth enabled
- Role-based logic stored in Firestore (`users` collection)

### 📁 Firestore Collections:
- `users` → name, email, role, hostel info
- `leaveRequests` → studentId, reason, date, status
- `libraryPasses` → studentId, status
- `notices` → title, description, timestamp
- `emergencyContacts` → name, contact, description
- `parcels` → studentId, parcelDetails, receivedStatus
- `complaints` → studentId, issue, status
- `messMenu` → day-wise menu data

---

## 📱 Components Overview

### Shared Components
- **Navbar**: Top navigation with login status
- **Footer**: Footer section
- **Sidebar**: Role-based sidebar navigation
- **CardItem**: Used in dashboards to show items neatly

### Forms
- LeaveRequestForm
- ComplaintForm
- LibraryPassForm

### Lists & Tables
- StudentTable
- ParcelList
- NoticeBoard
- ComplaintTable

---

## ⚙️ Context API
- **AuthContext.jsx** handles login state, current user info, and logout
- Accessible globally using `useContext(AuthContext)`

---

## 🛠️ Utils & Custom Hooks

### utils/helpers.js
- Date formatting
- Notification functions

### utils/validators.js
- Input validators

### hooks/useAuth.js
- Custom hook to fetch and track auth status

---

## 🔗 API Calls (Firebase Firestore & Auth)
- `firebaseUtils.js`
  - `addDocument()`
  - `getDocument()`
  - `updateDocument()`
  - `deleteDocument()`
  - `listenToCollection()`

---

## 🌐 Routing
- `routes.jsx` controls page navigation based on roles
- Routes like:
  - `/login`
  - `/register`
  - `/student/dashboard`
  - `/admin/dashboard`

---

## 🎨 UI Design & Effects
- Tailwind for responsive layouts
- Bootstrap for styled forms & components
- Framer Motion for page transitions & animation

---

## 🧪 Testing & Debugging
- Manual testing using Firebase Emulator (optional)
- Form validations and API error handling included

---

## 📤 Future Enhancements
- Push Notifications via FCM
- Real-time Chat (Admin ↔ Student)
- Hostel Room Allocation
- Attendance Tracking
- Visitor Log

---

## 🧠 Credits
Project by [Your Name], Built for College Hostel Automation

---

## 📞 Contact
📧 Email: your.email@example.com  
🌐 Website: [YourPortfolioLink]

---

> "Empowering hostel life through smart technology."

#   H o s t e l E a s e  
 #   H o s t e l E a s e  
 