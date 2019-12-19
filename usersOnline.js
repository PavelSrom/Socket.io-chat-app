const users = []

const addUser = ({ id, name, room }) => {
  const userAlreadyExists = users.find(
    user => user.name === name && user.room === room
  )
  if (userAlreadyExists) return { error: "User already exists" }

  const user = { id, name, room }
  users.push(user)

  return { user }
}

const removeUser = id => {
  const targetIndex = users.findIndex(user => user.id === id)

  if (targetIndex !== -1) return users.splice(targetIndex, 1)[0]
}

const getUser = id => users.find(user => user.id === id)

const getUsersInRoom = room => users.filter(user => user.room === room)

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}
