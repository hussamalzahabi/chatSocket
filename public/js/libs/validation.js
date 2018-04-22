const parseData = (data) => {

    let queryString = {};
    let result = data.replace(new RegExp(/([^&?=]+)(=([^#&]*))?/,"g"),function ($0,$1,$2,$3) {
           queryString[$1] = decodeURIComponent($3.replace(/\+/,""));
    });

    return queryString;


};

const isRealString = (text) =>{
    return typeof (text) === "string" && text.trim().length > 1;
};




module.exports = {parseData};