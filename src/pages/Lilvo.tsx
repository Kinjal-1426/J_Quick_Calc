import React, { FC, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputAdornment,
  Stack,
  Divider,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

const Lilvo : React.FC = () => {
    const [fol, setFol] = useState(0);
    const [khakhri, setKhakhri] = useState(0);
    const [dakhri, setDakhri] = useState(0);
    const [jeran, setJeran] = useState(0);
    const [total, setTotal] = useState(0);
    const [bardan, setBardan] = useState(0);
    const [dal, setDal] = useState(0);
    const [rate, setRate] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [payment, setPayment] = useState(0);
    const [vatav, setVatav] = useState(0);
    const [paid, setPaid] = useState(0);
  
    const totalWeight = () => {
      const total = fol + khakhri + dakhri + jeran;
      setTotal(total);
    };
  
    const calculatePayment = () => {
      const bWeight = total - bardan;
      const dWeight = bWeight - dal;
      const value = dWeight * rate;
      const totalPayment = value - (percentage * value) / 100;
  
      setPayment(totalPayment);
    };
  
    return (
      <Container sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <TextField
            label="Fol (KGS)"
            size="small"
            type="number"
            value={fol}
            onChange={(e) => setFol(Number(e.target.value))}
          />
          <TextField
            label="Khakhri (KGS)"
            type="number"
            size="small"
            value={khakhri}
            onChange={(e) => setKhakhri(Number(e.target.value))}
          />
          <TextField
            label="Dakhri (KGS)"
            type="number"
            size="small"
            value={dakhri}
            onChange={(e) => setDakhri(Number(e.target.value))}
          />
          <TextField
            label="Jeran (KGS)"
            type="number"
            size="small"
            value={jeran}
            onChange={(e) => setJeran(Number(e.target.value))}
          />
          <Button variant="contained" onClick={totalWeight}>
            Total Weight
          </Button>
        </Grid>
        {total > 0 && (
          <Stack sx={{ mt: 2 }} spacing={2}>
            <Divider />
            <Box sx={{ mt: 2 }} component={Stack} spacing={2}>
              <Typography variant="body1">
                Total : {total.toFixed()} KGS
              </Typography>
            </Box>
            <Box gap={2} component={Grid} container>
              <TextField
                label="Bardan (KGS)"
                type="number"
                value={bardan}
                size="small"
                onChange={(e) => setBardan(Number(e.target.value))}
                helperText={"Total - Bardan : " + (total - bardan)}
              />
              <TextField
                label="Dal (KGS)"
                type="number"
                value={dal}
                onChange={(e) => setDal(Number(e.target.value))}
                helperText={
                  "Total - Bardan - Dal : " + (total - bardan - dal)
                }
                size="small"
              />
              <TextField
                label="Rate (Rs/KG)"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                helperText={
                  "(Total - Bardan - Dal) * Rate : " +
                  (total - bardan - dal) * rate
                }
                size="small"
              />
              <TextField
                label="% of Value"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                helperText={
                  "((Total - Bardan - Dal) * Rate) - % : " +
                  ((total - bardan - dal) * rate -
                    (percentage * ((total - bardan - dal) * rate)) /
                      100)
                }
                size="small"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={calculatePayment}
            >
              Calculate Main Payment
            </Button>
          </Stack>
        )}
        {payment > 0 && (
          <Box sx={{ mt: 2 }} component={Stack} spacing={2}>
            <Divider />
            <Typography variant="body1">
              Calculated Payment: {payment.toFixed()}
            </Typography>
            <TextField
              label="Vatav"
              type="number"
              value={vatav}
              size="small"
              onChange={(e) => setVatav(Number(e.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPaid(payment - vatav)}
            >
              Final Amount
            </Button>
          </Box>
        )}
        {paid > 0 && (
          <Box sx={{ mt: 2 }}>
            <Divider />
            <Typography variant="body1">
              Final Payment: {paid.toFixed()}
            </Typography>
          </Box>
        )}
      </Container>
    );
  }

  export default Lilvo;