# Internal Admin Dashboard
The Internal Admin Dashboard is a web-based application designed to manage user accounts within an organization efficiently. It offers a streamlined interface for administrators to search, view, and manage user profiles and account details.

## Features

- **User Search:** Administrators can quickly search for users by name, username, or email address using a responsive search interface.
- **User Management:** View detailed profiles of users, including usernames, email addresses, and names. Administrators have the authority to delete any user account.

## Technology Used

- **Frontend:** The frontend is built with ReactJS, providing a dynamic and responsive user interface that enhances the user experience.
- **Backend:** The backend is powered by Go, offering robust and efficient server-side functionality. Go's strong performance and efficient concurrency handling make it ideal for backend services.
- **Database:** MongoDB is used as the database, which allows for flexible and scalable data storage. MongoDB is particularly well-suited for managing large volumes of structured and unstructured data and ensures fast access and high availability.

## Getting Started
Follow these instructions to get your copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before you begin, ensure you have the following installed:
- Docker

## Installation

Run locally: 
```bash
git clone https://github.com/devzero-inc/internal-admin-dashboard.git
cd internal-admin-dashboard
docker compose up
```
App will be running on ```PORT:4173``` -> [http://localhost:4173/](http://localhost:4173/)

Now just go to [http://localhost:4173/](http://localhost:4173/) and explore the application.