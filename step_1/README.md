# Goal

Use superagent to make a request to Box Office Mojo, then use cheerio to parse the response and build a list of movie titles.
You should visit the page that you're scraping in browser to examine the markup and find a way to select the elements you're looking for

You will definitely need to refer to the [cheerio documentation](https://cheerio.js.org/#api) to see what it is capable of and how to traverse through the nodes of the document.

To run your script, open the terminal and `cd` into this directory before running `node step_1.js`

## Set up

I already set up a shell for the function (make sure you get what it all means), which makes the HTTP request to Box Office Mojo, and sets up the cheerio object for use.  Its up to you to scrape that document for the list of movies and then resolve the Promise with that list.

## Arrow function syntax

I am using the arrow function syntax here which might look weird if you haven't seent it before.  Its just a shorter way to declare a function and makes the resulting code look neater

Standard function declarations
```
function doSomething(argument) {
  // code goes here
}

var doSomething = function(argument) {
  // do something
}
```

Arrow function declaration
```
var doSomething = (argument) => {
  // do something
}
```

and in this particular example it turns this
```
return new Promise(function(resolve, reject) {

}));
```

into this
```
return new Promise((resolve, reject) => {

});
```
