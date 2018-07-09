# Goal

Use superagent to make visit a IMDb URL that you scraped in step 2, and then find out whether or not 'Dwayne Johnson' appears on the cast list

To run this one, grab the IMDb URL from a movie that you got in step 2, then paste it on line 21 of step_3.js.  Then `cd` into the directory and run `node step_3.js`

## Ternary operator

I used the ternary operator on line 22

```
console.log(hasRock ? 'The Rock is in this movie' : 'The Rock is not in this movie')
```

it is a more concise way of doing this
```
if (hasRock) {
  console.log('The Rock is in this movie');
} else {
  console.log('The Rock is not in this movie');
}
```

the exact definition is
```
conditionThatCanBeTrueOrFalse ? whatItEvaluatesToWhenTrue : whatItEvaluatesToWhenFalse


// ex:
const x = (5 + 5 == 10) ? 'evaluated to true' : 'evaluated to false'; // => 'evaluated to true'
const x = (5 + 5 == 15) ? 'evaluated to true' : 'evaluated to false'; // => 'evaluated to false'
```
