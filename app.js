const searchRecipes = document.querySelector("#searchRecipes")
// console.log(searchRecipes);
const searchRecipesButton = document.querySelector("#searchRecipesButton")
// console.log(searchRecipesButton);
const recipeUI = document.querySelector(".recipeUI")
// console.log(recipeUI);
const spinnerBorder = document.querySelector(".spinner-border")
// console.log(spinnerBorder);

const fetchRecipeData = (recipe) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe}`)
        .then((response) => response.json())
        .then((recipeData) => {
            console.log(recipeData.data.recipes)
            const getRecipeData = recipeData.data.recipes
            recipesSearchItemsList(getRecipeData)
        })
}

// fetchRecipeData("pizza")

const recipesSearchItemsList = (getRecipeData) => {

    console.log(getRecipeData);

    const setRecipeList = getRecipeData.map((recipeList) => {
        console.log(recipeList);
        const createUI = `<li class="recipeList">
                            <a class="d-flex align-items-center recipeLink" href="" onclick="wholeRecipe('${recipeList.id}')">
                                <img src="${recipeList.image_url}" alt="" class="recipeImage">
                                <div class="">
                                    <h4 class="recipeTitle mb-0">${recipeList.title}</h4>
                                    <p class="recipePublisher mb-0">${recipeList.publisher}</p>
                                </div>
                            </a>
                          </li>`
        return createUI
    })

    recipeUI.innerHTML = setRecipeList
}

const searchRecipeItem = () => {

    console.log(searchRecipes.value);

    // spinnerBorder.classList.remove("hidden");

    // function loading () {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             spinnerBorder.classList.remove("hidden")
    //             console.log("kaam 1");
    //             resolve()
    //         }, 1000)
    //     })
    // }

    // function viewData () {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             spinnerBorder.classList.add("hidden")
    //             console.log("kaam 2");
    //             resolve()
    //         }, 500)
    //     })
    // }

    // async function done() {

    //     await loading()

    //     await viewData()


    //     console.log(`All work Done`);
    // }

    // done()

    fetchRecipeData(searchRecipes.value)

    searchRecipes.value = ""

}

searchRecipesButton.addEventListener("click", searchRecipeItem);