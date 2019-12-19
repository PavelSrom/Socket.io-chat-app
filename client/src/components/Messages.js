import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { Typography } from "@material-ui/core"

import "./Messages.css"

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      <div style={{ padding: "0 10px" }}>
        {messages.map((message, index) =>
          name === message.user ? (
            <div key={index} style={{ textAlign: "right", marginBottom: 16 }}>
              <Typography variant="overline">You</Typography>
              <Typography variant="body1">{message.text}</Typography>
            </div>
          ) : (
            <div key={index} style={{ marginBottom: 16 }}>
              <Typography variant="overline">{message.user}</Typography>
              <Typography variant="body1">{message.text}</Typography>
            </div>
          )
        )}
      </div>
    </ScrollToBottom>
  )
}

export default Messages
