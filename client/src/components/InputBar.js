import React from "react"
import { TextField, Button } from "@material-ui/core"

const bottom = {
  background: "#ccc",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "70px !important",
  padding: "8px 0"
}

const InputBar = ({ message, setMessage, sendMessage }) => {
  return (
    <form style={bottom} onSubmit={sendMessage}>
      <TextField
        variant="outlined"
        label="Type a message..."
        style={{ flexGrow: 1 }}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={sendMessage}
        style={{ marginLeft: 20, alignSelf: "stretch" }}
      >
        Send
      </Button>
    </form>
  )
}

export default InputBar
