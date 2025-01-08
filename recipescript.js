


const recipesPerPage = 3; // Number of recipes per page
let currentPage = 1;

document.getElementById('recipeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const recipe = { name: recipeName, ingredients, instructions };

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    document.getElementById('recipeForm').reset();
    displayRecipes();
});

// Function to display recipes with pagination
function displayRecipes() {
    const recipeList = document.getElementById('recipeList');
    const pagination = document.getElementById('pagination');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Pagination logic
    const totalRecipes = recipes.length;
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const paginatedRecipes = recipes.slice(startIndex, endIndex);

    // Clear existing content
    recipeList.innerHTML = '';
    pagination.innerHTML = '';

    // Display paginated recipes
    paginatedRecipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-item');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
            <button class="btn btn-primary" onclick="printRecipe(${startIndex + index})">Print Recipe</button>
        `;
        recipeList.appendChild(recipeDiv);
    });

    // Generate pagination controls
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) pageItem.classList.add('active');
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }
}

// Function to handle page change
function changePage(pageNumber) {
    currentPage = pageNumber;
    displayRecipes();
}

// Function to print the recipe
function printRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes[index];

    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Recipe</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h3 { color: #333; }
                </style>
            </head>
            <body>
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
                <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
                <button onclick="window.print()">Print</button>
            </body>
        </html>
    `);
    printWindow.document.close();
}

// Load recipes when the page is loaded
window.onload = displayRecipes;
