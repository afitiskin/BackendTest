# restAPI
To start the server use Command 
 nodemon .bin/www inside the directory

The following Api's are created using Express, and Node with Mongodb as a database.

The following can be tested using Postman or any other RestAPI testing tool.I have added access  for r_saxena@rovoox.com to mongodb Atls to view database for the following. It will be removed within a week.

The server perform the following Tasks. 

    URL: /now Request method: GET Authorisation: not required Response: – timestamp:
    number (current server time) Description: using this method user is able to get current
    server time

    URL: /register Request method: POST Authorisation: not required Request body: – name:
    string (user's name) Response: – token: string (user's bearer token, which will be used to
    authorise user) Description: using this method user can be registered in the system provided
    name (name should be unique) and get authorisation token. This token will be used to
    access API endpoints which require authorisation

    URL: /me Request method: GET Authorisation: Bearer token Response: – name: string
    (user's name) – points: number (user's points) Description: using this method user can get
    information about himself (name and amount of points)

    URL: /game/play Request method: POST Authorisation: Bearer token Response: -
    points_added: number (amount of points added to the user's balance) – points_total:
    number (total amount of points of the current user) Description: Using this method user is
    able to add random number of points (from 1 to 100, generated on server) to his balance.
    During every hour (e.g. from 11:00 until 12:00 server time) user can play no more than 5
    times. For example: First request at 11:05 – OK Second request at 11:06 – OK Third request
    at 11:20 – OK Forth request at 11:40 – OK Fifth request at 11:41 – OK All following requests
    until 12:00 – ERROR Sixth request at 12:00 – OK and so on...

    URL /game/claim_bonus Request method: POST Authorisation: Bearer token Response: –
    points_added: number (amount of points added to the user's balance) – points_total:
    number (total amount of points of the current user) Description: for every minute after date
    of registration or date of the last bonus claim user has ability to get 10 extra points.
    Maximum amount of points which user can get for 1 claim request is limited by 100.
    
    URL /leaderboard Request method: GET Authorisation: not required Response: – leaders: [{
    name: "Leader", place: 1, points: 100500 }, { name: "Second user", place: 2, points: 1000 },
    ...] (10 best players with name, place and amount of points) – current_user_place: 42
    (OPTIONALLY and only if bearer token provided) Description: Using this method user has
    ability to get 10 best players (with most amount of points).
    
For tesing Purpose I have One can UserName : "swetabhSubham", though there are various other users in databse as well and one can always create one. 
Test Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyNjkiLCJpYXQiOjE2MDgyODUxNDJ9.pXPLdv76kxRryY8cmqel3T3ySNHLnMdSxwj05uBCoas

