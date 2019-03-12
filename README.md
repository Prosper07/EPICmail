# EPICmail
## GH PAGES LINK -> https://prosper07.github.io/EPICmail/

# EPICmail
## GH PAGES LINK -> https://prosper07.github.io/EPICmail/

## HEROKU link -> https://epicmailapi.herokuapp.com/

## API ENDPOINTS FOR MESSAGES IN GENERAL:
#### GET /api/v1/messages   to see all messages
#### GET /api/v1/messages/X to see message with ID equals to X
#### POST /api/v1/messages   to create a new message
#### PUT /api/v1/messages/X   to update the message which ID is X
#### DELETE /api/v1/messagesX   to delete the message which ID is X

## API ENDPOINTS FOR USERS IN GENERAL:
#### GET /api/v1/users   to see all users
#### GET /api/v1/users/X to see user with ID equals to X
#### POST /api/v1/users   to create a new user
#### PUT /api/v1/users/X   to update the user which ID is X
#### DELETE /api/v1/users/X   to delete the user which ID is X

## THE SAME FOR:

#### /api/v1/contacts (and related) to do the same thing now with contacts
#### /api/v1/sent   (and related) to do the same thing now with sent messages
#### /api/v1/inbox   (and related) to do the same thing now with inbox messages
#### /api/v1/group   (and related) to do the same thing now with groups
#### /api/v1/groupmbr (and related) to do the same thing now with group members


1).--For sending message via POST, you have to put values of "subject", "message", "parentMessageId", and "status"
   here is the way you have to complete it:(all of them are mendatory)
Exemple:

{
	"subject":"JC",
	"message":"JC",
	"parentMessageId": 3,
	"status":"read",
	"senderId": 3,
	"receiverIndivId": 3,
   "confidential": {
      "messageCode": "77777777"
      },
	"receiverGroupId": [
		3,
		2
		]
}

2).--For creating user account, via POST you have to put values of "subject", "message", "parentMessageId", and "status"
   here is the way you have to complete it:(all of them are mendatory)
Exemple:

   {
   "general":{
               "email": "prosperkilolo@gmail.com",
               "firstName": "Prosper",
               "lastName":"KILOLO"
               },
   "confidential":{
   				"password":"88778888",
   				"groupCreatorId":3,
   				"groupParticipantId":[
   					1,
   					2,
   					3
   					],
   				"contactListId":[
   					1,
   					2,
   					3
   					]
   			}
}