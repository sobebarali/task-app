# Simple Task Manager Application

## Project Overview
The Simple Task Manager application is a web application built to help users efficiently manage their tasks. The application provides mobile authentication using Twilio's SMS service for user registration and login. The backend is developed using TypeScript and Node.js, and data is stored in a MongoDB database.

## Audience
The Simple Task Manager application is designed for individuals and teams who need a straightforward and effective solution for managing their tasks. The target audience should possess basic knowledge of mobile applications and be familiar with task management concepts.

## Installation and Setup

### System Requirements
Before setting up the Simple Task Manager application, ensure your system meets the following requirements:
- Node.js: Version 14 or above
- MongoDB: Version 4.2 or above
- Twilio Account: Sign up for a Twilio account to obtain the necessary credentials.

### Installation Instructions
To install and set up the Simple Task Manager application, follow these steps:

1. Clone the project repository from GitHub:
2. Navigate to the project directory:
3. Install dependencies using npm:
4. Set up the MongoDB database:
- Install MongoDB on your system if not already installed.
- Create a new database for the Simple Task Manager application.
- Configure the MongoDB connection details in the `.env` file.

5. Set up Twilio credentials:
- Sign up for a Twilio account if you haven't already.
- Obtain the account SID and authentication token from your Twilio dashboard.
- Configure the Twilio credentials in the `.env` file.

## Usage and Features

### User Registration and Login
The Simple Task Manager application offers a user-friendly registration and login process. Follow the steps below to register and log in:

1. Registration:
- Launch the application on your mobile device.
- Tap on the "Register" button.
- Enter your mobile number and tap on the "Send Verification Code" button.
- You will receive a verification code via SMS.
- Enter the verification code to complete the registration process.

2. Login:
- Launch the application on your mobile device.
- Tap on the "Login" button.
- Enter your registered mobile number.
- You will receive a verification code via SMS.
- Enter the verification code to log in to the application.

### Task Management
The Simple Task Manager application allows users to efficiently manage their tasks. Key features include:

1. Create and Update Tasks:
- Tap on the "+" button to create a new task.
- Provide a title, description, due date, and priority level for the task.
- Tap on an existing task to edit its details.
- Update the task information as needed and save the changes.

2. Delete Tasks:
- Swipe left on a task to reveal the delete option.
- Tap on the delete button to remove the task from the list.

3. Task Completion:
- Mark a task as complete by tapping the checkbox next to it.
- Completed tasks are visually distinguished from incomplete tasks.

4. Task Assignment:
- Assign a task to yourself or other registered users.
- Select the "Assignee" field when creating or editing a task.
- Choose a user from the list to assign the task to them.
- Assigned users receive notifications about the task.

5. Task Filtering and Sorting:
- Filter tasks based on their completion status (complete/incomplete) and priority level.
- Sort tasks by due date or priority level in ascending or descending order.

### Notifications

The Simple Task Manager application leverages Twilio's SMS service to provide timely notifications to users. The following notifications are available:

1. Task Assignment:
- Assigned users receive an SMS notification when a task is assigned to them.
- The notification includes details about the task and the assigner's name.

2. Approaching Due Date:
- Users receive an SMS notification as a reminder when a task's due date is approaching.
- The notification includes the task details and the remaining time until the due date.

## API and Integration

### API Documentation
The Simple Task Manager application provides a RESTful API for accessing and managing tasks. The detailed API documentation is available in the project's GitHub repository at the following location: [link to API documentation].

### Twilio Integration
The Simple Task Manager application integrates with Twilio's SMS service to send verification codes and notifications to users' mobile numbers. Ensure that your Twilio credentials are correctly configured in the `.env` file to enable seamless integration.

## Troubleshooting and FAQs

### Common Issues
Here are solutions to common issues that may arise during the usage of the Simple Task Manager application:

1. Issue: Unable to receive verification code.
- Solution: Verify that the mobile number is entered correctly during the registration process. Additionally, ensure that the Twilio credentials are properly configured in the `.env` file.

### FAQs
Frequently asked questions about the Simple Task Manager application:

1. Q: Can I change my registered mobile number?
- A: No, currently, the application does not support changing the registered mobile number. However, you can create a new account with a different mobile number if needed.

## Support and Contact Information
For any support or inquiries related to the Simple Task Manager application, feel free to reach out to our support team via email at [support email] or contact us on [support phone number].

## Glossary and References

### Glossary
- MongoDB: A popular NoSQL database management system.
- Twilio: A cloud communications platform that provides SMS and voice services.

### References
- [Twilio Documentation](https://www.twilio.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
