import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { config } from "dotenv";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HighScoreType } from "../utils/types/highScoreType";

config();
const serverBaseURL = process.env.REACT_APP_API_BASE;

interface HomeScreenProps {
  category: string;
  setCategory: (input: string) => void;
}

export function HomeScreen(props: HomeScreenProps): JSX.Element {
  const [highscores, setHighscores] = useState<HighScoreType[] | null>(null);

  useEffect(() => {
    const handleFetchHighscores = async () => {
      const highscoresResponse = await axios.get(`${serverBaseURL}scores`);
      setHighscores(highscoresResponse.data);
    };
    handleFetchHighscores();
  }, []);

  return (
    <div className="home-screen">
      <div className="home-screen-left">
        <Box className="game-options">
          <h2>Game category:</h2>
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">
            Game category
          </FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={props.category}
              onChange={(e) => props.setCategory(e.target.value)}
              name="radio-buttons-group"
            >
              <FormControlLabel value="area" control={<Radio />} label="Area" />
              <FormControlLabel
                value="population"
                control={<Radio />}
                label="Population"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className="play-button">
          <Link to="/play">
            <Button
              variant="contained"
              style={{ fontSize: "25px" }}
              onClick={() => console.log(props.category)}
            >
              Play
            </Button>
          </Link>
        </Box>
      </div>
      {highscores && (
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 500, maxWidth: 600 }}
          >
            <Table
              sx={{ minWidth: 500, maxWidth: 600 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#aad" }}>
                  <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>
                    Rank
                  </TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: "bold" }}>
                    Username
                  </TableCell>
                  <TableCell
                    style={{ fontSize: 16, fontWeight: "bold" }}
                    align="center"
                  >
                    Score
                  </TableCell>
                  <TableCell
                    style={{ fontSize: 16, fontWeight: "bold" }}
                    align="left"
                  >
                    Category
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {highscores.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{score.name}</TableCell>
                    <TableCell align="center">{score.highscore}</TableCell>
                    <TableCell align="left">{score.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
