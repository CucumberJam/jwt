class ItemDto{
    id;
    title;
    text;
    user;

        constructor(model) {
        this.id = model._id; // mongoDB format (_id)
        this.title = model.title;
        this.text = model.text;
        this.user = model.user;
    }
}

export default ItemDto;