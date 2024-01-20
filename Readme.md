# JobTrackr

## Overview

JobTrackr is a web application designed to help users keep track of the jobs they have applied to. The application provides features such as pagination, sorting, searching, and filters based on work type and job status. It is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and employs JWT for authentication and cookies for session management.

## Features

- **User Authentication:** Utilizes JWT for secure user authentication.
- **Job Tracking:** Allows users to maintain a record of the jobs they have applied to.
- **Pagination:** Provides a paginated view of job applications for better organization.
- **Sorting:** Enables users to sort job applications based on various parameters.
- **Searching:** Allows users to search for specific job applications using relevant keywords.
- **Filters:** Users can filter job applications based on work type and job status.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Session Management:** Cookies
  
## Screenshots

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">

![Screenshot 1](https://res.cloudinary.com/dewu8pifs/image/upload/v1705772699/Screenshot_35_tdlw9v.png)
Login Page

![Screenshot 2](https://res.cloudinary.com/dewu8pifs/image/upload/v1705772685/Screenshot_37_f6zziu.png)
Dashboard

![Screenshot 3](https://res.cloudinary.com/dewu8pifs/image/upload/v1705772684/Screenshot_38_ho2rid.png)
Add Job Modal

![Screenshot 4](https://res.cloudinary.com/dewu8pifs/image/upload/v1705772683/Screenshot_36_pdnee5.png)
Category Section

![Screenshot 5](https://res.cloudinary.com/dewu8pifs/image/upload/v1705772683/Screenshot_41_hv3gjz.png)
Mobile View of Category Section

</div>

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sampriti27/JobTrackr.git
   cd JobTrackr
   
2. Install dependencies: 
   ```bash 
   #Install server dependencies
    cd server
    npm install

    
    #Install client dependencies
    cd ../client
    npm install
3. Set up MongoDB:

    - Create a MongoDB database and update the connection string in server/config/db.js.
4. Start the server and client:
   ```bash
    # Start the server (from the server directory)
    npm start

    # Start the client (from the client directory)
    npm start
5. Open your browser and go to http://localhost:3000 to view the application.
   

## Configuration

- Database Configuration: Update the MongoDB connection string in server/config/db.js.
  
- Authentication Configuration: Update the JWT secret and expiration in server/config/auth.js.

## Usage

  1. Create an account or log in.
  2. Add and manage your job applications.
  3. Use the provided features for better organization and tracking.

## Contact

If you have any questions or feedback, please contact me at sampriti275@gmail.com I'd love to hear from you!