import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';




const steps = ['Shipping address', 'Payment details']

const CheckOut = ({ emptyCart, cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setToken] = useState(null)
    const [dataShipping, setData] = useState({})
    const history = useHistory()
    const [isFinished, setFinished] = useState(false)

    const timeout = () => {
        setTimeout(() => {
            setFinished(true)
        }, 3000)
    }
    useEffect(() => {
        const generateToken = async () => {
            try {
                setToken(await commerce.checkout.generateToken(cart.id, { type: 'cart' }))
                console.log("Recibido", checkoutToken)
            } catch (error) {
                console.log("error cout")
                history.pushState('/')
            }
        };
        generateToken() //en useEffect no se puede hacer async, por eso la función
    }, [cart])

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    const next = (data) => {
        setData(data)
        nextStep()
    }

    { console.log(order) }

    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ));

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            </>
        );
    }




    const Form = () => (
        activeStep == 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm timeout={timeout} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} shippingData={dataShipping} nextStep={nextStep} />
    )
    return (
        <div>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper} >
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </div>
    )
}

export default CheckOut
