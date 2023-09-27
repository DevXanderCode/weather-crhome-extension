import React from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
} from "@material-ui/core";
import "./options.css";

const App: React.FC<{}> = () => {
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" component="h2">
                Weather Extension Options
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField placeholder="Enter a home city name" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
