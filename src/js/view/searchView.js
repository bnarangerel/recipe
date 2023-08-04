import { elements } from "./base";

const renderRecipe = recipe =>{
    console.log(recipe.title);
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, page = 1, resPerPage = 10) => {
    //Хайлтын үр дүнг хуудаслаж үзүүлэх
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    //Хуудаслалтын товчуудыг гаргаж ирэх
    renderButtons(page, );
}
export const clearSearchQuery = () =>{
    elements.searchInput.value = "";
}
export const clearSearchResult = () =>{
    elements.searchResultList.innerHTML = "";
}