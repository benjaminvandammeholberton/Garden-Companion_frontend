# Garden Companion

Garden Companion is a SaaS platform designed to centralize all the needs of vegetable gardeners, aiming to optimize production and simplify the gardening process. Whether you're a novice or an experienced gardener, this platform offers various modules and features to assist you throughout the gardening journey. Garden Companion seeks to enhance your gardening experience and help you achieve successful harvests. 🌱🌻🍅

Currently, the project is in beta testing phase, and we invite you to test it out at https://gardencompanion.io. Your feedback is invaluable as we continue to refine and improve the platform to better serve the gardening community.

## Features

### Dashboard

The dashboard serves as the central hub for accessing different modules and features of Garden Companion.

#### Quick Add Module
This module allows users to swiftly add new areas and vegetables to their garden setups.

#### Weather Module
Users can access weather forecasts for their local area for the next few days using the Geonames API for location data and the OpenWeather API for forecast information.

#### Recommendations Module
The Recommendations module provides users with suggestions for suitable vegetables to plant based on various factors such as location, season, and user preferences.

#### Chat Bot Module
A specialized chat bot tailored to assist vegetable gardeners by providing helpful tips, answering queries, and offering guidance on gardening-related topics.

#### Todo List Module
Users can create and manage task lists to keep track of various activities and chores related to their garden.

### Production Table

This feature presents users with a comprehensive table showcasing the different vegetables planted in various areas of the garden along with a timeline view. Users can modify data directly from the table for easy management.

### Vegetable Guide

A guide detailing information about different vegetables, including planting instructions, care tips, and harvesting guidelines.

### More to Come...

In addition to its current functionalities, Garden Companion has exciting plans for future enhancements. One of the upcoming features will transform the platform into a social network, allowing customers to connect directly with other gardeners and explore their gardens. This social aspect is one of the key features I aim to implement, fostering a vibrant community where gardeners can share insights, tips, and inspiration.

## Technical part

### Technologies Used

#### Backend

For the backend infrastructure, I've opted for the FastAPI framework alongside Python. FastAPI was chosen for its non-blocking I/O architecture, which excels at handling multiple simultaneous requests efficiently. Built with a REST API model in mind, FastAPI facilitates CRUD (Create, Read, Update, Delete) operations seamlessly.

As for the database, MongoDB was selected due to its scalability features, making it well-suited for future growth and expansion of the platform.

In managing data models and performing data validation, I've integrated Beanie as the ORM (Object-Relational Mapping) solution. Beanie stands out for its utilization of Pydantic, simplifying data validation processes significantly.

#### Frontend

For the frontend development, I've opted for a straightforward stack comprising HTML, CSS, and vanilla JavaScript. This choice allows me to focus on mastering the fundamentals of JavaScript before transitioning to more advanced frameworks like React.

I plan to integrate React into the frontend stack to enhance the user experience and streamline development.
Additionally, I am exploring the option of incorporating Redux for state management.
Work on this integration is currently in progress.

#### Deployement

Currently, Garden Companion is deployed on Digital Ocean directly from GitHub. However, I'm eager to take the next step and enhance my DevOps skills by transitioning to a Docker-based deployment model on a server.

This upgrade will not only deepen my understanding of DevOps practices but also ensure a more efficient and scalable deployment process for Garden Companion.

### User Authentication

Leveraging JWT token-based login, Garden Companion implements a secure authentication flow that includes email verification, password recovery, and logout functionalities.

By utilizing JWT tokens, Garden Companion reduces the number of requests to the database, enhancing scalability and efficiency while maintaining a high level of security for user interactions.

## Conclusion

Garden Companion is a project that I've devoted considerable time to, and it reflects my skills and dedication to creating a valuable tool.

I want to express my gratitude to [Quentin Rouger](https://github.com/quentinrouger) for his assistance throughout the development of this project.

For any inquiries or further information, please feel free to contact me via benjamin.vandamme@me.com.

Thank you for your interest!
