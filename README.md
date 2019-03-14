# Project Title : EPICmail

    A messaging online app where registered users can interact with each othert via messages over a structured system.
    The app is still in building mode, so if you want to see how it will be displayed in front-end, follow its gh-pages link -> https://prosper07.github.io/EPICmail/ . Interact also with its back-end (hosted on heroku) via this link -> https://epicmailapi.herokuapp.com/.

## Getting Started, Installing & Deployment

The front-end is very easy to handle.
The background is handled as following:

From scratch

1). First, you have to install Node.js in your system.
    You can download it by following this link https://nodejs.org

2). Download this project in your system ( you can download the .zip format and then unzip it in your system)

3). Install all modules by running <npm install> in your system's command line (be sure your system is online)

4). Now run the app by typing <npm start>

5). Go to your browser and type <http://localhost:5000> in your adress bar. Now you see the Welcome page, and can only have access to data that are stored in the app, but cannot put a data or record anything. To do it,

6). Dowload Postman (an tool which shall help you to put data, to update them, to delete them, and also to get them from the app). Make sure you have installed it in your system (you can download it via this link https://www.getpostman.com )

    (ENDPOINTS EXPLAINATION)

7). Open Postman and choose a method between GET,POST, PUT, and DELETE method.

    A). With GET Method: Type the following link in the adress      bar to get all received messages for a given user:
        - http://localhost:5000/api/v1/inbox/X/Y
                    (X is the ID of the receiver, and Y is their password. To avoid every user to see everybody's messages)
        
    B). With GET Method: Type the following link in the adress      bar to get all messages sent by a given user: 
        - http://localhost:5000/api/v1/sent/X/Y
                    (X is the ID of the sender, and Y is the code of the message. To avoid every user to see everybody's messages)
        
    C). With GET Method: Type the following link in the adress      bar to get all user's unread message: 
        - http://localhost:5000/api/v1/sent/X/unread
                    (X is the ID of the user)
        
    D). Now with POST Method: Type the following link in the        adress bar to create a user: 
        - http://localhost:5000/api/v1/users
            Here is the format the data you are storing should take (example):
                    {
                     "general": {
                        "email": "prosperkilolo@gmail.com",
                        "firstName": "Prosper",
                        "lastName": "KILOLO"
                      },
                     "confidential": {
                        "password": "333",
                        "groupCreatorId": 3,
                        "groupParticipantId": [
                           1
                         ],
                        "contactListId": [
                           1,
                           2,
                           3
                         ]
                      }
                    }
            The ID, and the date & time of creation will be automatically added.

    E). With POST Method: Type the following link in the        adress bar to send a message to a given user: 
        - http://localhost:5000/api/v1/messages
            Here is the format the data you are storing should take (example):
                    {
                     "subject": "JC",
                     "message": "JC",
                     "parentMessageId": 3,
                     "status": "read",
                     "senderId": 3,
                     "receiverIndivId": 4,
                     "receiverGroupId": [
                       3,
                       2
                      ]
                    }
            The ID, and the date & time of creation will be automatically added.

    F). Now with PUT Method: Type the following link in the        adress bar to update a given user's information: 
        - http://localhost:5000/api/v1/users/X/Y
                    (X is the ID of the user, and Y is their password. To avoid every user to modify everybody's account information)
            Here is the format the data you are updating should take (example):
                    {
                     "general": {
                        "email": "prosperkilolo@gmail.com",
                        "firstName": "Prosper",
                        "lastName": "KILOLO"
                      },
                     "confidential": {
                        "password": "333",
                        "groupCreatorId": 3,
                        "groupParticipantId": [
                           1
                         ],
                        "contactListId": [
                           1,
                           2,
                           3
                         ]
                      }
                    }
            The date & time of update will be automatically added.

    G). With DELETE Method: Type the following link in the          adress bar to delete a given user's account:
        - http://localhost:5000/api/v1/users/X/Y
                    (X is the ID of the user, and Y is their password. To avoid every user to delete everybody's account)

    H). With DELETE Method: Type the following link in the          adress bar to delete a given sent message:
        - http://localhost:5000/api/v1/sent/X/Y
                    (X is the ID of the sender, and Y is their password. To avoid every user to delete everybody's sent message)

    H). With DELETE Method: Type the following link in the          adress bar to delete a given received message:
        - http://localhost:5000/api/v1/inbox/X/Y
                    (X is the ID of the receiver, and Y is their password. To avoid every user to delete everybody's received message)

They are other options which are still in construction.

### Prerequisites

To run this app you need a system which is compatible with Node.js (Mac, Windows, Linux)

## Built With

- Server environment: Node.js 
- With the framework: Express
- Testing library: Mocha
- Programming language: ES6

## Contributing

Prosper B. KILOLO  prosperkilolo@gmail.com

## Versioning

Version: v1

## Author

Prosper B. KILOLO  prosperkilolo@gmail.com