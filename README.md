<p align="center"><img width=12.5% src="https://fontawesome.com/icons/globe-americas?style=solid"></p>
<h1 align="center"><strong>Now&Then</strong></h1>


## Overview

Do you like history but really only like looking at the images? We have an app for that! 
Have you ever wondered what your town or the street you live on looked like before global modernization? We have an app for that!
In a new city or country and would like to know what it used to look like? We absolutely have THE app for that.

Now&Then is a full-stack mobile responsive browser application that allows a user to search any location and preview authoritative documented images of what that location used to look like! 


## Demo the App

*Now&Then* is deployed on Heroku. Demo the application [here](https://afternoon-island-95773.herokuapp.com/).


### Application Video Demo


![Now&Then](/video/appDemo.mov)


### How it Works

- Now&Then utilizes Passport middleware for user login and signup to ensure user authentication. The app allows for new users to create an account, or for prior users to signin. 

- Users may search a wide range of location queries; from the state level, to cities, to towns, streets, buildings, landmarks, and even historical figures. The 'Favorites' functionality of the application allows users to favorite specific images to save for future reference. To ensure persistant data, the app utilizes the Sequelize promise-based ORM to connect with Now&Then's databases.

- To serve the images and data, the application implements the Digital Public Library of America (DPLA) API Codex, which searches accurate and reliably documented sources to render historical images of our bygone physical world. 


## Installation

To install the application locally, run the following in your terminal/bash:

* git clone https://github.com/savannahcarr/project2.git
* cd project2
* npm install

Next, run the noder server:
* node server.js

Finally, open the local application on port 3000 at the following URL:  `localhost:3000`


## Technologies Implemented:

- Node.js 
- Sequelize ~ http://docs.sequelizejs.com
- Sequelize NPM Package ~ https://www.npmjs.com/package/sequelize
- Express NPM Package ~ https://www.npmjs.com/package/express
- Handlebars.js ~ https://handlebarsjs.com
- Express-Handlebars NPM Package ~ https://www.npmjs.com/package/express-handlebars
- Passport ~ https://www.npmjs.com/package/passport
- Body-Parser NPM Package ~ https://www.npmjs.com/package/body-parser
- Express-Session NPM Package ~ https://www.npmjs.com/package/express-session
- MySQL NPM Package ~ https://www.npmjs.com/package/mysql
- DPLA API ~ https://pro.dp.la/developers/api-codex


## Built With

- Visual Studio Code ~ code editor
- Bootstrap ~ framework
- CSS ~ custom stylesheet


## Authors
- Savannah Carr [savannahcarr](https://github.com/savannahcarr)
- Alexander Netter [xnetter5](https://github.com/xnetter5)
- Michael Bieniewicz-Valada [MDBValada](https://github.com/MDBValada)


## Credits

Full-Stack Flex Coding Bootcamp @ UCLA Extension

