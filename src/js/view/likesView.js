import { elements } from "./base";

export const toggleLikeBtn = isLiked =>{
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector(".recipe__love use").setAttribute('href', `img/icons.svg#${iconString}`);
};
export const toggleLikeMenu = numLikes =>{
    elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
}
export const renderLike = newlike =>{
    const html = `
    <li>
        <a class="likes__link" href="#${newlike.id}">
            <figure class="likes__fig">
                <img src="${newlike.img}" alt="${newlike.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${newlike.title}</h4>
                <p class="likes__author">${newlike.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.likesList.insertAdjacentHTML('beforeend', html);
};
export const deleteLike = id => {
    let like = document.querySelector(`a.likes__link[href="#${id}"]`).parentElement;
    if(like){
        like.parentElement.removeChild(like);
    } else console.log('like hiisen element oldsongui')
};