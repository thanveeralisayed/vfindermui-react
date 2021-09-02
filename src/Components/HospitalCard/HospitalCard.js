import React from 'react';
import Card from '@material-ui/core/Card';
import { Avatar, Button, ButtonGroup, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
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
    vaccinefee:{
        fontSize:13
    }
}))

const HospitalCard = ({ center }) => {
    const [expanded, setExpanded] = useState(false)
    const feeType = center.fee_type;
    const sessions = center.sessions;
    const todaydate = format(new Date(), 'dd-MM-yyyy');
    const todaySessions = sessions.filter(session => (session.date === todaydate));
    const futureSessions = sessions.filter(session => (session.date !== todaydate));
    const vaccinefees = center.vaccine_fees;

    


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card} elevation={7}>
                <CardHeader
                    avatar={<Avatar aria-label="centers" style={feeType === "Paid" ? { backgroundColor: 'yellow' } : { backgroundColor: 'green' }}>
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
                    todaySessions.length > 0 ? todaySessions.map((session, index) => (<SessionCard key={index} date={todaydate} session={session} />)) : 'No more Sessions today'
                }
                </CardContent>

            {

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


                                <div>
                                    {
                                        futureSessions.length > 0 ?
                                            futureSessions.map((session, index) => (
                                                <Box key={index} className={classes.box} borderRadius={16} border={1} borderColor="grey.500"><SessionCard  date={session.date} session={session} /></Box>)) :
                                            'No sesssions for Next 7 days'
                                    }

                                </div>

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

                    : ''

            }




            </Card>
        </div >
    )
}

export default HospitalCard
