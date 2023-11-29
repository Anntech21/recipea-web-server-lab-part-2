const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.get("/find-recipes", (req, res) => {
  fs.readFile("../data/recipea-data.json", "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/find-recipe/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("../data/recipea-data.json", "utf8", (err, data) => {
    const recipes = JSON.parse(data);
    const recipe = recipes[id];
    const jsonRecipe = JSON.stringify(recipe, null, 2);
    res.send(jsonRecipe);
  });
});

app.get("/trash-recipe/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("../data/recipea-data.json", "utf8", (err, data) => {
    const recipes = JSON.parse(data);
    recipes.splice(id, 1);
    const jsonRecipes = JSON.stringify(recipes, null, 2);
    fs.writeFile("../data/recipea-data.json", jsonRecipes, (err) => {
      res.send("Recipe with " + id + " has been deleted.");
    });
  });
});

// Handler for how to respond to requests to base url with /create-recipea-web-server-lab-part-2/[a note id] at the end.
app.get("/delete-note/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("../data/data.json", "utf8", (err, data) => {
    const notes = JSON.parse(data);
    // Deletes 1 item starting at index `id`.
    // Research the splice array method for how this works!
    notes.splice(id, 1);
    const jsonVersion = JSON.stringify(notes, null, 2);
    fs.writeFile("../data/data.json", jsonVersion, "utf8", (err) => {
      res.send("Successfully deleted note.");
    });
  });
});
