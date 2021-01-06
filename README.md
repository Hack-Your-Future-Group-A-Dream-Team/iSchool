# CONTENTS

> A. How to update `nodejs` dependencies to launch the project successfully

> B. List of project's web services

-----------
## A. How to update `nodejs` dependencies to launch the project successfully 

## 1. Go to the `client` folder 
- Delete node_modules folder
- Delete file `package-lock.json`
- Delete file `package.json`
## 2. In the main folder of the project 
- Delete node_modules folder
- Delete file `package-lock.json`
- Delete file `package.json`

## 3. Pull the last changes from github
it will contain `package.json`

## 4. Go to the `client` folder
- run `npm install`
## 5. Back to the main folder of the progect
- run `npm install`

## 6. Starts from now we can't run only frontend separately, thats because we already check if user is Authenticated, so in order to run the project do the following steps:
- In the `main folder` of the project (server side) open terminal and run `nodemon index`

- In the `client` folder (frontend side) open another terminal and run `npm start`

 And Voilà, the project hopefully should run 😁. Since there is already `.env` file, you will automatically be connected to the database. You can see line`connected to the database` in your `server side` terminal.

 -----------

 ## B. List of project's web services


 **1. get list of schools**
 
 * *type:* `GET`
 * *path:* `/schools`
 * *consumes:* --
 * *returns:* list of all documents in SCHOOL collection

 **2. get the closest school**

 * *type:* `GET`
 * *path:* `/closestschools`
 * *consumes:* `lng` (type: float), `lat` (type: float)
 * *returns:* list of documents of schools within `1000m`

 
 **3. Read selected school comments**

 * *type:* `GET`
 * *path:* `/schools/comments`
 * *consumes:* `schoolid` (type: String)
 * *returns:* list of documents from COMMENTS model by `schoolid` 

  **4. Write a comment for the selected school**

 * *type:* `POST`
 * *path:* `/schools/comments`
 * *consumes:* `schoolid` (type: String), `userid` (type: String)
 * *action*: saves a new document to the COMMENTS collection
 * *returns:* COMMENTS collection's document with a new comment

  **5. Add a rating to the selected school**

 * *type:* `POST`
 * *path:* `/schools/rating`
 * *consumes:* `schoolid` (type: String), `userid` (type: String), `score` (type: Number)
 * *action*: adds a `score` to the document in School collection according to the `schoolid`
 * *returns:* Object with the average rating of the selected school 

  **6. Save favorite schools in user's account**

 * *type:* `PUT`
 * *path:* `/user/favorites`
 * *consumes:* `userid` (type: String), `listOfSchools` (type: Array)
 * *action*: overwrites `listOfSchools` in the user account, so all the updated list must be send.
 * *returns:* 

  **7. Get favorite schools from user's account**

 * *type:* `GET`
 * *path:* `/user/favorites`
 * *consumes:* `userid` (type: String) 
 * *returns:* array of favorite schools


