class UserDto{
    id;
    name;
    email

    constructor(model) {
        this.id = model._id; // mongoDB format (_id)
        this.name = model.name;
        this.email = model.email;
    }
}

export default UserDto;