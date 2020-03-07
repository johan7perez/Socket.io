const socket = io();

//DOM elements
const output = document.getElementById('output');
const userName = document.getElementById('user-name');
const buttonSend = document.getElementById('send');
const message = document.getElementById('message');
const actions = document.getElementById('actions');

//Sending new messages
buttonSend.addEventListener('click', () => {
    socket.emit('new:message', {
        userName : userName.value,
        message : message.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('action:typing', userName.value);
});

//Listening for new messages
socket.on('chat:message', (data) => {
    actions.innerText = '';
    output.innerHTML += `<p>
        <strong>${data.userName}</strong>:
        <p>${data.message}</p>
    </p>`
});

socket.on('action:typing', (data) => {
    actions.innerText = `${data} is typing!`;
});

