const fetchRecipeData = (recipe) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe}`)
        .then((response) => response.json())
        .then((recipeData) => console.log(recipeData.data.recipes))
}

fetchRecipeData("pizza")