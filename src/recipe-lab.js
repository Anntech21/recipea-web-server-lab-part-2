//Importing the modules needed to run the app // SETTING UP THE APP
const express = require("express");
const fs = require("fs").promises;
//We are requiring express and fs. These are both modules. What is a module? A module is a package of pre-written code. What are the differences between these two modules? One is internat and one is external to Node and has to be installed. One is built into Node. Their is a third type which we can build.

const app = express();

// The app.listen() function is used to bind and listen to the connections on the specified host and port. What is a port?
app.listen(3000, () => {
  console.log("server listening on port 3000.");
});

//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON playloads
app.use(express.json());

//This is my Helper functions // Why are we using a json file? What is this simulating? // A database! //This function accesses all recipes in the data file.
const getRecipes = async() => {
  const recipes = await fs.readFile("../data/recipea-data.json", "utf8");
//What is the value of getRecipes once this code is called? What data type? Array // you can console.log(recipes) and call by getRecipes() to check
  return recipes;
};
// SETTING UP THE APP ENDS // HELPER FUNCTION STARTS //This function accesses one recipe in the data file.
const getRecipe = async (id) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  //console.log(JSON.parse(data)[id]) //console.log(data[0]))
  return JSON.parse(data)[id];
};
//getRecipe() //getRecipe(0)
//This function accesses one recipe in the data file, for the purpose of deletion. using filter.// What does a .filter() do? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// What is the difference between JSON.parse() and JSON.stringify()?https://masteringjs.io/tutorials/fundamentals/stringify
const deleteRecipe = async (id) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
 // const recipes = JSON.parse(data).filter(function ( recipe, i) { i !== id); } 
  const jsonRecipes = JSON.stringify(recipes,null,2);
  await fs.writeFile("../data/recipes-data.json", jsonRecipes);
};



// Create a helper function that adds a new Recipe to our list
const createRecipe = async (name, cookingMethod, ingredients) => {
   // Get our recipe list
  const recipeArray = await fs.readFile("../data/recipea-data.json", "utf8");
  // Turn the list from JSON to JS - using JSON.parse
  const recipeList = JSON.parse(recipeArray);
  // Take the user's input and turn that into a structured object that matches what is in our recipe list already, Create an object with the request from the FE
  const newRecipe = {name: name, 
  cookingMethod: cookingMethod,
  ingredients: ingredients 
}


// Push that object to our recipe array
recipeList.push(newRecipe);
 // Turn the array into JSON
const jsonAddRecipe = JSON.stringify(recipeList, null, 2);
 // Update a data file, writing to our JSON file
await fs.writeFile("../data/recipea-data.json". jsonAddRecipe);
}
// Await/Async - event loop and when items are going to be returning from the function//API calls //API call for finding all recipes
//const saveRecipe = async (newRecipe) => {
  //const data = await fs.readFile("../data/data.json", "utf8");
  //const recipe = [...JSON.parse(data), newRecipe];
  //const jsonVersion = JSON.stringify(recipe, null, 2);
  //await fs.writeFile("../data/data.json", jsonVersion, "utf8");
//}

// This is my Route

//Why is this app.get(?
app.get("/find-recipes", async (req, res) => {
  const recipes = await getRecipes();
  res.send(recipes);
}); 

// Create the post method to handle the user's input 
app.post("/create-recipe", async (req, res) => {
await createRecipe(req.body.name, req.body.cookingMethod, req.body.ingredients);
res.status[201].json('You added a new recipe');
});
