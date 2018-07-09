# Prerequisites
1. Install homebrew

`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2. Install nvm

`brew install nvm`

3. Install latest node version

`nvm install 10`

# Get set up
1. Open `Terminal`
2. `cd` to the directory you want to work in
3. `git clone https://github.com/alzapiedi/the_rock`
4. `cd the_rock`
5. `npm install`

# The Plan
1. Obtain a list of movies in theaters
2. For each of these movies:
  * Search the title on IMDb
  * Grab the URL of the top search result
3. For each of these URLS:
  * Visit the page
  * Look at the cast list
  * Determine if Dwayne Johnson is on it

# Important Concepts Used
1. Using node modules (require / import)
2. Making HTTP requests and handling their responses
3. Asynchronous execution of code
4. Parsing HTML documents for data

# Using node modules
### What is a node module
Code that you download to use in your project that has a specific purpose

In this project there are two node modules used, superagent and cheerio

The purpose of superagent is to easily make HTTP requests and deal with their responses

The purpose of cheerio is to make it very easy to search through an HTML document to find particular elements

### How to use a node module
Node modules must first be installed.  If you already have node installed its as easy as running the command:

`npm install superagent`

you can install multiple modules in one command  as such

`npm install superagent cheerio`

After installing a module you can use it in any code file in the project by requiring it

`const superagent = require('superagent')`

note that you can call the module whatever you want, ex:

`const http = require('superagent')` is also perfectly fine, you just will be referring to it as `http` rather than `superagent`

# Making HTTP requests

### The Request
When you visit a website (ie https://www.google.com) your browser makes an HTTP GET request to the specified address

There are several types of HTTP request, called the **request method**, but the three that matter the most:
1. GET
2. POST
3. PUT / PATCH (grouped because they are basically the same thing)

#### GET
GET requests are asking the server for some data.

#### POST
POST requests are sending some data to the server, which the server usually uses to create a resource.

#### PUT / PATCH
PUT requests are sending data to the server with the intention of completely replacing some data the server has stored

PATCH requests are sending a subset of the data that would be included within the PUT request, in order to update only some parts of the data that the server has stored

**In practice, most applications don't distinguish between PUT / PATCH (and some use POST instead of PUT or PATCH)**

### The Response
An HTTP response has a bunch of data in it, but the ones most important are the status code and the text.

In the case of our GET request to https://www.google.com, the response code 99.999% of the time will be **200 (success)** and the text will be the HTML document (starting with `<html>` and ending with `</html>`)

#### Status codes

It is not important to know all of them, the things to know are:
1. **2xx** (200-299) indicates success in one way or another
2. **3xx** (300-399) indicates that the resource has moved, and the response will contain the new location and redirect you to it
3. **4xx** (400-499) indicates a client error, AKA you are trying to find something that doesnt exist, or you are not allowed to access it
4. **5xx** (500-599) indicates a server error, AKA you did nothing wrong but something weird happened on the backend

Easter egg HTTP response code: **420** Enhance Your Calm

# Asynchronous Execution of Code

### What does asynchronous mean
To best answer this we'll first answer 'What does synchronous mean?'

Consider this block of code:
```
let number = 15;
let number2 = number + 10;
console.log(number2) // Output: 25
```

Each of the three lines is executed immediately following the previous line, so you might say that synchronous execution is just execution of the code exactly as you'd expect. so then what is asynchronous?

Consider this block:
```
function onSuccess() {
  console.log(2);
}

console.log(1);
superagent.get('https://www.google.com').then(onSuccess);
console.log(3);
```

in this case we are making an HTTP request to google within our code.  dont worry too much about this `.then` syntax right now as well get into that really soon, what is important to know is that as soon as you get your response from google, the function `onSuccess` is going to be called, which will print the number 2 to the console.

if this code was synchronous, you would expect the numbers 1, 2 and 3 to logged sequentially.  However, since the HTTP request is going to take some amount of time to complete, JavaScript is going to make the request and then forget about it and continue executing lines of code until the response comes back from google, at which time it executes whatever code you put inside that `.then` thing.

so in actuality what is happening in this block is the following:
1. the number 1 is logged to the console
2. the HTTP GET request to google is initiated
3. the number 3 is logged to the console
4. ...some time later (realistically 10-50 milliseconds) the response comes back from google and the number 2 is logged to the console

### Promises and callbacks
In JavaScript, the way that asynchronous code is handled is through what are called Promises.  A promise is an object that contains some block of asynchronous code to be executed such as an HTTP request.  When a promise is initiated it is **pending**. If the HTTP request is successful and a response comes back with a 2xx status code, then the promise will then be **resolved** with the body of the response, whereas if a 4xx or 5xx error code comes back the promise is said to be **rejected**, and will have information about what went wrong.

Promises are still relatively new to JavaScript and the old way of doing it was using callbacks.  A callback is just a function that pass in to another function to be called later on.  Heres an example using HTTP request as before:
```
function callback(error, response) {
  if (error) {
    console.log('error');
  } else {
    console.log('success');
  }
}

superagent.get('https://google.com', callback);
```

This isn't so bad when making one request like this, but sometimes several requests need to happen sequentially and the code gets really ugly:
```
superagent.get(url1, function(error, response) {
  superagent.get(url2, function(error, response) {
    superagent.get(url3, function(error, response) {
      // do something
    });
  });
})l
```
is the same thing as
```
superagent.get(url1)
  .then(() => {
    superagent.get(url2);
  })
  .then(() => {
    superagent.get(url3);
  })
  .then(() => {
    // do something
  });
```

#### .then() and .catch()

When working with a promise you use these two functions to define what should happen in the event of a success or failure.

The function you put inside of `.then()` will be executed when the promise is **resolved**

The function you put inside of `.catch()` will be executed when the promise is **rejected**

Here is the most basic example of using your own Promise:
```
function greetPoogs(name) {
  return new Promise(function(resolve, reject) {
    if (name === 'Poogs') {
      resolve('Hello Poogs');
    } else {
      reject(new Error('I only greet Poogs'));
    }
  });
}

// This promise will always resolve and print 'Hello Poogs' to console
greetPoogs('Poogs')
  .then(greeting => {
    console.log(greeting);
  })
  .catch(error => {
    console.log(error.message);
  });

// This promise will always reject with the error message 'I only greet Poogs'
greetPoogs('Nick')
  .then(greeting => {
    console.log(greeting);
  })
  .catch(error => {
    console.log(error.message);
  });
```

In this above example, it is 100% pointless to be using promises (because there is nothing asynchronous happening) and you would never actually do this, its just to demonstrate how they are used.

**When calling `reject` the argument must always be an error, whereas calling `resolve` the argument can be anything you want**

Here is a basic example of how a function like `superagent.get()` might work to turn a function that uses callbacks into a Promise (known as promisifying):

```
superagent.get = function(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, function(error, response) {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
}
```

# Scraping HTML Documents

Scraping an HTML document will be different each time depending on how the document is structured and what you are looking for.  But the basics remain the same, you are looking for some particular element or group of elements to find out what data is contained in them. The cheerio node module makes this really easy to accomplish by mimicking a very popular in-browser JavaScript library called [jQuery](https://jquery.com).  If you visit that website and open the JavaScript console (CMD + Shift + J), the jQuery function is defined as `$`, so you can experiment with it on their website.  Ex: `$('body')` will return a list with only one item, which is the `<body>` element.

### HTML Elements and Selectors

#### Elements

HTML elements are these guys `<body></body>` `<a></a>` `<button></button>` `<div></div>`

If you open the developer tools in browser (CMD + Shift + i) and click on the `Elements` tab you can navigate through the entire HTML structure easily (and the browser will even highlight on the page which element you are currently clicking on in the tree).  You'll see that lots of elements have either an `id`, `class` or sometimes both.  These can be used in your selectors to narrow down the list of results.

#### Selectors

To select all instances of a `<button>` element you would use `$('button')`

Say you have a bunch of buttons and some of them look like this `<button class="small">`

You could use `$('.small')` to get a list of all elements that have `class="small"`, or you could use `$('button.small')` to get a list of all `<button class="small">` elements

If you want to select an element by ID, it is the easiest way, because the document cannot have more than one element with the same ID (whereas class names are generic and meant to be reused for CSS styling purposes)

The syntax to select `<button id="submit_form">` is `$('#submit_form')`

#### Quick reference

1. `$('button')` - select all `button` elements
2. `$('.small')` - select all elements that have `small` in their class name
3. `$('button.small')` - select all `button` elements that have `small` in their class name
4. `$('#main_content')` - select the one element with `id=main_content`
5. `$('#main_content button')` - select all the `button` elements that are children of the `id=main_content` element
6. `$('.small.blue')` - select all elements that have `small` AND `blue` in their class name
