
class Users{

    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        var room = room.toLowerCase();
        let user = {id,name,room};

        if (this.checkUserExsist(name,room) === false) {
            this.users.push(user);
            return;
        }


        return user;
    }

    removeUser(id){
        let removedUsers = this.getUser(id);
        this.users = this.users.filter(user=>user.id !== id);
        return removedUsers;
    }

    getUser(id){
        return this.users.filter(user=>user.id === id);
    }

    getUserList(room){
        let users = this.users.filter(user=>user.room === room);
        let names = users.map(user => user.name);

        return names;

    }

    getUserRoom(){
        let roomes = this.users.map(user => user.room);

        var unique = roomes.filter((v, i, a) => a.indexOf(v) === i);

        return unique;

    }

    checkUserExsist(name,room){
        let users = this.getUserList(room);
        let userCount = users.filter(n=>n === name);
        return userCount.length >= 1;
    }

}

module.exports = {Users};