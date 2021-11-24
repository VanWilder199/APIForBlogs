swagger - http://localhost:3000/api-docs/


work with API 

1.npm run install
2.npm run schema:drop
3.npm run migration:run
4.npm seed: run - implementation seeds 
5.npm run start

6. createNewUser or get user from DB
Example
http://localhost:3000/enter/
body {
login: "superUser",
password: "123CV456dc68f"
}
7. get JWT token to work with blog messages
Example
http://localhost:3000/login/
body {
   login: "superUser",
   password: "123CV456dc68f"
}
8. get all messages (by default 20 messages)
Example
   http://localhost:3000/messages?limit=30
9. create new messages
Example
   http://localhost:3000/messages
body {
   post_text: "dasda dasdas dasd asdasd"
   post_media: "link"
   author: "vova"
}
10. update message
Example
    http://localhost:3000/messages/{id}/author={author}
body {
    "id": "d1d198f1-c456-4c14-b5c0-a3283e6a48a7",
    "created_at": "2021-11-24T05:36:34.502Z",
    "post_text": "Dam vertical Guinea-Bissau Savings Account aggregate Investment Account navigating Ergonomic tangible digital overriding Towels multi-byte Data Berkshire solution Metal Senior hybrid Platinum",
    "post_media": "http://lizeth.net",
    "author": "Ronaldo",
    "isDeleted": false
}
11. delete message
    Example
    http://localhost:3000/messages/{id}/author={author}