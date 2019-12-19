import React, { useState, useEffect } from "react"
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core"
import queryString from "query-string"
import io from "socket.io-client"

import Messages from "../components/Messages"
import InputBar from "../components/InputBar"

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const endpoint = "192.168.0.102:5000"

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(endpoint)

    setName(name)
    setRoom(room)

    socket.emit("join", { name, room }, err => {
      if (err) alert(err)
    })

    // if the return is here,
    // it re-renders way too many times. why ??
  }, [location.search, endpoint])

  useEffect(() => {
    socket.on("message", mes => {
      setMessages([...messages, mes])
    })

    socket.on("onlineUsers", users => {
      setUsers(users)
    })

    // the return must be in this useEffect
    // otherwise it re-renders increasingly too many times
    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [messages, users])

  const sendMessage = e => {
    e.preventDefault()

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("")
      })
    }
  }

  const divStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#fff"
  }

  return (
    <Container maxWidth="sm" style={{ height: "100vh" }}>
      <div style={divStyle}>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Room {room}</Typography>
            <Typography variant="body1">{users.length} users online</Typography>
          </Toolbar>
        </AppBar>

        <Messages messages={messages} name={name} />

        <InputBar
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </Container>
  )
}

export default Chat
