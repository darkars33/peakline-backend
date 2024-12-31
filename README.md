# Backend for Peakline Assignment

This backend is built using [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/). It uses [MongoDB](https://www.mongodb.com/) as the database and implements authentication using [JWT (JSON Web Tokens)](https://jwt.io/).

## Getting Started

Follow these steps to set up the backend server locally.

## Environment Variables

The backend requires the following environment variables to be set. Create a `.env` file in the root directory of your project and add these values:

```env
MONGODB_URL=''
JWT_SECRET=''
NODE_ENV=''

CLOUDINARY_CLOUD_NAME=''
CLOUDINARY_API_KEY=''
CLOUDINARY_API_SECRET=''
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/darkars33/peakline-backend.git
   cd peakline-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The backend server will start at:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication
- `POST /api/user/register`: Register a new user
- `POST /api/user/login`: Login and receive a JWT

### Products
- `GET /api/products/allProducts`: Get user profile (protected route)

### File Upload (Cloudinary)
- `POST /api/upload`: Upload files to Cloudinary


## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Storage**: Cloudinary
