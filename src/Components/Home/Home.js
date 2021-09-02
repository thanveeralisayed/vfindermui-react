import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { InputBase, makeStyles, Paper, alpha, Button, Typography, MenuItem, Menu } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Centers from '../Centers/Centers';
import axios from 'axios';
import format from 'date-fns/format/index';
import Switch from '@material-ui/core/Switch';
import { Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';





const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.10),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.12),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    searchButton: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(1, 6)
    },
    centersGrid: {
        marginTop: theme.spacing(2),
    },
    centersPaper: {
        padding: theme.spacing(2)
    },
    notfound: {
        marginTop: theme.spacing(4),
        textAlign: 'center'
    },
    togglebox: {
        marginRight: theme.spacing(1)
    }
}))

const Home = () => {
    const classes = useStyles();
    const [pincode, setPincode] = useState(null);
    const [centers, setCenters] = useState(null);
    const [states, setStates] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [anchorElst, setAnchorElst] = React.useState(null);
    const [anchorElds, setAnchorElds] = React.useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [selectedSt, setSelectedSt] = useState(null);
    const [selectedDis, setSelectedDis] = useState(null);
    const [state, setState] = useState({
        pin: true,
        district: true,
    });



    const handleClickstate = (event) => {
        setAnchorElst(event.currentTarget);
    };

    const handleClosestate = () => {
        setAnchorElst(null);
    };

    const handleClickdis = (event) => {
        setAnchorElds(event.currentTarget);
    };

    const handleClosedis = () => {
        setAnchorElds(null);
    };


    const handleChange = (event) => {
        setSelectedSt(null);
        setSelectedDis(null);
        setPincode(null);
        setCenters(null);
        setDistrictId(null);
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const fetchStates = () => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`).then(res => {
            setStates(res.data.states)
        })
    }

    const fetchDistricts = (id) => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`).then(res => {
            setDistricts(res.data.districts)
        })
    }

    const fetchCentreList = (pin, date) => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`).then(res => {
            setCenters(res.data.centers)
        })
    }

    const fetchCentreListbyDistrict = (id, date) => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`).then((res) => {
            setCenters(res.data.centers);

        })
    }

    useEffect(() => {
        fetchStates();
    }, [])

    const OnSearchHandler = (id) => {
        setCenters(null);
        const date = format(new Date(), 'dd-MM-yyyy')
        console.log(date);
        if (!id && pincode) {
            fetchCentreList(pincode, date);
        }
        if (id) {
            fetchCentreListbyDistrict(id, date)
        }

    }




    return (
        <Container>

            <Grid className={classes.root} container>
                <Grid xs={12} item>


                    <Paper elevation={11} className={classes.paper}>

                        <Box className={classes.togglebox} display="flex" flexDirection="row-reverse">


                            <FormControlLabel
                                label={state.pin ? 'Pin' : 'District'}
                                labelPlacement="bottom"
                                control={
                                    <Switch
                                        checked={state.pin}
                                        onChange={handleChange}
                                        color="primary"
                                        name="pin"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}

                                    />
                                }

                            />

                        </Box>


                        <Box display="flex" justifyContent="center">

                            {
                                state.pin ? <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <Search />
                                    </div>
                                    <InputBase
                                        className={classes.ipfield}
                                        onKeyDown={(e) => e.key === 'Enter' ? OnSearchHandler() : null}
                                        onChange={(e) => setPincode(e.target.value)}
                                        placeholder="Enter your PIN"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        type="number"
                                    />
                                </div> : <Box display="flex" justifyContent="center">
                                    <div>
                                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickstate}>
                                            {selectedSt ? selectedSt : 'Select State'}
                                        </Button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorElst}
                                            keepMounted
                                            open={Boolean(anchorElst)}
                                            onClose={handleClosestate}
                                        >

                                            {
                                                states ? states.map((state, index) => (
                                                    <MenuItem key={index} onClick={() => {
                                                        handleClosestate();
                                                        fetchDistricts(state.state_id);
                                                        setSelectedSt(state.state_name);
                                                        setSelectedDis(null);
                                                        setDistrictId(null);
                                                    }}>{state.state_name}</MenuItem>
                                                )) : null
                                            }


                                        </Menu>
                                    </div>

                                    <div>
                                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickdis}>
                                            {selectedDis ? selectedDis : 'Select District'}
                                        </Button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorElds}
                                            keepMounted
                                            open={Boolean(anchorElds)}
                                            onClose={handleClosedis}
                                        >

                                            {
                                                districts ? districts.map((district, index) => (
                                                    <MenuItem key={index} onClick={() => {
                                                        handleClosedis();
                                                        setDistrictId(district.district_id);
                                                        setSelectedDis(district.district_name);

                                                    }}>{district.district_name}</MenuItem>
                                                )) : <MenuItem>Select a state</MenuItem>
                                            }
                                        </Menu>
                                    </div>

                                </Box>


                            }




                        </Box>



                        <Button onClick={() => OnSearchHandler(districtId)} size="large" className={classes.searchButton} variant="outlined" color="secondary">
                            Search
                        </Button>

                    </Paper>






                </Grid>



                {
                    centers !== null ? centers.length > 0 ? <Grid className={classes.centersGrid} item xs={12}>
                        <Paper elevation={5} className={classes.centersPaper}>
                            {<Centers centers={centers} />}
                        </Paper>
                    </Grid> : <Typography color="textPrimary" className={classes.notfound}>Sorry, No centers found in your PIN</Typography> : null
                }


            </Grid>
        </Container>
    )
}

export default Home
