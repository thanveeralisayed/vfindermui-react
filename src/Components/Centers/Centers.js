import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HospitalCard from '../HospitalCard/HospitalCard';
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
        <div>

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

                <Typography  className={classes.centersHeading} color="textSecondary" variant="h6" >Centers</Typography>

                <Typography>{`${centers.length} ${centers.length > 1? 'centers':'center'} has found`}</Typography>

                <Box mt={5}>

                    <Grid className={classes.gridcenters} container>
                        {
                            centers.map((center, index) => (
                                <Grid key={index} item md={12} xs={12} sm={6} >
                                    <HospitalCard center={center} />
                                </Grid>
                            ))
                        }
                    </Grid>

                </Box>

            </Box>

            




        </div>

    )
}

export default Centers
