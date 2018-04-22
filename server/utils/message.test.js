const expect = require("expect");
const {createMessage,createLocationMessage} = require("./message");


describe("generate message",()=>{

    it("Should generate a message object correctly",()=>{

        let from = "hussam",
            text = "i love u";
        let msgObject = createMessage(from,text);

        expect(msgObject.from).toBe(from);
        expect(msgObject.text).toBe(text);
        expect(typeof msgObject.createdAt).toBe("number");

    });

    it("Should generate a location message object correctly",()=>{

        let from = "User",
            latitude = "44.2346673",
            longitude = "-76.5809699",
            url = `https://www.google.ca/maps/@${longitude},${latitude},14z?hl=en`;
        let msgObject = createLocationMessage(from,longitude,latitude);

        expect(msgObject.from).toBe(from);
        expect(msgObject.url).toBe(url);


    });

});