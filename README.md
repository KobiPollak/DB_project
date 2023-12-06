# Cinema Management System 
 ## Overview 
 This project is a comprehensive Cinema Management System that includes databases for cinema branches, snack bar items, and high-level queries to seamlessly manage and display information. The system is complemented by a web application developed using React and Node.js.
  ## Features 
   -  **Database Design:** Created tables for cinema branches and snack bar items, ensuring efficient data organization.
   -  **Query Optimization:** Developed high-level queries to retrieve relevant information from the integrated databases. 
   -  **Web Application:** Implemented a user-friendly web interface using React and Node.js to visualize and interact with the cinema management system. 
   -  **Manager Screen:** Provides a dedicated interface for managers to handle tasks related to cinema and snack bar management. 
   -  **Home Screen:** Offers a user-friendly experience for customers to access relevant information. 
 ## Project Structure  
 -  **/Data Base:** Contains SQL scripts for creating and managing the database tables.
 -  **/Client:** Houses the React and Node.js codebase of the client side for the web application. 
 - **/Server:** Houses the Node.js codebase of the server side  for the web application.
 ## Database Setup  
  1.  **Database Initialization:**  
  - Create a MySQL database named `sqlproject`. 
  - You can use the provided `allDB.sql` file in the DataBase folder to import the initial database structure and data. 
  2.  **Environment Variables:**  
  - Create a `.env` file in the `server` directory to store environment variables required for the application. Populate it with the following data:
   ```dotenv 
   DB_HOST=localhost 
   DB_USER=root 
   DB_PASSWORD=user's_password 
   DB_NAME=sqlproject
   ```
   Replace the placeholder values with your actual secrets and database connection details.

## Getting Started 
Follow these steps to get the Property Management System up and running on your local machine: 
-  **Clone the repository:** 
```bash
git clone https://github.com/KobiPollak/DB_project
```
- **Install dependencies**:
```bash 
# Install frontend dependencies
cd Client/db_client
npm install

# Install backend dependencies
cd ../../Server
npm install
```
- **Run the application:**
```bash
# Start the backend server 
 cd Server 
 npm start 
 # Start the frontend development server  
 cd ../Client/db_client
 npm start
 ```

  ## Usage  
  - Access the web application at [http://localhost:3000](http://localhost:3000). 
  - Use the manager screen for administrative tasks and the home screen for customer-related information. 
  ## Report 
  For a detailed overview of the project, refer to the [Summary Report](./Project_Report.pdf). 
