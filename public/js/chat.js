let socket = io() ,
    msgForm = document.querySelector("#Messenger") ,
    locationButton = document.querySelector("button[name='location']")
;

let scrollBottom = () => {
    let messages = document.querySelector("header"),
        msgLast = document.querySelector("header ol li").clientHeight;
    let scrollTop = messages.scrollTop ,
        clientHeight = messages.clientHeight ,
        scrollHeight = messages.scrollHeight;

    if (scrollTop + clientHeight + 2 * msgLast >= scrollHeight){
        messages.scrollTop = scrollHeight;

    }
}


socket.on("connect", () => {
    console.log("Connect to server");
    socket.on("newMessage", (data) => {

        let messages = document.querySelector("#msgs"),
            time = moment(data.createdAt).format("h:mm a");

        let template = document.querySelector("#msg-tmp").innerHTML,
            render = Mustache.render(template,{
                welcome:"Welcome to my chat",
                from:data.from,
                text:data.text,
                createdAt: time
            });


        messages.innerHTML += render;

/*        let li = document.createElement("li"),
            text = document.createTextNode(`${data.from} ${time}: ${data.text}`);

        li.appendChild(text);
        messages.appendChild(li);*/
      scrollBottom();
    });

    socket.on("newLocationMessage", (data) => {
        let messages = document.querySelector("#msgs"),
            time = moment(data.createdAt).format("h:mm a");

        let template = document.querySelector("#msglocation-tmp").innerHTML,
            render = Mustache.render(template,{
                from:data.from,
                url:data.url,
                createdAt: time,
            });


        messages.innerHTML += render;
        scrollBottom();

    });

    msgForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let text = document.querySelector("#Messenger input[name='msg']");
        socket.emit("createMessage",{from:"User",text:text.value},()=>{
            text.value = "";
        });


    });



    locationButton.addEventListener("click",function () {

        locationButton.setAttribute("disabled","disabled");
        locationButton.innerText = "Get the location ....";

        if (!navigator.geolocation){
            alert("Unfortunately your password dosn't support geolocation feature !!")
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit("createLocationMessage",{from:"User",
                longitude:position.coords.longitude,latitude:position.coords.latitude})
             locationButton.removeAttribute("disabled");
            locationButton.innerText = "Location"

        },()=>{
            alert("Unable to fetch data : geolocation")
        });
    });

});



socket.on("disconnect", () => {
    console.log("disconnecting from server")
});