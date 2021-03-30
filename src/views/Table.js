import { React, useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ReactVirtualizedTable from "../components/ReactVirtualizedTable";

const useStyles = makeStyles((theme) => ({
  table: {
    paddingLeft: 12,
    paddingRight: 50,
    marginTop: "2%",
  },
  indicatorText: {
    fontSize: 15,
    fontWeight: 600,
    paddingBottom: 15,
  },
  formControl: {
    width: "40%",
  },
}));

const Table = (props) => {
  const classes = useStyles();
  const [department, setDepartment] = useState('frozen');
  
  const handleChange = (event) => {
    props.setCategory(`${event.target.value}/`);
    setDepartment(event.target.value);
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      className={classes.table}
    >
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.indicatorText}
      >
        {props.title}
      </Typography>
      {props.needSelect && (
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
            Departments
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={department}
              onChange={handleChange}
              label="Departments"
            >
              {props.options.map((element, i) => {
                return <MenuItem value={element}>{element}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      )}
      <ReactVirtualizedTable data={props.data} columns={props.columns} style={props.style}/>
    </Grid>
  );
};

export default Table;
