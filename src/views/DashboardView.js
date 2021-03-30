import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import CardIndicator from "../components/CardIndicator";
import TimeLine from "../components/TimeLine";

const useStyles = makeStyles((theme) => ({
  indicatorText: {
    fontSize: 25,
    fontWeight: 600,
    paddingTop: "2%",
    marginLeft: "35%",
    marginRight: "35%",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "18%",
      marginRight: "18%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginLeft: "34%",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "35%",
      marginRight: "35%",
    },
  },
  timeLineText: {
    fontStyle: "bold",
    fontSize: 25,
    fontWeight: 600,
    paddingTop: "2%",
    marginLeft: "35%",
    marginRight: "35%",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "25%",
      marginRight: "25%",
    },
  },
  chart:{
    marginLeft: '10%',
  }
}));

const DashboardView = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.indicatorText}
      >
        Indicadores
      </Typography>
      <CardIndicator
        name="Ticket Promedio"
        value={`$${props.indicator.ticketPromedio}`}
      ></CardIndicator>
      <CardIndicator
        name="Margen Promedio"
        value={`%${props.indicator.margenPromedio}`}
      ></CardIndicator>
      <CardIndicator
        name="Cant. Producto Promedio"
        value={`${props.indicator.cantProdMean} UNIDADES`}
      ></CardIndicator>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.timeLineText}
      >
        Timeline
      </Typography>
      <Grid className={classes.chart}>
        <TimeLine />
      </Grid>
    </Grid>
  );
};
export default DashboardView;
