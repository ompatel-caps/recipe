// name of the variable fetch recipes is let = recipes[]
  //                                          display recipes
const url = 'data/recipe.json';

fetch(url)

.then(response => response.json())  // Convert the response to JSON
.then(recipes => {


const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) || recipe.category.toLowerCase().includes(query)
    );

    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";
    filteredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3 class="recipe-name">${recipe.name}</h3>
            <p>${recipe.category}</p>
            <button class="viewRecipe button-group" onclick="viewRecipe(${recipe.id})">View Recipe</button>
            &nbsp;
             <button class="favorite-button button-group" data-id="${recipe.id}">Add to Favorites</button>
        `;

        recipeList.appendChild(card);
    });
});
})
.catch(error => console.error('Error loading recipes:', error));


//                                              filer recipe script


const recipeList = document.getElementById("recipe-list");
let recipes = []; 

fetch(url)
    .then(response => response.json())
    .then(data => {
        recipes = data;
        console.log(data); 
    })
    .catch(error => console.error("Error fetching recipes data:", error));


function displayRecipes() {

    recipeList.innerHTML = "";


    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3 class="recipe-name">${recipe.name}</h3>
            <p>${recipe.category}</p>
          <button class="viewRecipe button-group" onclick="viewRecipe(${recipe.id})">View Recipe</button>
                         <button class="favorite-button button-group" data-id="${recipe.id}">Add to Favorites</button>

        `;
        recipeList.appendChild(card);
    });
}

function filterByCategory(category) {
    const filteredRecipes = category ? recipes.filter(recipe => recipe.category === category) : recipes;
    
    recipeList.innerHTML = ""; 


    filteredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3 class="recipe-name">${recipe.name}</h3>
            <p>${recipe.category}</p>
           <button class="viewRecipe button-group" onclick="viewRecipe(${recipe.id})">View Recipe</button>
                         <button class="favorite-button button-group" data-id="${recipe.id}">Add to Favorites</button>

        `;
        recipeList.appendChild(card);
    });
}


 


  


  //                                       viewpage navigation 

  fetch(url)
  .then(response => response.json()) 
  .then(recipes => {
    viewRecipe(recipeId);
  })
  .catch((error) => {
    console.error("Error loading recipes:", error);
  });

function viewRecipe(recipeId) {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    if (selectedRecipe) {
        localStorage.setItem("selectedRecipe", JSON.stringify(selectedRecipe));
        window.location.href = "viewpage.html";
    }
}

// Retrieve from localStorage
const selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));

const recipeContainer = document.getElementById("recipeContainer");
if (selectedRecipe) {
    const ingredients = selectedRecipe.ingredients || [];
    const ingredientsHTML = ingredients.map((ingredient, index) => {
        return `
            <div>
                <input type="checkbox" id="ingredient-${index}" class="ingredient-checkbox">
                <label for="ingredient-${index}">${ingredient}</label>
            </div>
        `;
    }).join('');

    recipeContainer.innerHTML = `
        <section class="performance-facts">
        <header class="performance-facts__header">
            <h1 class="performance-facts__title">${selectedRecipe.name}</h1>
            <p>Serving Size: ${selectedRecipe.servingSize || "1 serving"}</p>
            <p>Category: ${selectedRecipe.category}</p>
        </header>
        <img src="${selectedRecipe.image}" alt="${selectedRecipe.name}" style="width: 100%; max-width: 600px; border-radius: 10px;">
        
        <table class="performance-facts__table">
            <thead>
            <tr>
                <th colspan="3" class="small-info">Amount Per Serving</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th colspan="2">
                <b>Calories</b> ${selectedRecipe.nutrition.calories}
                </th>
                <td>Calories from Fat ${selectedRecipe.nutrition.caloriesFromFat || "N/A"}</td>
            </tr>
            <tr class="thick-row">
                <td colspan="3" class="small-info">
                <b>% Daily Value*</b>
                </td>
            </tr>
            <tr>
                <th colspan="2">
                <b>Total Fat</b> ${selectedRecipe.nutrition.fat}
                </th>
                <td>
                <b>${selectedRecipe.nutrition.dailyValueFat || "N/A"}%</b>
                </td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Saturated Fat ${selectedRecipe.nutrition.saturatedFat || "0"}</th>
                <td>${selectedRecipe.nutrition.dailyValueSatFat || "N/A"}%</td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Trans Fat ${selectedRecipe.nutrition.transFat || "0"}</th>
                <td></td>
            </tr>
            <tr>
                <th colspan="2"><b>Cholesterol</b> ${selectedRecipe.nutrition.cholesterol || "0"}mg</th>
                <td>${selectedRecipe.nutrition.dailyValueCholesterol || "N/A"}%</td>
            </tr>
            <tr>
                <th colspan="2"><b>Sodium</b> ${selectedRecipe.nutrition.sodium || "0"}mg</th>
                <td>${selectedRecipe.nutrition.dailyValueSodium || "N/A"}%</td>
            </tr>
            <tr>
                <th colspan="2"><b>Total Carbohydrate</b> ${selectedRecipe.nutrition.carbs || "0"}</th>
                <td>${selectedRecipe.nutrition.dailyValueCarbs || "N/A"}%</td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Dietary Fiber ${selectedRecipe.nutrition.fiber || "0"}</th>
                <td>${selectedRecipe.nutrition.dailyValueFiber || "N/A"}%</td>
            </tr>
            <tr>
                <td class="blank-cell"></td>
                <th>Sugars ${selectedRecipe.nutrition.sugar || "0"}</th>
                <td></td>
            </tr>
            <tr class="thick-end">
                <th colspan="2"><b>Protein</b> ${selectedRecipe.nutrition.protein}</th>
                <td></td>
            </tr>
            </tbody>
        </table>
        
        <table class="performance-facts__table--grid">
            <tbody>
            <h3>Ingredients</h3>
            ${ingredientsHTML}
            </tbody>
        </table>
        
        <h3>Instructions:</h3>
        <p>${selectedRecipe.instructions}</p>

        <!-- Print Button -->
        <button id="printBtn" style="padding: 10px 20px; margin-top: 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Recipe</button>
        </section>
    `;

    // Print functionality
    const printButton = document.getElementById('printBtn');
    printButton.addEventListener('click', function() {
        window.print();
    });
} else {
    recipeContainer.innerHTML = "<p>No recipe selected!</p>";
}




////// ////////////////////////////////////// 

