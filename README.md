<h3 align="center">Zwallet Api</h3>
  <p align="center">
   <img src="https://miro.medium.com/max/365/1*d2zLEjERsrs1Rzk_95QU9A.png" style="margin-left: auto; margin-right: auto;" />
  </p>
  <p align="center">
   This Api is for Zwallet. application and payment services in the form of            electronic money, electronic wallet, transfer, and other support services
  </p>



## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* **JWT** for Authentication
* **Nodemailer** for Mailer
* **Multer** for Upload file


## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](database-example.sql)


## Installation

Clone this repository and then use the package manager npm to install dependencies.


```bash
npm install
```

## Setup .env example

Create .env file in your root project folder.

```env

# Port
PORT=8080
HOST=localhost
PORT_FRONTEND=3000

# Database
DB_HOST=localhost
DB_USER=root
DB_NAME=zwallet

# Secret Key
SECRET_KEY= 'iniprivatekey'

```

## Run the app

Development mode

```bash
npm run dev
```

Deploy mode

```bash
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



># Visit Project
- :white_check_mark: [Frontend](https://github.com/kevinfaridap/zwallet-frontend)
- :rocket: [Zwallet](https://zwallet-frontend.vercel.app/auth/signin)


