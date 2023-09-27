import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import "./options.css";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";

type FormStateType = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormStateType>("ready");

  const isFieldsDisabled = formState === "saving";

  const handleHomeCityChange = (homeCity: string) => {
    setOptions((prevOptions) => ({ ...prevOptions, homeCity }));
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");
    setStoredOptions(options).finally(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  useEffect(() => {
    getStoredOptions().then((storedOptions) => {
      setOptions(storedOptions);
    });
  }, []);

  if (!options) {
    return null;
  }
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4" component="h2">
                Weather Extension Options
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                placeholder="Enter a home city name"
                value={options?.homeCity}
                onChange={(e) => handleHomeCityChange(e?.target?.value)}
                disabled={isFieldsDisabled}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldsDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
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
