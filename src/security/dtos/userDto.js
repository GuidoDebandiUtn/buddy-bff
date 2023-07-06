export class UserDto{
    constructor(mail, userName){
        this.mail = mail;
        this.userName = userName;
    }
}

export class CreateUserDto{
    constructor(mail, userName, name, lastName, createdDate){
        this.mail = mail;
        this.userName = userName;
        this.name = name;
        this.lastName = lastName;
        this.createdDate = createdDate;
    }
}

export class UpdateUserDto{
    constructor(userName, name, lastName, updatedDate){
        this.userName = userName;
        this.name = name;
        this.lastName = lastName;
        this.updatedDate = updatedDate;
    }
}

