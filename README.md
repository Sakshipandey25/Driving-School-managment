# Driving School Management System API

This project uses the same simple pattern as the Hotel Booking sample:
`server.js -> routes/index.js -> routes -> controllers -> models`.

## Run
1. Install Node.js and MongoDB.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Start MongoDB.
5. Run `npm run dev`.

Server: `http://localhost:3000`


## Main routes
- `POST /api/auth/registration`
- `POST /api/auth/login`
- `GET /api/user` (admin)
- `PUT /api/user/:id/status` (admin; body: `{"status":"inactive"}`)
- `POST /api/instructorProfile`
- `POST /api/learnerProfile`
- `POST /api/category` (admin)
- `GET /api/category`
- `POST /api/course` (instructor)
- `GET /api/course`
- `GET /api/course/my` (instructor)
- `PUT /api/course/:id/submit` (instructor)
- `PUT /api/course/:id/approve` (admin)
- `PUT /api/course/:id/reject` (admin; body: `{"reason":"Please update course details"}`)
- `POST /api/module` (instructor)
- `GET /api/module/course/:courseId`
- `PUT /api/module/:id` (instructor; update/reorder using `order`)
- `DELETE /api/module/:id` (instructor)
- `POST /api/enrollment/join` (learner; body: `{"course":"COURSE_ID"}`)
- `POST /api/payment/make` (learner; demo body: `{"course":"COURSE_ID","status":"success"}`)
- `PUT /api/enrollment/:id/progress` (learner; body: `{"progress":50}`)

This is a learning/demo API. Payment is simulated; no real payment gateway is connected.
