import React, { FC, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import Lal from "./pages/Lal";
import Lilvo from "./pages/Lilvo";

const App: FC = () => {
  const [value, setValue] = React.useState("lal");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Container
      sx={{
      // backgroundImage: "url('/image.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      // color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
      Quick Calc
      </Typography>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
      <FormControl>
        <RadioGroup
        row
        aria-labelledby="action-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        >
        <FormControlLabel value="lal" control={<Radio />} label="Lal" />
        <FormControlLabel value="lilvo" control={<Radio />} label="Lilvo" />
        </RadioGroup>
      </FormControl>
      </Box>
      {value === "lal" ? <Lal /> : <Lilvo />}
    </Container>
  );
};

export default App;
