<h3 align="center">Zwallet Api</h3>
  <p align="center">
   <img src="https://user-images.githubusercontent.com/74039235/119271100-4065e500-bc2a-11eb-8635-b8ecd44f58be.png" style="margin-left: auto; margin-right: auto;" />
  </p>
  <p align="center">
   This Api is for Zwallet. application and payment services in the form of electronic money, electronic wallet, transfer, and other support services.
  </p>



## Built With
* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)
* **JWT** for Authentication
* **Nodemailer** for Mailer
* **Multer** for Upload file


## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](database-example.sql)



#### User Endpoint

|  METHOD  |             API             |                    REMARKS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `GET`   |           /users/           |                 Get All User                  |
|  `GET`   |        /users/profile       |      Get User's Profile by Decode Email       |
|  `GET`   |         /users/:id          |                Get User by Id                 |
|  `POST`  |       /users/register       |        Creat Account and Verify Activation    |
|  `POST`  |         /users/login        |            Login Activated Account            |
|  `PUT`   |         /users/verify       |              Verify User's Account            |
|  `PUT`   |      /users/updateimage     |               Update User's Image             |
|  `PUT`   |       /users/updatepin      |                Update User's Pin              |
|  `PUT`   |      /users/removephone     |          Update User's Phone to null          |
|  `PUT`   |    /users/changepassword    |              Update User's Password           |
|  `PUT`   |     /users/updateprofile    |               Update User's Profile           |


#### Transaction Endpoint

|  METHOD  |             API                            |                    REMARKS                    |
| :------: | :-------------------------:                | :-------------------------------------------: |
|  `GET`   | /transaction/history/transaction/:idsender |    Get All History Transaction by Idsender    |
|  `POST`  |        /transaction/topup                  |              Top Up User's Saldo              |
|  `POST`  |        /transaction/transfer               |          Transfer Saldo to Other's User       |
|  `GET`   |        /transaction/receiver/:idreceiver   |          Get Data Receiver by idreceiver      |
|  `GET`   |        /transaction/:id                    |             Get Transaction by Id             |



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
- :rocket: [Zwallet [Demo Application]](https://zwallet-frontend.vercel.app/auth/signin)


