import * as FormModule from './Form.js'; // Importing a default export from Form.js
// Logical And (&&) Operator
console.log(agecheck(18) && "You can vote.");
// it check if first condition is true then run the second condition

// Logical Or (||) Operator
console.log(agecheck(17) || "You are not an adult.");
// it will only run the second condition if the first one is false but if the first one is true it will not run the second condition

// Template Literals 
console.log(`Can i vote ? ${agecheck(18)}.`); // we can use variables functions inside strings using template literals

// Ternary Operator
function agecheck(age) {
    return age >= 18 ? true : false; // it is a shorthand for if else statement
}

// Array Destructuring
const arr = [1, 2, 3, 4];
const [first, second, third, fourth] = arr; // destructuring the array into variables
console.log(first, second, third, fourth);
//array last value
console.log(arr.at(-1));
console.log(e);
// Object Destructuring
const obj = { name: "John", age: 30 };
const { name, age } = obj; // destructuring the object into variables
const { name:username, age:userage } = obj; // destructuring the object into variables
console.log(username, userage);
const obj2 = { name, age, city: "New York" }; // if keys and value are same we can use shorthand notation

//Default Parameters, Spread Operator, and Rest Parameters

function sum(a = 1, b = 1) { // default parameters
    return a + b;
}
sum(5, 10); // calling the function with parameters
console.log(sum()); // calling the function without parameters, it will use default values

let arr1 = [...arr, 69]; // Spread operator to create a new array or object with additional elements
console.log(arr1); // it will print the new array with additional element

function multiply(...a) { // Rest parameters to accept multiple arguments but is will be treated as an array
    return a.reduce((acc, curr) => acc * curr, 1);
}
console.log(multiply(2, 3, 4)); // calling the function with multiple arguments

// Map, Filter, find , some , includes ,indexof , find ,every , findindex methods
const numbers = [1, 3, 3, 7, 5];
const doubled = numbers.map(num => num * 2); // it will return a new array with each element multiplied by 2
const evens = numbers.filter(num => num % 2 === 0); // it will return a new array with only even numbers
const found = numbers.find(num => num === 3); // it will return the first element that matches the condition
const hasOdds = numbers.some(num => num % 2 !== 0); // it will return true if there is at least one odd number in the array
const allEvens = numbers.every(num => num % 2 === 0); // it will return true if all elements are even
const includesTwo = numbers.includes(2); // it will return true if the array includes the value 2
const indexOfThree = numbers.indexOf(3); // it will return the index of the first occurrence of the value 3
const findIndexOfThree = numbers.findIndex(num => num === 3); // it will return the index of the first element that matches the condition 
// we will get -1 if indexof or findIndex does not find the element
console.log(hasOdds, allEvens, includesTwo, indexOfThree, findIndexOfThree);

// Async Await API Call
let token =[];
(async () => {
    try{
    let login= await fetch("http://waleed767.pythonanywhere.com/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "john@example.com",
            "password": "secure123"
        })
    });
    let result = await login.json();
    if (result?.token) // ? is used to check if token exists in the result so prevent errors if not present it just returns undefined
        {
        console.log(result?.message); // Log the message from the response
        token.push(result.token); // Store the token in the array
    }
    }
    catch (error) {
        console.error("Error during login:", error);
    }
})() // Log the response data to the console

