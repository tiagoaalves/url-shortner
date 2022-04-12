# Url Shortner
This is my solution to the coding challenge: **Develop an internet service to shorten URLs like bit.ly or TinyURL**

## Prerequisites

### Dependencies
-NodeJS

### Instalation
-Run `npm install` or `yarn` to install the project dependencies.

### Launch
Run `npm run dev` to start the **Express.js** server.

## Database
The database, `shortened_urls_db`, for this particular challenge is stored in MongoDB following a NoSQL DB model.
It constains a collection, `shortened_url`, with the following schema:

-`_id:` an ID atrributed autommatically by MongoDB;
-`urlCode:` a String that contains the code that represents the shortened version of the given link;
-`longUrl:` the given link to be shorten;
-`shortUrl:` the full representation of the shortened link;
-`timesShortened:` a Number representing the ammount of times this particular `longUrl` was shortened;
-`timesAcessed:` a Number representing the ammount of times this particular `shortUrl` was acessed;

This schema is built in the file `/models/Url.js`.

## Routes

### API

``` 
GET ~/api/url/stats/:code
```
Returns all the information stored in the DB regarding this paticular `code`.

``` 
POST ~/api/url/shorten
```
Acepts a `longUrl` in the body of the request.
First, it checks if the given Url is valid, then, if it is, will either, if this is the first time the link is being shortened, create a new record in the DB and returned the generated `shortUrl` or, if it was previously shortened, return the stored `shortUrl`. In this last case it will also update its `timesShortened` property.

### Index

``` 
GET ~/:code
```
Redirects the user for the `longUrl` stored in the DB. It will also update its `timesAcessed` property in the DB.
