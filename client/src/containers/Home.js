import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  TextField,
  Button,
  Typography,
  makeStyles
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  inner: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  heading: {
    textAlign: "center",
    padding: `${theme.spacing(3)}px 0`
  },
  input: {
    marginBottom: 40
  }
}))

const Home = () => {
  const [data, setData] = useState({
    name: "",
    room: ""
  })

  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value })

  const classes = useStyles()
  return (
    <div>
      <Container maxWidth="sm" className={classes.inner}>
        <Typography variant="h2" className={classes.heading}>
          Join the chat
        </Typography>
        <TextField
          className={classes.input}
          label="Name"
          value={data.name}
          name="name"
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          className={classes.input}
          label="Room"
          value={data.room}
          name="room"
          onChange={handleChange}
          variant="outlined"
        />

        <Button
          component={Link}
          to={`/chat?name=${data.name}&room=${data.room}`}
          disabled={!data.name || !data.room}
          variant="outlined"
          color="primary"
        >
          Join
        </Button>
      </Container>
    </div>
  )
}

export default Home
