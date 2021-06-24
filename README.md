# 14 Model-View-Controller (MVC): Tech Blog

## Description

Build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using **Handlebars.js** as the templating language, **Sequelize** as the *ORM*, and the **express-session** npm package for authentication.

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

The application features the use of the MVC paradigm with **Database Models** to define the logical structure of the database using **Sequelize** and **MySQL**, **Handlebars.js** to manage templates, and **Express.js** for authentication.

Three models are shipped with this version of the application: **Users**, **Posts**, and **Comments**. Each of these models has data attributes that follow common constraints, validations, and rules found in a production environment, including, primary keys, referential integrity, and not null constraints, and auto increment and default rules.

Referential integrity is managed through the use of **Associations** in **Sequelize**. These associations are converted and executed against the database dialect when the application starts. The following associations are featured with the application:

- Post to User - A Post belongs to a single User, but a User can have multiple Posts.
- Comment to Post - A Post can have more than one Comment, and a Comment belongs to a single Post and a single User.
- Comment to User - A User can have more than one Comment, but a Comment belongs to a single User.

RESTful API routes are used to handle the CRUD operations for the models. These routes feature the logic to **GET**, **POST**, **PUT**, and **DELETE** Users, Posts, and Comments using **Sequelize** and **Express**.

## Installation

This application requires [Node.js](https://nodejs.org/en/) Runtime Library, and [Express.js](https://www.npmjs.com/package/express), [Sequelize](https://www.npmjs.com/package/sequelize), [DotEnv](https://www.npmjs.com/package/dotenv), [MySQL2](https://www.npmjs.com/package/mysql2), [express-handlebars](https://www.npmjs.com/package/express-handlebars), [express-session](https://www.npmjs.com/package/express-session), [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize), and [bcrypt](https://www.npmjs.com/package/bcrypt) libraries.

A JSON file containing these dependencies is included with this project. To set up the development environment for the application, simply run the following command:

```bash
npm install
```

Alternatively, you can run the following commands in any order:

```bash
npm i express
npm i sequelize
npm i dotenv
npm i mysql2
...
```

Next, review the database connection parameters contained in the **.env** file and adjust them appropriately. A video demonstrating the structure of a similar file is provided [here](https://drive.google.com/file/d/1H1QxMmQ2VGIOGdsv1L2Kw3DSkkTOlBN5/view).

Using MySQL console, or a tool like MySQL Workbench, run the **schema.sql** script to create the **techblog_db** database; the file can be located in the following location:

```bash
db/schema.sql
```

A video demonstrating how to create a similar database schema from the MySQL shell is provided [here](https://drive.google.com/file/d/1XDstDm5OJD8ybH3d6cyTK59tuLHkp-Od/view).

Finally, the following command must be run to seed the database with sample data:

```bash
npm run seed
```

Or,

```bash
node seeds/index.js
```

A video demonstrating how to seed a similar database from the command line is provided [here](https://drive.google.com/file/d/1cxB7I41wX6AWwSDz2RDOpIf9_2EbgBuZ/view).

Once the database is created and seeded with sample data, run the following command to start the application:

```bash
node server.js
```
The application can be run from Heroku [here](https://ku-cbc-homework-14-tech-blog.herokuapp.com/).

### TODO

Enable the administration of user accounts (not required for this release).

## Usage

The application has been coded to perform CRUD operations against a live database using the most common HTTP methods for REST APIs: _GET_, _POST_, _PUT_, and _DELETE_. Therefore, make sure to follow the [Installation](#installation) instructions above if you want to test the application in your development environment.

As stated before, the application only includes _backend_ features; so, to test these features in real time, you will need to use any tool for API testing similar to **Insomnia Core**.

## License

This project is licensed under The MIT License. Refer to https://opensource.org/licenses/MIT for more information of what you can and cannot do with this project. See contact information below if you have questions, comments, or suggestions for the project.

## Contributing Guidelines

Want to contribute to this project? You may clone or fork the project in GitHub. Note the licesing information referred in this file.

## Contact Information

For questions, comments, or suggestions, please contact me by E-Mail:

japinell@yahoo.com

Check out my other **cool** projects in GitHub - https://github.com/japinell

## License

This application is licensed under the following license:

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)(https://opensource.org/licenses/MIT)
