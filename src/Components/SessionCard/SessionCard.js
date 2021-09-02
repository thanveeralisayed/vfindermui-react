import { Button, ButtonGroup, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    agecap: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    dosebtngp: {
        display: 'flex',
        justifyContent: 'center'
    },
    vaccinename:{
        fontSize:13,
        textAlign:'center'
    }
}))

const SessionCard = ({ session,date }) => {
    const dose1 = session.available_capacity_dose1;
    const dose2 = session.available_capacity_dose2;
    const vaccine = session.vaccine;
    const ageCategory = () => {
        if (session.min_age_limit && !session.max_age_limit) {
            if (session.min_age_limit === 18) {
                return '18 and Above'
            }
            if (session.min_age_limit === 45) {
                return '45 and Above'
            }
        }
        if (session.min_age_limit && session.max_age_limit) {
            return '18 to 44 only'
        }
    }

    

    const classes = useStyles();
    return (
        <div>
            <Typography className={classes.agecap} color="textSecondary">
                {date}
            </Typography>
            <div className={classes.dosebtngp} >
                <ButtonGroup size="large" aria-label="large outlined primary button group">
                    <Button color="primary">
                        D1 : {dose1}
                    </Button>
                    <Button color="secondary" >
                        D2 : {dose2}
                    </Button>
                </ButtonGroup>
            </div>
            <Typography className={classes.agecap} color="textSecondary">
                {ageCategory()}
            </Typography>
            <Typography className={classes.vaccinename} color="textSecondary">
                {vaccine}
            </Typography>

        </div>
    )
}

export default SessionCard
