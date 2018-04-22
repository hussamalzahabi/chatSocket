const moment = require("moment");
const createMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
},
createLocationMessage = (from,longitude,latitude)=>{
    return {
        from,
        url:`https://www.google.ca/maps/@${longitude},${latitude},14z?hl=en`,
        createdAt: moment().valueOf()
    }
};


module.exports = {createMessage,createLocationMessage};