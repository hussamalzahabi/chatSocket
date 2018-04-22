const expect = require("expect");
const {Users} = require("./Users");

describe("Users management", () => {

    let users;

    beforeEach(() => {
        users = new Users();

        users.users = ([{id: 1, name: "hussam", room: "math"},
            {id: 2, name: "layth", room: "physics"},
            {id: 3, name: "khalid", room: "math"}]);

    });

    it("Should add new user", () => {

        let users = new Users(), user = [{id: 1, name: "hussam", room: "math"}];
        users.addUser(user[0].id, user[0].name, user[0].room);
        expect(users.users).toEqual(user);



    })

    it("Should remove user", () => {

        let id = 1;

        let remove = users.removeUser(id);
        expect(users.users).not.toEqual(
            expect.objectContaining(remove)
        );

    })


    it("Should not remove user", () => {

        let id = 4;

        let remove = users.removeUser(id);

        expect(remove.length).toBe(0)

    })


    it("Should get a user", () => {

       let id = 1;

       let user = users.getUser(id);

       expect(user).toMatchObject(users.users.filter(user => user.id === id))

    })

    it("Should not get a user", () => {

        let id = 4;

        let user = users.getUser(id);

        expect(user.length).toBe(0)

    })

    it("Should fetch a room users list", () => {

        let userList = users.getUserList("math");

        expect(userList).toEqual(["hussam","khalid"])

    })



});