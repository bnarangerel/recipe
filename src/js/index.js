require("@babel/polyfill");
import Search from "./model/Search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";
import { renderLoader, clearLoader} from "./view/base";
import Recipe from './model/Recipe';
import {renderRecipe, clearRecipe, highlightSelectedRecipe} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';
import Likes from "./model/Like";
import * as likesView from "./view/likesView";

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкалсан жорууд
 * - Захиалж байгаа жорын найрлага
 */
const state = {};

//Хайлтын контроллер = Model ===> Controllerr <== View
const controlSearch = async() =>{
    //1. Webс хайлтын түлхүүр үгийг гаргаж авна
    const query = searchView.getInput();
    if(query){
        //2. Шинээр хайлтын obj үүсгэж өгнө.
        state.search = new Search(query);

        //3. Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult ();
        renderLoader(elements.searchResultDiv);

        //4. Хайлтыг гүйцэтгэнэ.
        await state.search.doSearch();

        //5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        console.log('garjinu'+state.search.result);
        clearLoader();

        // if (state.search.reault === undefined) alert("Хайлтаар илэрсэнгүй.");
        // else searchView.renderRecipes(state.search.result);
        if(state.search.recipe === undefined) alert('Илэрц олдсонгүй.');
        else searchView.renderRecipes(state.search.recipe);
    }
}
 elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
 });
elements.pageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const gotoPageNumber = parseInt(btn.dataset.goto);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.recipe, gotoPageNumber);
    }
 });
 //Жорын контроллер
 const controlRecipe = async() => {
    //1. URL-с ID-ийг салгаж авна
    const id = window.location.hash.replace("#", "");
    if(!state.likes) state.likes = new Likes();
    if(id) {
        //2. Жорын моделийг үүсгэнэ
        state.recipe = new Recipe(id);

        //3. UI дэлгэцийг бэлтгэнэ
        clearRecipe();
        renderLoader(elements.recipeDiv);
        highlightSelectedRecipe(id);

        //4. Жороо татаж авчрана
        await state.recipe.getRecipe();

        //5. Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcHuniiToo()
        //6. Жороо дэлгэцэнд гаргана
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }
}
//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));
window.addEventListener("load", e => {
    //1. Like-n modeliig uusgene
    if(!state.likes) state.likes = new Likes();
    //like tsesiig gargah esehiig shalgah
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
    //like-uud baival tsesend haruulna
    state.likes.likes.forEach(like => likesView.renderLike(like));
});
/**
 * Найрлаганы контроллер
 */
const controlList = () =>{
    //1. Найрлаганы моделийг үүсгэнэ
    state.list = new List();
    //Өмнө харагдаж байсан найрлагын мэдээллийг дэлгэцээс цэвэрлэх
    listView.clearItems();
    //2. Уг модел рүү одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
    state.recipe.ingredients.forEach(n => {
        //Тухайн найрлагыг модел рүү хийнэ
        const item = state.list.addItem(n);

        //Тухайн найрлагыг дэлгэцэнд гаргана
        listView.renderItem(item);
    });
};
/**
 * Like controller
 */
const controlLike = () =>{
    //2. Odoo haragdaj baigaa joriin id-g olj avah
    const currentRecipeId = state.recipe.id;

    //3. Ene joriig likelsan esehiig shalgah
    if(state.likes.isLiked(currentRecipeId)){
        //Like tovcnii likelsan baidliig boliulah
        likesView.toggleLikeBtn(false);
        //like-n tsesnees ustgana
        likesView.deleteLike(currentRecipeId);
        //Likelsan bol like-g boliulah
        state.likes.deleteLike(currentRecipeId);
        
    } else {
        //Likelaagui bol likeluulah
        let newlike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        //Like tsesend ene like-g oruulah
        likesView.renderLike(newlike);
        //like tovciig haruulah heseg
        likesView.toggleLikeBtn(true);
    }
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};
elements.recipeDiv.addEventListener('click', e=> {
    if(e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();

    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
})
elements.shoppingList.addEventListener('click', e => {
    //click hiisen li el-iin data-itemid atributiig shuuj gargaj avah
    const id = e.target.closest(".shopping__item").dataset.itemid;

    //oldson idtei ortsiig modeloos ustgana
    state.list.deleteItem(id);
    //delgetsees iim idtai elementiig ustgana
    listView.deleteItem(id);
})