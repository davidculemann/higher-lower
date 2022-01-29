import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import {
  Paper,
  Stack,
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
  toggleTimer: boolean;
  setToggleTimer: (input: boolean) => void;
}

export function HomeScreen(props: HomeScreenProps): JSX.Element {
  const [highscores, setHighscores] = useState<HighScoreType[] | null>(null);
  const [timetrialScores, setTimetrialScores] = useState<
    HighScoreType[] | null
  >(null);
  const [showTimetrialScores, setShowTimetrialScores] =
    useState<boolean>(false);

  useEffect(() => {
    const handleFetchHighscores = async () => {
      const highscoresResponse = await axios.get(`${serverBaseURL}scores`);
      setHighscores(highscoresResponse.data);
      const timetrialscoresResponse = await axios.get(
        `${serverBaseURL}scores/timetrial`
      );
      setTimetrialScores(timetrialscoresResponse.data);
    };
    handleFetchHighscores();
  }, []);

  return (
    <div className="home-screen">
      <div className="home-screen-left">
        <Box
          className="game-options"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <h2>Game settings:</h2>
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
          <FormControlLabel
            style={{ marginTop: 5 }}
            control={<Checkbox />}
            label="Time trial (30s)"
            checked={props.toggleTimer}
            onChange={(e) => props.setToggleTimer(!props.toggleTimer)}
          />
        </Box>

        <Box className="play-button">
          <Link to="/play">
            <Button variant="contained" style={{ fontSize: "25px" }}>
              Play
            </Button>
          </Link>
        </Box>
      </div>
      {highscores && (
        <div className="leaderboard">
          <Stack display="flex" spacing={4} direction="row" alignItems="center">
            <h2>Leaderboard </h2>
            <Button
              variant="contained"
              disabled={!showTimetrialScores}
              onClick={() => setShowTimetrialScores(false)}
            >
              Standard{" "}
            </Button>
            <Button
              variant="contained"
              disabled={showTimetrialScores}
              onClick={() => setShowTimetrialScores(true)}
            >
              Time trial
            </Button>
          </Stack>

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
                {!showTimetrialScores
                  ? highscores.map((score, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{score.name}</TableCell>
                        <TableCell align="center">{score.highscore}</TableCell>
                        <TableCell align="left">{score.category}</TableCell>
                      </TableRow>
                    ))
                  : timetrialScores?.map((score, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{score.name}</TableCell>
                        <TableCell align="center">{score.highscore}</TableCell>
                        <TableCell align="left">
                          {score.category.slice(0, score.category.length - 4) +
                            ")"}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          {showTimetrialScores ? (
            <p>showing top 10 time trial scores</p>
          ) : (
            <p>showing top 10 standard scores</p>
          )}
        </div>
      )}
    </div>
  );
}
