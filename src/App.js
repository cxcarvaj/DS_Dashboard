import React, { useState, useEffect } from "react";
import { createHashHistory } from "history";
import { Router, Link, Redirect, Route } from "react-router-dom";
import clsx from "clsx";
// import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Grid,
  Box,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import {
  Menu,
  ChevronLeft,
  TableChart,
  Dashboard,
  MonetizationOn,
} from "@material-ui/icons";
import DashboardView from "./views/DashboardView";
//Loader-Spinner
import ClipLoader from "react-spinners/ClipLoader";
import Table from "./views/Table";
import axios from "axios";

const drawerWidth = 180; //240

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#E6EFF8",
      color: "black",
    },
    "&$selected:hover": {
      backgroundColor: "#E6EFF8",
      color: "black",
    },
    "&:hover": {
      backgroundColor: "#E6EFF8",
      color: "black",
    },
  },
  selected: {},
})(MuiListItem);

const useStyles = makeStyles((theme) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  root: {
    display: "flex",
    flexGrow: 1,
  },

  rootG: {
    flexGrow: 1,
    marginTop: "10%",
    [theme.breakpoints.only("xs")]: {
      marginTop: "40%",
    },
    [theme.breakpoints.only("md")]: {
      marginTop: "8%",
      marginLeft: "5%",
      marginRight: "0%",
    },
    [theme.breakpoints.only("lg")]: {
      marginTop: "5%",
      marginLeft: "0%",
      marginRight: "5%",
    },
    [theme.breakpoints.only("xl")]: {
      marginTop: "3%",
      marginLeft: "0%",
      marginRight: "5%",
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    width: "auto",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#005EB8",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#005EB8",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    textAlign: "end",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  drawerPaper: {
    height: "105vh",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    height: "105vh",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
  },
  ilustrationPaper: {
    marginRight: 16,
    padding: theme.spacing(1),
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    width: 300,
    "&:hover": {
      background: "#ECEFF1",
      border: "#FFFFFF",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    width: "140px",
    "&:hover": {
      background: "#ECEFF1",
      border: "#FFFFFF",
    },
  },
  fixedHeight: {
    height: 240,
  },
  icon: {
    marginTop: 20,
  },
  ilustrationIcons: {
    marginTop: 20,
    width: 300,
  },
  gridImg: {
    marginBottom: "20px",
  },
  text: {
    fontSize: 20,
    paddingRight: 20,
  },
  subText: {
    fontSize: 12,
    paddingRight: 20,
  },
  spinner: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 200,

    [theme.breakpoints.only("xs")]: {
      marginTop: 200,
      marginLeft: 70,
      marginRight: "0%",
    },
    [theme.breakpoints.only("md")]: {
      marginTop: "20%",
      marginLeft: "35%",
      marginRight: "0%",
    },
    [theme.breakpoints.only("xl")]: {
      marginTop: "20%",
      marginLeft: "40%",
    },
  },
}));

const historial = createHashHistory();

const App = () => {
  const classes = useStyles();
  const [tagType, setTagType] = useState("Dashboard");
  const [arrayOfEarnings, setArrayOfEarnings] = useState([]);
  const [arrayOfTop5, setArrayOfTop5] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([]);
  const [indicator, setIndicators] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  
  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/indicators/")
    .then((response) => {
      setIndicators(response.data);
      setLoading(!loading);
    })
    .catch((e) => {
      console.warn(e);
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/earnings/").then((response) => {
      setArrayOfEarnings(response.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/departments/")
      .then((response) => {
        setOptions(response.data.departments);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/top_5/${category}`).then((response) => {
      setArrayOfTop5(response.data.data);
    });
  }, [category]);

  return (
    <div className={classes.root}>
      <Router history={historial}>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Grid item xl={12} lg={12} md={12} sm={12}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <Menu />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                <Box
                  component="div"
                  whiteSpace="normal"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  className={classes.text}
                >
                  Carlos Carvajal
                </Box>
                <Box
                  component="div"
                  whiteSpace="normal"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  className={classes.subText}
                >
                  Data Science Test
                </Box>
              </Typography>
              <img
                alt="Carlos Carvajal"
                className={classes.profileImg}
                src="https://i.postimg.cc/F1XX4WLd/me.jpg"
              ></img>
            </Toolbar>
          </Grid>
        </AppBar>
        <Grid container>
          <Grid item lg={2} sm={2}>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
                ),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeft />
                </IconButton>
              </div>
              <Divider />
              <List component="nav">
                {/* Home */}
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem
                    className={classes.listWarp}
                    button
                    selected={selectedIndex === 0}
                    onClick={() => {
                      setSelectedIndex(0);
                      setTagType("Dashboard");
                    }}
                  >
                    <ListItemIcon>
                      <Dashboard style={{ color: "#005eb8" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Link>

                {/* Tables */}
                <Link
                  to="/top5"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem
                    className={classes.listWarp}
                    button
                    selected={selectedIndex === 1}
                    onClick={() => {
                      setSelectedIndex(1);
                      setTagType("Top5");
                    }}
                  >
                    <ListItemIcon>
                      <TableChart style={{ color: "#005eb8" }} />
                    </ListItemIcon>
                    <ListItemText primary="Top 5" />
                  </ListItem>
                </Link>
                {/* Ganancias por Departamento y Productos */}
                <Link
                  to="/earnings"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem
                    className={classes.listWarp}
                    button
                    selected={selectedIndex === 2}
                    onClick={() => {
                      setSelectedIndex(2);
                      setTagType("Earnings");
                    }}
                  >
                    <ListItemIcon>
                      <MonetizationOn style={{ color: "#005eb8" }} />
                    </ListItemIcon>
                    <ListItemText primary="Earnings" />
                  </ListItem>
                </Link>
              </List>
              <Divider />
            </Drawer>
          </Grid>
          <Grid item lg={10} xs={10} md={10} sm={10}>
            <div className={classes.rootG}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {loading && (
                  <Grid className={classes.spinner}>
                    <ClipLoader color={"#005EB8"} loading={loading} size={35} />
                  </Grid>
                )}
                {!loading && tagType === "Dashboard" && (
                  <DashboardView indicator={indicator} />
                )}
                {!loading && tagType === "Top5" && (
                  <Table
                    setCategory={setCategory}
                    category={category}
                    options={options}
                    data={arrayOfTop5}
                    title="Top 5"
                    columns={[
                      {
                        width: 600,
                        label: "Product Name",
                        dataKey: "Product Name",
                        numeric: false,
                      },
                      {
                        flexGrow: 1,
                        width: 600,
                        label: "Quantity Sold",
                        dataKey: "Quantity Sold",
                        numeric: true,
                      },
                    ]}
                    needSelect={true}
                    style={{ height: "35.4vh", width: "65vw", marginTop: "2%" }}
                  />
                )}
                {!loading && tagType === "Earnings" && (
                  <Table
                    data={arrayOfEarnings}
                    title="Ganancias por Departamento y Productos"
                    needSelect={false}
                    columns={[
                      {
                        width: 600,
                        label: "Department",
                        dataKey: "Department",
                        numeric: false,
                      },
                      {
                        flexGrow: 1,
                        width: 600,
                        label: "Department Earning ($)",
                        dataKey: "Department Earning",
                        numeric: true,
                      },
                      {
                        flexGrow: 1,
                        width: 600,
                        label: "Product Name",
                        dataKey: "Product Name",
                        numeric: false,
                      },
                      {
                        flexGrow: 1,
                        width: 600,
                        label: "Product Earning ($)",
                        dataKey: "Product Earning",
                        numeric: true,
                      },
                    ]}
                    style={{ height: "75vh", width: "75vw", marginTop: "2%" }}
                  />
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
};
export default App;
