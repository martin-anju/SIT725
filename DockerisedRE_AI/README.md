## Resume Evaluation Tool with Gemini

This project is a resume evaluation tool that leverages Google's Gemini AI to provide detailed feedback on resumes. Users can upload their resume (in PDF or Word format) along with a job description, and the system will analyze the resume against the job description. The feedback includes scores for technical skills, leadership qualities, and relevance, along with tailored recommendations to improve the resume.

## Docker

### Build
docker build -t resume-ai:anjumartin .

### Run
docker run -d \
  --name resume-ai-container \
  -p 3002:3002 \
  --env-file .env \
  -e MONGODB_URI="mongodb://host.docker.internal:27017/resumeAI" \
  resume-ai:anjumartin

### Test
curl http://localhost:3002/api/student


### Socket Programming

This version of the project integrates Socket.IO to enable real-time notifications. When the backend completes processing the resume feedback, it sends a notification to the frontend to inform the user that the feedback is ready. This enhances the user experience by providing instant updates without requiring the user to refresh the page.

## Environment Variables

Create a `.env` file in the `Project` directory with the following keys. Replace the placeholder values with your own credentials:

```properties
MONGODB_URI=<your-mongodb-uri>
MONGO_USER=<your-mongodb-username>
MONGO_PASSWORD=<your-mongodb-password>
GENAI_API_KEY=<your-genai-api-key>
```

### Installation and Setup

1. Run the Backend (Server)
   Navigate to the project root directory:

   ```bash
   cd Project
   ```

   Install dependencies:

   ```bash
   npm install
   ```

   Start the backend server:

   ```bash
   node server.js
   ```

2. Run the Frontend:
   Navigate to the project root directory:

   ```bash
   cd public
   ```

   Start a lightweight server

   ```bash
   http-server -p 3000
   ```

   Open the frontend in your browser:

   ```bash
   http://localhost:3000
   ```

### Project Structure

```
SIT725/
├── controllers/
│   ├── resumeController.js      # Handles resume-related logic
│   └── jobController.js         # Handles job description-related logic
├── db/
│   └── mongoConnection.js       # MongoDB connection logic
├── models/
│   ├── resumeModel.js           # Handles resume database operations
│   └── jobModel.js              # Handles job description database operations
├── public/
│   ├── components/
│   │   ├── navbar.html          # Navbar component
│   │   └── footer.html          # Footer component
│   ├── css/
│   │   └── styles.css           # Frontend styles
│   ├── js/
│   │   ├── main.js              # Main frontend logic
│   │   ├── feedback.js          # Handles feedback functionality
│   │   ├── chart.js             # Chart rendering logic
│   │   ├── notification.js      # Handles Socket.IO notifications
│   │   ├── upload.js            # Handles resume file upload
│   └── index.html               # Frontend UI
├── routers/
│   ├── resumeRoutes.js          # Defines API routes for resumes
│   └── jobRoutes.js             # Defines API routes for job descriptions
├── server.js                    # Express server configuration
└── package.json                 # Project dependencies

```

### Socket.IO Integration

Backend: The backend uses Socket.IO to emit a feedbackReady event to the frontend when the resume feedback is processed.

Frontend: The frontend listens for the feedbackReady event and displays a notification to the user.
