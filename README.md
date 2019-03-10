# EPICmail
## GH PAGES LINK -> https://prosper07.github.io/EPICmail/


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