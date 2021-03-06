import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { InputBase, makeStyles, Paper, alpha, Button, Typography, MenuItem, Menu } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Centers from '../Centers/Centers';
import axios from 'axios';
import format from 'date-fns/format/index';
import { Box } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';







const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
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
        padding: theme.spacing(1, 6),
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
    },
    searchbox: {
        marginTop: theme.spacing(4)
    },
    filternames: {
        marginTop: theme.spacing(2)
    },
    vacbtn:{
        fontSize:10
    }
}))

const Home = () => {
    const classes = useStyles();
    const [pincode, setPincode] = useState('');
    const [centers, setCenters] = useState(null);
    const [states, setStates] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [anchorElst, setAnchorElst] = React.useState(null);
    const [anchorElds, setAnchorElds] = React.useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [selectedSt, setSelectedSt] = useState(null);
    const [selectedDis, setSelectedDis] = useState(null);
    const [value, setValue] = useState(0);
    const [coviFilter, setcoviFilter] = useState(null);
    const [covacFilter, setCovacFilter] = useState(null);
    const [sputFilter, setSputFilter] = useState(null);
    const [HospitalArray, setHospitalArray] = useState([]);
    const [backArray, setBackArray] = useState(null);



    const searchCentersByname = (centersArray) => {
        let cents = []
        centersArray.map((center) => {
            const object = {
                id: center.center_id,
                title: `${center.name}, ${center.address}`
            }
            cents.push(object);
            return cents;
        })
        setHospitalArray(cents);
    }

    const filterHospital = (id) => {
        console.log(id);
        if (id !== 'reset') {
            const ncenters = centers ? centers.filter((center) => (center.center_id === id)) : '';
            setCenters(ncenters);
        }
        if (id === 'reset') {
            setCenters(backArray);
        }

        // eslint-disable-next-line no-unused-expressions
        // ncenters !== ''? setCenters(ncenters):null;
    }




    const handleChange2 = (event, newValue) => {
        setSelectedSt(null);
        setSelectedDis(null);
        setPincode('');
        setCenters(null);
        setDistricts(null);
        setDistrictId(null);
        setValue(newValue);

    };

    function getUnique(arr) {

        // removing duplicate
        let uniqueArr = [...new Set(arr)];
        return uniqueArr;
    }


    const filterCentreVaccines = (centerss) => {
        let covi = [];
        let covac = [];
        let sput = [];


        centerss.map((center) => (
            center.sessions.map((session) => {
                if (session.vaccine === 'COVISHIELD') {
                    covi.push(center);
                }
                if (session.vaccine === 'COVAXIN') {
                    covac.push(center);
                }
                if (session.vaccine === 'SPUTNIK V') {
                    sput.push(center)
                }
                return session;
            })
        ))


        covi = getUnique(covi);
        covac = getUnique(covac);
        sput = getUnique(sput)


        setcoviFilter(covi);
        setCovacFilter(covac);
        setSputFilter(sput);
    }






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



    const fetchStates = () => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`).then(res => {
            setStates(res.data.states)
        })
    }

    const fetchDistricts = (id) => {
        console.log(id);
        localStorage.setItem("seldisId", id);
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`).then(res => {
            setDistricts(res.data.districts);
        })
    }

    const fetchCentreList = (pin, date) => {
        localStorage.removeItem("rdistrict");
        localStorage.setItem("tabval", 0);
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`).then(res => {
            setCenters(res.data.centers);
            filterCentreVaccines(res.data.centers);
            searchCentersByname(res.data.centers);
            setBackArray(res.data.centers);
        })
    }

    const fetchCentreListbyDistrict = (id, date) => {
        localStorage.setItem("rdistrict", id);
        localStorage.removeItem("recentpin");
        localStorage.setItem("tabval", 1);
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`).then((res) => {
            setCenters(res.data.centers);
            filterCentreVaccines(res.data.centers);
            searchCentersByname(res.data.centers);
            setBackArray(res.data.centers);
        })
    }

    useEffect(() => {
        fetchStates();
        // if (localStorage.getItem("recentpin")) {
        //     const rpin = localStorage.getItem("recentpin");
        //     const date = format(new Date(), 'dd-MM-yyyy')
        //     if (rpin) {
        //         fetchCentreList(rpin, date);
        //         setPincode(rpin);
        //     }
        // }

        // if (localStorage.getItem("rdistrict")) {
        //     const rdis = localStorage.getItem("rdistrict");
        //     let tabval = localStorage.getItem("tabval");
        //     tabval = parseInt(tabval);
        //     setValue(tabval);
        //     const date = format(new Date(), 'dd-MM-yyyy');
        //     if (rdis) {
        //         fetchCentreListbyDistrict(rdis, date);
        //         const rsname = localStorage.getItem("rsname");
        //         const rdname = localStorage.getItem("rdname");
        //         const seldisid = localStorage.getItem("seldisId");
        //         console.log(rsname);
        //         if (rsname && rdname) {
        //             setSelectedSt(rsname);
        //             setSelectedDis(rdname);
        //             fetchDistricts(seldisid);
        //         }
        //     }
        // }
    }, [])



    const OnSearchHandler = (id) => {
        // setCenters(null);
        console.log(pincode);
        const date = format(new Date(), 'dd-MM-yyyy')
        console.log(date);
        if (!id && pincode) {
            console.log('entered pin mode');
            fetchCentreList(pincode, date);
            localStorage.setItem("recentpin", pincode);
        }
        if (id) {
            fetchCentreListbyDistrict(id, date)
        }

    }




    return (
        <Container>

            <Grid className={classes.root} container>
                <Grid xs={12} item>


                    <Paper elevation={0} className={classes.paper}>

                        <Box display="flex" justifyContent="center" >
                            <Paper elevation={0} square>
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChange2}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab label="PIN" />
                                    <Tab label="DISTRICT" />
                                </Tabs>
                            </Paper>
                        </Box>






                        <Box className={classes.searchbox} display="flex" justifyContent="center">

                            {
                                value === 0 ? <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <Search />
                                    </div>
                                    <InputBase
                                        className={classes.ipfield}
                                        onKeyDown={(e) => e.key === 'Enter' ? OnSearchHandler() : null}
                                        onChange={(e) => {
                                            setPincode(e.target.value)
                                        }}
                                        placeholder="Enter your PIN"
                                        value={pincode}
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        type="number"
                                    />
                                </div> : <Box display="flex" justifyContent="center">
                                    <div>
                                        <Button endIcon={<KeyboardArrowDownIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickstate}>
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
                                                        localStorage.setItem("rsname", state.state_name);
                                                        setSelectedDis(null);
                                                        setDistrictId(null);
                                                    }}>{state.state_name}</MenuItem>
                                                )) : null
                                            }


                                        </Menu>
                                    </div>

                                    <div>
                                        <Button endIcon={<KeyboardArrowDownIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickdis}>
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
                                                        localStorage.setItem("rdname", district.district_name);

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


                        <Box className={classes.filternames} display="flex" justifyContent="center" flexWrap="wrap" >

                            <Box mt={.5} mx={.2}>
                                <Button onClick={() => {
                                    setCenters(backArray);
                                    searchCentersByname(backArray);
                                }} className={classes.vacbtn} variant="contained" color="secondary">
                                    All
                                </Button>
                            </Box>
                            <Box mt={.5}  mx={.2}>
                                <Button onClick={() => {
                                    setCenters(coviFilter);
                                    searchCentersByname(coviFilter);
                                }} className={classes.vacbtn}variant="contained" color="secondary">
                                    Covishield
                                </Button>
                            </Box>

                            <Box mt={.5}  mx={.2}>
                                <Button onClick={() => {
                                    setCenters(covacFilter);
                                    searchCentersByname(covacFilter);
                                }} className={classes.vacbtn} variant="contained" color="secondary">
                                    Covaxin
                                </Button>
                            </Box>
                            <Box mt={.5} mx={.2} >
                                <Button onClick={() => {
                                    setCenters(sputFilter);
                                    searchCentersByname(sputFilter);
                                }} className={classes.vacbtn}variant="contained" color="secondary">
                                    Sputnik V
                                </Button>
                            </Box>


                        </Box>

                    </Paper>






                </Grid>


                {
                    centers !== null ? centers.length > 0 ? <Grid className={classes.centersGrid} item xs={12}>
                        <Paper elevation={0} className={classes.centersPaper}>
                            {<Centers filterHospital={filterHospital} HospitalArray={HospitalArray}
                                centers={centers} />}
                        </Paper>
                    </Grid> : <Typography color="textPrimary" className={classes.notfound}>Sorry, No centers found </Typography> : null
                }




            </Grid>
        </Container>
    )
}

export default Home
