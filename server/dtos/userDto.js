module.exports = class UserDto {
    email;
    id;
    is_activated;
    name;
    surname;
    phone;
    team_id;
    role_id;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.is_activated = model.is_activated;
        this.name = model.name;
        this.surname = model.surname;
        this.phone = model.phone;
        this.team_id = model.team_id;
        this.role_id = model.role_id;
    }
}