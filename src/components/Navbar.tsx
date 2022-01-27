import { Button, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { config } from "dotenv";
import { useState } from "react";
import { UserType } from "../utils/types/userType";
// import { RiArrowUpDownLine } from "react-icons/ri";

config();
const serverBaseURL = process.env.REACT_APP_API_BASE;

interface NavBarProps {
  loggedInUser: string;
  setLoggedInUser: (input: string) => void;
}

export function Navbar(props: NavBarProps): JSX.Element {
  const [usernameInput, setUsernameInput] = useState<string>("");

  const handleSignIn = async () => {
    try {
      console.log(
        `${usernameInput} just tried to login or signup, checking if new user...`
      );
      const usersResponse = await axios.get(`${serverBaseURL}users`);
      if (
        usersResponse.data.map((e: UserType) => e.name).includes(usernameInput)
      ) {
        //login the user, since they exist (not ideal method of authorisation but good enough for now)
        props.setLoggedInUser(usernameInput);
        console.log(`${usernameInput} was logged in`);
        setUsernameInput("");
      } else {
        //signup the user, then log them in
        await axios.post(`${serverBaseURL}users/${usernameInput}`);
        console.log(`${usernameInput} was signed up and logged in`);
        props.setLoggedInUser(usernameInput);
        setUsernameInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    props.setLoggedInUser("");
  };

  return (
    <div className="navbar">
      <h1 className="home-header">
        <span style={{ color: "#006400", fontSize: "1.5em" }}>Higher</span>
        <span style={{ color: "#8b0000", fontSize: "1.5em" }}>Lower</span>
        <span>&nbsp;</span>
        {/* <RiArrowUpDownLine /> */}
      </h1>
      {props.loggedInUser === "" ? (
        <div className="login-div">
          <TextField
            id="standard-name"
            label="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button onClick={() => handleSignIn()}>Login</Button>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
      ) : (
        <div className="logged-in-div">
          <Stack
            display="flex"
            spacing={2}
            direction="row"
            m={3}
            alignItems="center"
          >
            <AccountCircle className="logged-in-icon" />
            <h2>{props.loggedInUser}</h2>
            <Button variant="outlined" onClick={handleSignOut}>
              Sign out
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}
