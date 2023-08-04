require("@babel/polyfill");
import Search from "./model/Search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";
import { renderLoader, clearLoader} from "./view/base";

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкалсан жорууд
 * - Захиалж байгаа жорын найрлага
 */
const state = {};
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
