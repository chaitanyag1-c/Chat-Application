const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('sms_notification.mp3')

const append = (message, position)=>{   //jo naya join hoga uski notification aaegi in the form of message
    const messageElement = document.createElement('div');  
    messageElement.innerText = message;
    messageElement.classList.add('message'); //show message 
    messageElement.classList.add(position);  // show new user's position(left,right)
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})
 const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)  // new name will be accepted and executed by socket.on and will be displayed

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right')
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'left')
})