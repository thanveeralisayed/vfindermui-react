import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HospitalCard from '../HospitalCard/HospitalCard';
import { motion } from 'framer-motion';



const useStyles = makeStyles((theme) => ({
    centersHeading: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    gridcenters: {
        marginTop: theme.spacing(3)
    }
}))

const Centers = ({ centers }) => {
    const classes = useStyles();
    return (
        <motion.div initial={{ y: "100" }}
            animate={{ y: 0 }}
            exit={{ y: "100" }} >

            <Typography className={classes.centersHeading} color="textSecondary" variant="h5" >Centers</Typography>


            <Grid className={classes.gridcenters} container>
                {
                    centers.map((center, index) => (
                        <Grid key={index} item md={3} xs={12} sm={6} >
                            <HospitalCard center={center} />
                        </Grid>
                    ))
                }
            </Grid>

        </motion.div>

    )
}

export default Centers
