import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HospitalCard from '../HospitalCard/HospitalCard';
import { motion } from 'framer-motion';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    centersHeading: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    gridcenters: {
        marginTop: theme.spacing(3)
    }
}))

const Centers = ({ centers, HospitalArray,filterHospital }) => {
    



    const classes = useStyles();
    return (
        <motion.div initial={{ y: "100" }}
            animate={{ y: 0 }}
            exit={{ y: "100" }} >

            <Box>
                
                <Box  mb={2} display="flex" justifyContent="flex-end" flexDirection="row">
                    <Autocomplete
                        id="combo-box-demo"
                        options={HospitalArray? HospitalArray :''}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        onChange={(event,value)=>  value !== null? filterHospital(value.id):filterHospital(value='reset')}
                        renderInput={(params) => <TextField {...params} label="Search Hospitals"  variant="outlined" />}
                    />
                </Box>

                <Typography  className={classes.centersHeading} color="textSecondary" variant="h5" >Centers</Typography>

                <Box mt={5}>

                    <Grid className={classes.gridcenters} container>
                        {
                            centers.map((center, index) => (
                                <Grid key={index} item md={3} xs={12} sm={6} >
                                    <HospitalCard center={center} />
                                </Grid>
                            ))
                        }
                    </Grid>

                </Box>

            </Box>

            




        </motion.div>

    )
}

export default Centers
