const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

//получение имени и комнаты из url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// console.log(username, room);
const socket = io();

//Вход в чатрум
socket.emit("joinRoom", { username, room });

//запрос юзеров и комнату
socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room)
  outputUsers(users)
})

//сообщение с сервера
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  //скролл чата до низа
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//  отправка сообщения
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //получаем текст сообщения
  let msg = e.target.elements.msg.value;
  msg = msg.trim()
  if (!msg) {return false}

  //отправляем сообщение на сервер
  socket.emit("chatMessage", msg);

  //Отчистка инпута для сообщения
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//исходящее сообщение добавляем в  DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

//Добавляем комнату в DOM
function outputRoomName(room) {
  roomName.innerText = room
}

//Добавляем юзеров в DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//предупреждение о выходе из чата
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
