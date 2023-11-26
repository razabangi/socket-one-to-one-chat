const socket = io();

let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

let name;
do {
    name = prompt('Please enter your name');
} while (!name)

textarea.addEventListener('keyup', function (e) {
    if (e.key == "Enter") {
        sendMessage(e.target.value);
    }
});


function sendMessage (message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    textarea.value = '';

    // append message
    appendMessage(msg, 'outgoing');
    socket.emit('send-message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv);
}


// Receive Message
socket.on('send-message', function (msg) {
    appendMessage(msg, 'incoming')
});
