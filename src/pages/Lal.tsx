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
} from "@mui/material";

const Lal : React.FC = () => {
    const [fol, setFol] = useState(0);
    const [khakhri, setKhakhri] = useState(0);
    const [dakhri, setDakhri] = useState(0);
    const [jeran, setJeran] = useState(0);
    const [newKhakhri, setNewKhakhri] = useState(0);
    const [newDakhri, setNewDakhri] = useState(0);
    const [newJeran, setNewJeran] = useState(0);
    const [total, setTotal] = useState(0);
    const [xKhakhri, setXKhakhri] = useState(0);
    const [xDakhri, setXDakhri] = useState(0);
    const [xJeran, setXJeran] = useState(0);
    const [calculatedWeight, setCalculatedWeight] = useState(0);
    const [bardan, setBardan] = useState(0);
    const [dal, setDal] = useState(0);
    const [rate, setRate] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [extraRate, setExtraRate] = useState({ KRate: 0, DRate: 0, JRate: 0 });
    const [payment, setPayment] = useState(0);
    const [finalPayment, setFinalPayment] = useState(0);
    const [isWeightConfirmed, setIsWeightConfirmed] = useState(false);
    const [chhut, setChhut] = useState(0);
    const [paid, setPaid] = useState(0);
  
    const totalWeight = () => {
      const F = fol;
      if (!F) return;
      const K = parseInt(Math.min(Math.floor((F * 2) / 14), khakhri || 0).toFixed());
      const D = parseInt(Math.min(Math.floor((F * 3) / 14), dakhri || 0).toFixed());
      const J = parseInt(Math.min(Math.floor(F / 14), jeran || 0).toFixed());
      const total = F + khakhri + dakhri + jeran;
      const calculatedWeight = F + K + D + J;
      setNewKhakhri(K);
      setNewDakhri(D);
      setNewJeran(J);
      setTotal(total);
      setCalculatedWeight(calculatedWeight);
    };
  
    const newTotalWeight = () => {
      const newWeight = fol + newKhakhri + newDakhri + newJeran;
      setCalculatedWeight(newWeight);
      setXKhakhri(khakhri - newKhakhri);
      setXDakhri(dakhri - newDakhri);
      setXJeran(jeran - newJeran);
      setIsWeightConfirmed(true);
    };
  
    const calculatePayment = () => {
      const newWeight = calculatedWeight;
      const bWeight = newWeight - bardan;
      const dWeight = bWeight - dal;
      const value = dWeight * rate;
      const total = value - (percentage * value) / 100;
  
      setPayment(total);
    };
  
    const totalPayment = () => {
      const extraTotal =
        (xKhakhri || 0) * extraRate.KRate +
        (xDakhri || 0) * extraRate.DRate +
        (xJeran || 0) * extraRate.JRate;
  
      const totalPaid = payment + extraTotal;
  
      setFinalPayment(totalPaid);
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
              <Typography variant="body1">
                Calculated Total : {calculatedWeight.toFixed()} KGS
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <TextField
                label="New Khakhri (KGS)"
                type="number"
                size="small"
                value={newKhakhri}
                onChange={(e) => setNewKhakhri(Number(e.target.value))}
              />
              <TextField
                label="New Dakhri (KGS)"
                type="number"
                size="small"
                value={newDakhri}
                onChange={(e) => setNewDakhri(Number(e.target.value))}
              />
              <TextField
                label="New Jeran (KGS)"
                type="number"
                size="small"
                value={newJeran}
                onChange={(e) => setNewJeran(Number(e.target.value))}
              />
              <Button variant="contained" size="small" onClick={newTotalWeight}>
                Confirm Weight
              </Button>
            </Grid>
          </Stack>
        )}
        {isWeightConfirmed && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Divider />
            <Box gap={2} component={Grid} container>
              <TextField
                label="Bardan (KGS)"
                type="number"
                value={bardan}
                size="small"
                onChange={(e) => setBardan(Number(e.target.value))}
                helperText={"Total - Bardan : " + (calculatedWeight - bardan)}
              />
              <TextField
                label="Dal (KGS)"
                type="number"
                value={dal}
                onChange={(e) => setDal(Number(e.target.value))}
                helperText={
                  "Total - Bardan - Dal : " + (calculatedWeight - bardan - dal)
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
                  (calculatedWeight - bardan - dal) * rate
                }
                size="small"
              />
              <TextField
                label="Vatav"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                helperText={
                  "((Total - Bardan - Dal) * Rate) - % : " +
                  ((calculatedWeight - bardan - dal) * rate -
                    (percentage * ((calculatedWeight - bardan - dal) * rate)) /
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
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Payment: {payment.toFixed()}
              </Typography>
            </Box>
            <Box gap={2} component={Grid} container>
              <TextField
                label="Extra Khakhri Rate"
                type="number"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {xKhakhri} KGS
                      </InputAdornment>
                    ),
                  },
                }}
                value={extraRate.KRate}
                onChange={(e) =>
                  setExtraRate({ ...extraRate, KRate: Number(e.target.value) })
                }
              />
              <TextField
                label="Extra Dakhri Rate"
                type="number"
                size="small"
                value={extraRate.DRate}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {xDakhri} KGS
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  setExtraRate({ ...extraRate, DRate: Number(e.target.value) })
                }
              />
              <TextField
                label="Extra Jeran Rate"
                type="number"
                size="small"
                value={extraRate.JRate}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {xJeran} KGS
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  setExtraRate({ ...extraRate, JRate: Number(e.target.value) })
                }
              />
            </Box>
            <Button variant="contained" color="primary" onClick={totalPayment}>
              Payment
            </Button>
          </Stack>
        )}
        {finalPayment > 0 && (
          <Box sx={{ mt: 2 }} component={Stack} spacing={2}>
            <Divider />
            <Typography variant="body1">
              Calculated Payment: {finalPayment.toFixed()}
            </Typography>
            <TextField
              label="Dhagla Chhut"
              type="number"
              value={chhut}
              size="small"
              onChange={(e) => setChhut(Number(e.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPaid(finalPayment - chhut)}
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

  export default Lal;