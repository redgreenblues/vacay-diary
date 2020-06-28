# Vacay Diary
An app to plan and manage holiday itineraries. Create an itinerary in Vacay Diary whenever you are travelling overseas and all your itineraries will be stored in one place. 

## Table of Contents
 - [Project Demo](#project-demo)
 - [Application MVP](#application-mvp)
 - [Dependencies](#dependencies)
 - [Difficulties Faced](#difficulties-faced)
 - [Further Improvements to be Made](#further-improvements-to-be-made)
 - [Wireframes and User Stories](#wireframes-and-user-stories)

## Project Demo
**Vacay Diary** is available to try on [https://vacay-diary.herokuapp.com/]()

## Application MVP
 - A working full-stack application using **Node.js**, **MongoDB**, **Express** and **EJS**
 - Adhered to MVC file structure: **Models**, **Views**, **Controllers**
 - Included all 7 **RESTful routes** and full **CRUD** application
 - Deployed online and accessible to the public via **Heroku**

## Dependencies
 - **Bcrypt** is used to hash and store passwords
 - **Bootstrap** is used for front-end framework containing HTML and CSS based design templates
 - **Connect-flash** is used for storing and displaying messages, which was used in combination with redirects
 - **Countries-and-timezones** library to work with countries and timezones data
 - **Dotenv** is used as a zero-dependency module that loads environment variables from a *.env* file into *process.env*.
 - **EJS** is used as the templating engine and allows generating HTML with plain javascript
 - **Express-session** is used to store user state and every user will be assigned a unique session
 - **Method-override** to allow us to use HTTP verbs such as PUT and DELETE in places where the client doesn't support it
 - **Moment.js** is used as a wrapper for the native JavaScript Date object
 - **Mongoose** is used as a schema-based solution to model the application data. It manages relationships between data, provides schema validation, and is used to translate between object in code and the representation of those objects in MongoDB
 - **Node-fetch** is used to fetch resources and making API requests
 - **Passport.js** is used to authenticate requests
 - **SweetAlert** is used as a replacement for JavaScript's popup boxes (modals)
 - **Unsplash-js** is used as a server-side Javascript wrapper for working with [Unsplash API](https://unsplash.com/developers)

## Difficulties Faced
 1. **Could not get Moment Timezone to work**
 > Tried to use Moment Timezone to display the current time of the country, however could not get it to work.
 2. **Mongoose Schema**
 > Problem getting data saved into MongoDB using Mongoose schema initially. Turns out that if you already have a collection in MongoDB, the schema model function needs to match with the existing collection name on the 3rd parameter.

## Wireframes and User Stories

## RESTful Routes
### Application routes
| NAME        | PATH                              | HTTP VERB  | PURPOSE
| ----------- |:----------------------------------| :---------:| :--------
| Index       | /                                 | GET        | Home page
|             | /app                              | GET        | Home page after user logged in
|             | /app/my-itineraries               | GET        | Display all itineraries by user
| New         | /app/new                          | GET        | Show new form for new itinerary entry
| Create      | /app/my-itineraries               | POST       | Creates a new itinerary
| Show        | /app/my-itineraries/:id           | GET        | Show one specified itinerary
| Edit        | /app/my-itineraries/edit/:id      | GET        | Shows edit form for one itinerary
| Update      | /app/my-itineraries/edit/:id      | PUT        | Updates a particular itinerary
| Destroy     | /app/my-itineraries/:id           | DELETE     | Deletes a particular itinerary

### User routes
| NAME        | PATH                              | HTTP VERB  | PURPOSE
| ----------- |:----------------------------------| :---------:| :--------
| New         | /register                         | GET        | Show registration form for user to register
|             | /login                            | GET        | Show login form for user to login
|             | /logout                           | GET        | Log user out and terminate a login session
| Create      | /register                         | POST       | Creates a new user upon successful registration
|             | /login                            | POST       | Login user upon successful authentication
