import { Button, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";

export function Navbar(): JSX.Element {
  const [user, setUser] = useState<string>("");

  const handleLogin = () => {
    console.log(`${user} just tried to login`);
  };

  return (
    <div className="navbar">
      <h1 className="home-header">
        Higher Lower<span>&nbsp;</span>
        <RiArrowUpDownLine />
      </h1>
      <div className="login-div">
        <TextField
          id="standard-name"
          label="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button onClick={() => handleLogin()}>Login/Signup</Button>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}
