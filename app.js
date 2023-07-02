// ================Start Get Variables From HTML===========>>>>>>>>>>>

const searchRecipes = document.querySelector("#searchRecipes")
// console.log(searchRecipes);
const searchRecipesButton = document.querySelector("#searchRecipesButton")
// console.log(searchRecipesButton);
const recipeUI = document.querySelector(".recipeUI")
// console.log(recipeUI);
const spinnerBorder = document.querySelector(".spinner-border")
// console.log(spinnerBorder);
const recipeDetail = document.querySelector(".recipeDetail")
// console.log(recipeDetail);
const recipeServing = document.querySelector(".recipeServing")
// console.log(recipeServing);


// ================End Get Variables From HTML===========>>>>>>>>>>>


// ================Start Fetching Data From API===========>>>>>>>>>>>

const fetchRecipeData = (recipes) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipes}`)
        .then((response) => {
            if (!response == "ok") {
                return console.log("Some fault in this API");
            }
            // console.log(response);
            return response.json()
        })
        .then((recipeData) => {
            console.log(recipeData.data.recipes.length)
            if (recipeData.data.recipes.length === 0) {
                return recipeUI.innerHTML = `<h2 class="text-center mt-5">No recipes found for your query! <br> Please try again ;)</h2>`
            } else {
                const getRecipeData = recipeData.data.recipes
                recipesSearchItemsList(getRecipeData)
            }
        })
}

// fetchRecipeData("pizza")

const fetchSingleRecipe = (recipeID) => {

    // console.log(recipeID);

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`)
        .then((response2) => {
            if (!response2 == "ok") {
                return console.log("Some fault in this API");
            }

            // console.log(response2);

            return response2.json();
        })
        .then((getSingleRecipeData) => {
            // console.log(getSingleRecipeData);
            singleRecipePreperationMethod(getSingleRecipeData);
        })
}


// ================End Fetching Data From API===========>>>>>>>>>>>


// ================Start Creating Functions===========>>>>>>>>>>>

const recipesSearchItemsList = (getRecipeData) => {

    // console.log(getRecipeData);

    const setRecipeList = getRecipeData.map((recipeList) => {
        // console.log(recipeList);
        const createUI = `<li class="recipeList">
                            <a class="d-flex align-items-center recipeLink" onclick="fetchSingleRecipe('${recipeList.id}')">
                                <img src="${recipeList.image_url}" alt="" class="recipeImage">
                                <div class="">
                                    <h4 class="recipeTitle mb-0">${recipeList.title}</h4>
                                    <p class="recipePublisher mb-0">${recipeList.publisher}</p>
                                </div>
                            </a>
                         </li>`

        // console.log(recipeList.id);
        return createUI
    })

    const dataCreateUI = setRecipeList.join("")

    recipeUI.innerHTML = dataCreateUI
}


const singleRecipePreperationMethod = (getSingleRecipeData) => {
    // console.log(getSingleRecipeData.data.recipe);

    const getSingleRecipeList = getSingleRecipeData.data.recipe
    // console.log(getSingleRecipeList);

    const recipeIngrediantsList = `<div class="recipeDetailTop">
                                        <div class="recipeImgTitle">
                                            <img src="${getSingleRecipeList.image_url}" alt="">
                                            <h2>
                                            ${getSingleRecipeList.title}
                                            </h2>
                                        </div>
                                        <div class="recipeServingTimeBookmark">
                                            <div class="recipeServingTime">
                                                <div class="d-flex align-items-center p-1">
                                                    <i class="fa-regular fa-clock fontColor fs-3"></i>
                                                    <p class="mb-0 ms-2">
                                                        <span class="fw-bold">
                                                        ${getSingleRecipeList.cooking_time}
                                                        </span>
                                                        MINUTES
                                                    </p>
                                                </div>
                                                <div class="d-flex align-items-center p-1">
                                                    <i class="fa-solid fa-user-group fontColor fs-3"></i>
                                                    <p class="mb-0 ms-2">
                                                        <span class="fw-bold">
                                                        ${getSingleRecipeList.servings}
                                                        </span>
                                                        SERVINGS
                                                    </p>
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-minus borderColor fontColor rounded-circle p-1"></i>
                                                    <i class="fa-solid fa-plus borderColor fontColor rounded-circle p-1"></i>
                                                </div>
                                            </div>
                                            <div class="recipeBookmark">
                                                <i class="fa-regular fa-bookmark p-3 rounded-circle fs-3"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-5 recipeIngredients">
                                        <h3 class="text-center text-uppercase fontColor">
                                            Recipe Ingredients
                                        </h3>
                                        <ul class="recipeServing ps-0 mb-0 mt-4">
                                            ${ingrediantsOfRecipe(getSingleRecipeList.ingredients)}
                                        </ul>
                                    </div>
                                    <div class="recipeAddress mt-5 d-flex flex-column align-items-center">
                                        <h3 class="fontColor text-center text-uppercase">
                                            how to cook it
                                        </h3>
                                        <p class="mt-4 text-center fs-5 px-5 text-secondary">
                                            This recipe was carefully designed and tested by <span class="fw-bold">${getSingleRecipeList.publisher}</span> Please check out directions at their website.
                                        </p>
                                        <a href="${getSingleRecipeList.source_url}" target="_blank" class="btn button rounded-pill  mt-4 mb-5 fs-4 text-uppercase"
                                        style="width: 35%; color: #ffffff; padding: 10px;">
                                            directions
                                            <i class="fa-solid fa-right-long ms-3"></i>
                                        </a>
                                    </div>`


    recipeDetail.innerHTML = recipeIngrediantsList;

    increaseServing(recipeIngrediantsList)
}


const ingrediantsOfRecipe = (getIngrediants) => {
    // console.log(getIngrediants);

    const ingrediantsList = getIngrediants.map((objectList) => {
        // console.log(objectList);

        const ingrediantsObjList = `<li class="recipeServingList">
                                        <i class="fa-solid fa-check fontColor mt-1"></i>
                                        <span class="recipeQuantity">
                                            ${objectList.quantity}
                                        </span>
                                        <div class="recipeDescription">
                                            <span>
                                                ${objectList.unit}
                                            </span>
                                            ${objectList.description}
                                        </div>
                                    </li>`
        return ingrediantsObjList;
    })

    return ingrediantsList.join("")

}


const increaseServing = (recipeIngrediantsList) => {
    console.log(recipeIngrediantsList);
    let a = String(recipeIngrediantsList)
    console.log(a);
}


const decreaseServing = () => {

}


// ================End Creating Functions===========>>>>>>>>>>>


// ================Start Searching Function===========>>>>>>>>>>>

const searchRecipeItem = () => {
    
    // console.log(searchRecipes.value);
    
    fetchRecipeData(searchRecipes.value)
    
    recipeUI.classList.add("scrolling");
    
    searchRecipes.value = ""
    
}


// ================End Searching Function===========>>>>>>>>>>>


// ================Start AddEventListner===========>>>>>>>>>>>

searchRecipesButton.addEventListener("click", searchRecipeItem);


// ================End AddEventListner===========>>>>>>>>>>>