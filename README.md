# ShutterScape
This project is a secure and modern full-stack Image Gallery application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features robust user authentication, cloud-based image uploads, role-based access control, and an intuitive user experience.
## Features
### Authentication
- Signup/Login with securely hashed passwords (Bcrypt).
- JWT Tokens: Utilizes both short-lived Access Tokens for authenticated requests and Refresh Tokens stored as secure HTTP-only cookies for seamless session management.
- 2FA via Email OTP for an enhanced layer of security during login.
- Welcome Email sent to users upon successful signup.
### Image Gallery
- **Drag-and-Drop Uploads** facilitated by React Dropzone for an effortless uploading experience.
- **Cloudinary Storage** - All uploaded images are securely stored and managed on Cloudinary.
- **Public Home Feed** - A public-facing Home page where all uploaded images can be viewed.
- **My Uploads Page** - A dedicated section for users to view and manage (delete) their own uploaded images.
- **Role-Based Access Control (RBAC)** - Enforces that only the original uploader or an administrator can delete an image.
### Security
- **Helmet** - Implemented for setting various HTTP headers to enhance the application's security.
- **Rate Limiting** - Applied to authentication routes to prevent brute-force attacks.
- **Cookie Parser** - Used for securely managing and parsing refresh tokens stored in HTTP-only cookies.
### Admin Panel
**Admin Dashboard** - A dedicated panel for administrators to view and manage (delete) all registered users.
## Tech Stack
- **Frontend**	- React, React Router, Axios
- **Backend** - Node.js, Express
- **Validation** - JOI
- **Database** -	MongoDB (with Mongoose ORM)
- **Image Hosting** -	Cloudinary
- **Authentication** - JWT (Access & Refresh Tokens), OTP Email
- **Security** -	Helmet, Rate Limiting, Joi Validation
- **Email Service** -	Nodemailer
- **Uploads** -	Multer + Streamifier (for Cloudinary integration)
## Author
Shravastee Thakur
