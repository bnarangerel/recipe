import axios from "axios";

export default class Search{
    constructor(querry){
        this.querry = querry;
    }
    async doSearch(){
        try{
            let result = await axios('https://forkify-api.herokuapp.com/api/search?q=' + this.querry);
            this.recipe = result.data.recipes;
            return this.recipe;
        } catch(error){
            alert("aldaa garlaa. " + error);
        }
    }
}