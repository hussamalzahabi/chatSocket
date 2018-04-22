const expect = require("expect");
const {isRealString} = require("../../public/js/libs/validation");
describe("Validation",()=>{


    it("Should reject a none-string value",()=>{

        let value = 321321;

        expect(isRealString(value)).toBe(false)


    });

    it("Should reject a string with only spaces",()=>{

        let value = "   ";

        expect(isRealString(value)).toBe(false)


    });

    it("Should allow a string with no spaces",()=>{

        let value = "hussam";

        expect(isRealString(value)).toBe(true)


    });
});