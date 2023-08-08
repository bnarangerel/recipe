import uniqid from 'uniqid';

export default class List{
    constructor (){
        this.items = [];
    }
    addItem(item){
        let newItem = {
            id: uniqid(),
            item: item //esvel item gecij c bolnoo
        };
        this.items.push(newItem);
        return newItem;
    }
    deleteItem(id){
        //id gedeg idtei ortsiin indexiig array-s haij oloh
        const index = this.items.findIndex(el => el.id === id);
        //ug index deerh elementiig massivaas ustgana
        this.items.splice(index, 1);
    }
}