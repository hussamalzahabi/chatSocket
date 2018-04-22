let socket = io(),
    msgForm = document.querySelector("#Messenger"),
    locationButton = document.querySelector("button[name='location']"),
    userRoomList = [];
;

let scrollBottom = () => {
    let messages = document.querySelector("header"),
        msgLast = document.querySelector("header ol li").clientHeight;
    let scrollTop = messages.scrollTop,
        clientHeight = messages.clientHeight,
        scrollHeight = messages.scrollHeight;

    if (scrollTop + clientHeight + 2 * msgLast >= scrollHeight) {
        messages.scrollTop = scrollHeight;

    }
};


socket.on("connect", () => {
    console.log("Connect to server");
    let params = parseData(window.location.search);

    socket.emit("join",params,(error)=>{

        if (error) {
            alert(error)
            window.location.href = "/";
            return ;
        }
        else {
            console.log("there is no error")

        }
    })

});

socket.on("updateUserList",(data)=>{

    let userList = document.querySelector("div#users");
    let ol = document.createElement("ol");
    let frag = document.createDocumentFragment();

    data.forEach((user)=>{

        let li = document.createElement("li");
        let text = document.createTextNode(user);

        li.appendChild(text);
        ol.appendChild(li);

    });

    userList.innerHTML = `<ol>${ol.innerHTML}</ol>`;


});


socket.on("newMessage", (data) => {

    let messages = document.querySelector("#msgs"),
        time = moment(data.createdAt).format("h:mm a");

    let template = document.querySelector("#msg-tmp").innerHTML,
        render = Mustache.render(template, {
            welcome: "Welcome to my chat",
            from: data.from,
            text: data.text,
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
        render = Mustache.render(template, {
            from: data.from,
            url: data.url,
            createdAt: time,
        });


    messages.innerHTML += render;
    scrollBottom();

});

msgForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let text = document.querySelector("#Messenger input[name='msg']");
    socket.emit("createMessage", {text: text.value}, () => {
        text.value = "";
    });


});


locationButton.addEventListener("click", function () {

    locationButton.setAttribute("disabled", "disabled");
    locationButton.innerText = "Get the location ....";

    if (!navigator.geolocation) {
        alert("Unfortunately your password dosn't support geolocation feature !!")
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit("createLocationMessage", {
            longitude: position.coords.longitude, latitude: position.coords.latitude
        })
        locationButton.removeAttribute("disabled");
        locationButton.innerText = "Location"

    }, () => {
        alert("Unable to fetch data : geolocation")
    });
});


socket.on("disconnect", () => {
    console.log("disconnecting from server")
});