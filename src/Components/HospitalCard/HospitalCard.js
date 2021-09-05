import React, { useEffect} from 'react';
import Card from '@material-ui/core/Card';
import { Avatar, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { yellow, green } from '@material-ui/core/colors';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { useState } from 'react';
import clsx from 'clsx';
import SessionCard from '../SessionCard/SessionCard';
import format from 'date-fns/format/index';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: yellow[800],
    },
    card: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    expandnotice: {
        fontSize: 13,
        textAlign: 'center'
    },
    box: {
        marginTop: theme.spacing(1)
    },
    gitem: {
        marginLeft: theme.spacing(1)
    },
    vaccinefee: {
        fontSize: 13
    }
}))

const HospitalCard = ({ center }) => {
    const [expanded, setExpanded] = useState(false);
    const [swidth, setSwidth] = useState(0);
    const feeType = center.fee_type;
    const sessions = center.sessions;
    const todaydate = format(new Date(), 'dd-MM-yyyy');
    const todaySessions = sessions.filter(session => (session.date === todaydate));
    const futureSessions = sessions.filter(session => (session.date !== todaydate));
    const vaccinefees = center.vaccine_fees;









    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const width = window.innerWidth;
        setSwidth(width);
    }, [])




    const classes = useStyles();
    return (
        <div style={{
            height: "100%",
            paddingTop: 5
        }}>
            <Card className={classes.card} elevation={7}>
                <CardHeader
                    avatar={<Avatar aria-label="centers" style={feeType === "Paid" ? { backgroundColor: `${yellow[500]}` } : { backgroundColor: `${green[500]}` }}>
                        {feeType[0]}
                    </Avatar>}
                    title={center.name}
                    subheader={center.address}
                />

                <CardContent >


                    <Grid container>
                        {
                            vaccinefees ? vaccinefees.map((vaccine, index) => (
                                <Grid key={index} item className={classes.gitem}>
                                    <Typography className={classes.vaccinefee} color="textSecondary">{`${vaccine.vaccine} : ₹${vaccine.fee} `}</Typography>
                                </Grid>
                            )) : ''
                        }

                    </Grid>

                    {
                        swidth > 599 ? <Box display="flex" flexWrap="wrap" >


                            {
                                todaySessions.length > 0 ? todaySessions.map((session, index) => (
                                    <Box key={index} mx={.2} my={.2} ><SessionCard date={todaydate} session={session} />
                                    </Box>)) : 'No more Sessions today'
                            }





                            {
                                futureSessions.length > 0 ?
                                    futureSessions.map((session, index) => (
                                        <Box mx={.2} my={.2} key={index}  ><SessionCard date={session.date} session={session} />
                                        </Box>)) :
                                    'No sesssions for Next 7 days'
                            }



                        </Box> : <Box display="flex" justifyContent="center" flexWrap="wrap">

                            {
                                todaySessions.length > 0 ? todaySessions.map((session, index) => (
                                    <Box key={index} mx={.2} my={.2} ><SessionCard date={todaydate} session={session} />
                                    </Box>)) : 'No more Sessions today'
                            }


                        </Box>


                    }




                </CardContent>

                {
                    swidth < 600 ?
                        futureSessions.length > 0 ?
                            <div>
                                <CardContent >
                                    <Typography className={classes.expandnotice} paragraph>Expand for Next 7 days availablity</Typography>
                                </CardContent>

                                {/* <CardActions disableSpacing>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreOutlined />
                            </IconButton>
                        </CardActions> */}
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Next 7 Days</Typography>


                                        <Box display="flex" justifyContent="center" flexWrap="wrap">
                                            {
                                                futureSessions.length > 0 ?
                                                    futureSessions.map((session, index) => (
                                                        <Box mx={.2} my={.2} key={index} className={classes.box} borderRadius={16} border={1} borderColor="grey.500"><SessionCard date={session.date} session={session} />
                                                        </Box>)) :
                                                    'No sesssions for Next 7 days'
                                            }

                                        </Box>

                                    </CardContent>
                                </Collapse>
                                <CardActions disableSpacing>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreOutlined />
                                    </IconButton>
                                </CardActions>
                            </div>

                            : '' : ''

                }




            </Card>
        </div >
    )
}

export default HospitalCard
