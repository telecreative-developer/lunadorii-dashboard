# Lunadorii Dashboard

Lunadorii dashboard created using react and redux

---
## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Explanation each Folder](#explanation-each-folder)
- [Tips and Trick](#tips-and-trick)
    - [Change Banner](#change-banner)
    - [Activate or Deactivate Banner](#activate-or-deactivate-banner)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
- [Build With](#build-with)
- [Authors](#authors)

## Getting Started

Go To Project and run `npm install` and then `npm start` for starting development, the project should run on localhost port 3000

### Prerequisites

* Have knowledge about [React Js](https://reactjs.org/)
* Things you need to install
    * [Node](https://nodejs.org/en/)

## Folder Structure

All Project is configured in `src/` folder
## Explanation src Folder

Explanation About the project folder inside `src/` folder

### Actions

Folder For Storing Action Redux

the action is group by each menu except processor
processor is redux thunk system

### Assets

Folder For Keeping Assets Like Css, Scss, Image, etc.

### Components

Folder For creating reusable components 

### Containers

Folder For Connect between view and action, 
because view is only design and container adding function to view 
these containers is separate by each menu

### Layouts

Folder for defining layout on home and login page

### lib

Folder for storing reusable function

### Reducer

Folder For Storing Reducer Redux

### Views

Folder for storing any view in dashboard

## Tips and Trick

this project is using template from [light bootstrap dashboard react](https://github.com/creativetimofficial/light-bootstrap-dashboard-react/),
you can get many tips and trick here

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Built With

* [React Js](https://reactjs.org/) - The web framework used
* [light bootstrap dashboard react](https://github.com/creativetimofficial/light-bootstrap-dashboard-react/) - Template React admin
* [Redux Thunk](https://github.com/reduxjs/redux-thunk) - State Management React Js

## Authors

[PT Tele Digital Kreatif](https://www.telecreativenow.com/)