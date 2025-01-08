const recipesPerPages = 3; // Number of recipes per page
let currentPages = 1;

// Handle the favorite button click
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("favorite-button")) {
    const recipeId = event.target.getAttribute("data-id");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(recipeId)) {
      favorites.push(recipeId);

      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites));

      alert("Recipe added to favorites!");
    } else {
      alert("Recipe is already in favorites.");
    }
  }
});

// Function to display favorite recipes with pagination
function displayFavoriteRecipes() {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
  
    fetch('data/recipe.json')
      .then((response) => response.json())
      .then((recipes) => {
        const favoriteRecipes = recipes.filter((recipe) =>
          favoriteIds.includes(recipe.id.toString()) // Ensure proper comparison
        );
  
        console.log(favoriteRecipes); // Check if favorite recipes are correctly filtered
  
        const totalRecipes = favoriteRecipes.length;
        const totalPages = Math.ceil(totalRecipes / recipesPerPages);
        const startIndex = (currentPages - 1) * recipesPerPages;
        const endIndex = startIndex + recipesPerPages;
        const paginatedRecipes = favoriteRecipes.slice(startIndex, endIndex);
  
        const favoriteContainer = document.getElementById("favorite-recipes");
        const paginationContainer = document.getElementById("pagination");
  
        // Clear previous content
        favoriteContainer.innerHTML = "";
        // paginationContainer.innerHTML = "";
  
        // Display paginated recipes
        if (paginatedRecipes.length > 0) {
          paginatedRecipes.forEach((recipe) => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";
  
            recipeCard.innerHTML = `
              <h3 class="recipe-name">${recipe.name}</h3>
              <img src="${recipe.image}" alt="${recipe.name}">
              <p>${recipe.category}</p>
              <button class="viewRecipe button-group" onclick="viewRecipe(${recipe.id})">View Recipe</button>
            `;
  
            favoriteContainer.appendChild(recipeCard);
          });
        } else {
          favoriteContainer.innerHTML = "<p>No favorite recipes yet!</p>";
        }
  
        // Create pagination controls
        for (let i = 1; i <= totalPages; i++) {
          const pageItem = document.createElement("li");
          pageItem.className = "page-item";
          if (i === currentPages) pageItem.classList.add("active");
          pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        //   paginationContainer.appendChild(pageItem);
        }
      });
  }
  

// Function to change pages
function changePage(pageNumber) {
  currentPages = pageNumber;
  displayFavoriteRecipes();
}

// Initial call to display favorite recipes after the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  displayFavoriteRecipes();
});
