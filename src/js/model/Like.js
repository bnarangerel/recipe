export default class Likes{
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.likes) this.likes = [];
    }
    addLike(id, title, publisher, img){
        const like = {id, title, publisher, img};
        this.likes.push(like);
        //storage ruu hadgalna
        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id){
        //id gedeg idtei like-n indexiig array-s haij oloh
        const index = this.likes.findIndex(el => el.id === id);
        //ug index deerh elementiig massivaas ustgana
        this.likes.splice(index, 1);
        //storage ruu hadgalna
        this.saveDataToLocalStorage();
    }
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumberOfLikes(){
        return this.likes.length;
    }
    saveDataToLocalStorage(){
        localStorage.setItem("likes", JSON.stringify(this.likes));
        console.log(localStorage);
    }
    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
}