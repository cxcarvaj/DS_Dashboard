import React from 'react';
import {Grid, Card, CardContent, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root:{
        flexGrow: 1,
        margin: 16
    },
    text:{
        fontSize: 17,
        fontWeight: 600,
    },
    subText:{
        fontSize: 13,
        fontWeight: 400
    }
}));

const CardIndicator = (props) => {
    const classes = useStyles();

    return(
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h4" className={classes.text}>
                        {props.name}
                    </Typography>
                    <Typography color='textSecondary' className={classes.subText}>
                        {props.value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CardIndicator