import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography }
    from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'

const Navbar = () => {

    const classes = useStyles();

    return (
        <div>
            <AppBar position='fixed'
                className={classes.appBar}
                color='inherit' >
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit'>
                        <img
                            src='https://e7.pngegg.com/pngimages/750/353/png-clipart-scalable-graphics-logo-computer-icons-trade-logo-trade.png'
                            alt='CheVendo'
                            height='25px'
                            className={classes.image}
                        ></img>
                        CheVendo!
                    </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.button}></div>
                    <IconButton aria-label='Show cart items'
                        color='inherit'>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
