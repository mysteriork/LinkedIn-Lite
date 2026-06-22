 ## WE ARE LIVE ON --  https://linkedin-lite-virid.vercel.app/

# Linkedin-Lite 💼

Built and optimized my MERN stack project **"LinkedIn Lite"** — a scalable social networking web application inspired by LinkedIn, featuring secure authentication, profile management, post creation with image uploads, interactive comments/replies, and optimized newsfeed rendering.

Initially, the application fetched and rendered large amounts of post and reply data together, which caused unnecessary API calls, increased rendering workload, and reduced scalability as the dataset grew.

To make the application more production-oriented and scalable, I focused on improving data flow, API efficiency, and frontend rendering performance.

---

### ✨ Key optimizations implemented:

• 📄 Backend Pagination using MongoDB `.skip()` and `.limit()` to efficiently load newsfeed data instead of fetching all records at once.

• 🔍 Debounced Search functionality to reduce unnecessary API requests while searching usernames.

• ⚡ Optimized React rendering using `useMemo` to prevent unnecessary recalculations during component updates.

• 🔄 Improved API fetching flow and state management to reduce redundant network calls and unnecessary rerenders.

• 💬 Optimized comment/reply rendering for better frontend performance.

• 🖼️ Implemented lazy loading for images to improve initial page load performance.

• 📱 Built a responsive UI structure for better usability across different devices.

• 🔐 Integrated JWT-based authentication for secure user sessions.

• ☁️ Connected MongoDB Atlas and deployed the application using Vercel (Frontend) and Render (Backend).

---

### Overview:
💡 Building features is only one part of application development — designing efficient data flow, optimized rendering, and scalable backend architecture is what makes applications production-ready.


🚧 Currently exploring further improvements like selective reply fetching, caching strategies, and advanced performance optimization techniques.

## 🛠️ Tech Stack

- **Frontend**: React.js, CSS & Tailwind.
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Vercel (Frontend) , Render

---

## ✨ Features

* 🔐 Secure User Registration & Login Authentication
* 🙋 User Profile Creation and Navigation
* 📝 Post Creation with Image Upload Support
* 💬 Real-Time Comment/Reply System
* 📃 Optimized Newsfeed with Backend Pagination
* 🔍 Debounced Username Search Functionality
* ⚡ Optimized API Fetching & State Management
* 🧠 Efficient Reply Rendering using `useMemo`
* 🖼️ Lazy Loading for Better Image Performance
* 💡 Fully Responsive UI Design
* ⚙️ MongoDB Atlas Database Integration
* 🚀 Scalable MERN Stack Architecture

---

## 📁 Folder Structure
---

1) USER REGISTRATION :
<img width="1862" height="1018" alt="image" src="https://github.com/user-attachments/assets/3946c2a5-cf51-4348-8d31-3dbe0f2d550a" />

<img width="1854" height="933" alt="image" src="https://github.com/user-attachments/assets/a2fe2613-870a-4412-9c6b-1a011382177a" />

---

2) USER LOGIN PAGE :
<img width="1860" height="1022" alt="image" src="https://github.com/user-attachments/assets/af622fe9-76d1-4965-b777-284fdefd95d7" />

---

3) USER INTERFACE HOME PAGE :
<img width="1723" height="4833" alt="XkTZ0NEWHd" src="https://github.com/user-attachments/assets/8d36240f-e661-41c2-8b89-5b07547584f0" />

---

<img width="1725" height="4100" alt="MrA2N6Pr96" src="https://github.com/user-attachments/assets/8b28f187-09dd-43d0-8b12-414d5625d4ea" />

---

4) PROFILE VIEW :
<img width="1878" height="923" alt="Screenshot 2026-05-16 142845" src="https://github.com/user-attachments/assets/803f9a91-68e9-4b42-88c7-bbc2c119c04e" />

---


 @Mysteriork --- RACHIT KUMAR

License

This project is open-source and available under the MIT License.









