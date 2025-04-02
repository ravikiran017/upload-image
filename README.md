Full-Stack Image Upload Application

Overview

This is a full-stack image upload application built using:

Backend: Node.js with Express

Database: Neon PostgreSQL (a cloud-based PostgreSQL database)

Frontend: React with React Router DOM and Material UI

Image Storage: Cloudflare Images

Features

Upload images with a name and description

Store image details in Neon PostgreSQL

Retrieve and display uploaded images

Responsive UI built with Material UI

Navigation using React Router DOM

🛠 Tech Stack

Backend

Node.js

Express.js

PostgreSQL (Neon)

Multer (for file uploads)

Cloudflare for image hosting

CORS

Dotenv

Frontend

React

React Router DOM

Material UI

Axios

Styled Components

🔧 Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/your-username/your-repo.git
cd your-repo

2️⃣ Backend Setup

cd backend
npm install  # Install dependencies

Configure Environment Variables

Create a .env file in the backend directory:

PORT=5000
DATABASE_URL=your_neon_postgres_url
CLOUDFLARE_IMAGE_API=your_cloudflare_api_url

Start the Backend Server

node server.js  # OR nodemon server.js

3️⃣ Frontend Setup

cd frontend
yarn install  # OR npm install

Start the Frontend Server

yarn start  # OR npm start

📌 API Endpoints

Upload Image

POST /upload

{
  "name": "Sample Image",
  "description": "A beautiful image",
  "image": "<file>"
}

Fetch Images

GET /images
Returns an array of uploaded images.

🎨 Frontend Features

Image Upload Form: Users can upload images via an interactive form.

Image Gallery: Displays uploaded images in a grid (4 images per row).

Material UI Components: Stylish and responsive design.

🚀 Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: Neon PostgreSQL

👨‍💻 Author

Developed by Ravi Kiran

🔗 Feel free to contribute or open issues!

