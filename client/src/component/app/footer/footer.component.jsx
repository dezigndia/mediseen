import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import './footer.styles.scss';

import { IconButton, makeStyles } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ExploreIcon from '@material-ui/icons/Explore';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StoreIcon from '@material-ui/icons/Store';

/*
    ** use className 'purpleAppFooter' for purple footer and white icons,
       middle icon will be bigger in purple footer

    ** and className 'whiteAppFooter' for white footer and black icons
   
    ** color and middle icon will change acc. to active page
   
    ** visiblity of icons excluding middle icon will change acc to active pages
 */


/*
   there are three types of footer-
       1)with blue background and white icons with a bigger middle button
       2)with white background and blue icons with all small icons
       3)no footer
*/

/*
    render props have been used for this 
*/

const useStyles = makeStyles(theme => ({
    colorWhite: {
        color: 'white'
    },
    large: {
        transform: 'scale(1.1)',
        borderRadius: '50%',
        position: 'relative',
        bottom: '35%',
        border: '5px solid #220555',
    },
    gradientbackground: {
        backgroundImage: 'linear-gradient(90deg, #220555 30%, #EC2B7A 70%)'
    }
}));

const Footer = ({ history }) => {
    const classes = useStyles();
    return (
        <footer className="appFooter purpleAppFooter">
            <IconButton className={classes.colorWhite}>
                <LocalMallIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.colorWhite}>
                <ExploreIcon fontSize='large' />
            </IconButton>
            <IconButton className={clsx([classes.colorWhite, classes.large, classes.gradientbackground])}>
                <LocationOnIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.colorWhite}>
                <WhatsAppIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.colorWhite} onClick={(e)=>history.push('/vendor')}>
                <StoreIcon fontSize='large' />
            </IconButton>
        </footer>
    );
}

export default withRouter(Footer);