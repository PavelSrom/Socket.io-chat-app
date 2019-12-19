const app = require("express")()
const http = require("http")
const socketio = require("socket.io")
const server = http.createServer(app)
const io = socketio(server)

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./usersOnline")

io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) return callback(error)

    socket.join(user.room)

    socket.emit("message", { user: "admin", text: `${user.name}, welcome!` })
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` })

    io.to(user.room).emit("onlineUsers", getUsersInRoom(user.room))

    callback()
  })

  socket.on("sendMessage", (mes, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit("message", { user: user.name, text: mes })

    callback()
  })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`
      })

      io.to(user.room).emit("onlineUsers", getUsersInRoom(user.room))
    }
  })
})

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) =>
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"))
  )
}

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
