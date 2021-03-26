const users = [];

//подключение юзера в чат
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

//получение текущего пользователя
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//юзер покидает чат
function userLeave(id){
  const index = users.findIndex(user => user.id === id)

  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

//определяем комнату пользователей
function getRoomUsers(room) {
  return users.filter(user => user.room === room)
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };
