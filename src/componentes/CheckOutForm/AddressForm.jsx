import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, next }) => {

    const methods = useForm();
    const [countriesList, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [subdivisions, setSubdivisions] = useState([])
    const [subdivision, setSubdivision] = useState('')
    const [options, setOptions] = useState([])
    const [option, setOption] = useState('')

    const countries = Object.entries(countriesList).map(([code, name]) => ({ id: code, label: name }))
    const regiones = Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name }))
    const opciones = options.map((op) => ({ id: op.id, label: `${op.description} - (${op.price.formatted_with_code})` }))


    useEffect(() => {
        console.log("token en address", checkoutToken)
        fetchCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if (country) {
            fetchSubdivisions(country)
        }
    }, [country])

    useEffect(() => {
        if (subdivision) {
            fetchOptions(checkoutToken.id, country, subdivision)
        }
    }, [subdivision])


    const fetchCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setCountries(countries)
        setCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (paisCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(paisCode)
        setSubdivisions(subdivisions)
        setSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        setOptions(options)
        setOption(options[0].id)
    }
    return (
        <>
            <Typography variant='h6' gutterBottom> Shipping Address </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, country, subdivision, option }))}>
                    <Grid container spacing={3}>
                        <FormInput required={true} name='firstName' label='First Name' />
                        <FormInput required={true} name='lastname' label='Last Name' />
                        <FormInput required={true} name='address' label='Address' />
                        <FormInput required={true} name='email' label='Email' />
                        <FormInput required={true} name='city' label='City' />
                        <FormInput required={true} name='zip' label='Postal code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Country </InputLabel>
                            <Select value={country} fullWidth onChange={(e) => setCountry(e.target.value)}>
                                {countries.map((pais) => (
                                    <MenuItem key={pais.id} value={pais.id}>
                                        {pais.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Subdivision </InputLabel>
                            <Select value={subdivision} fullWidth onChange={(e) => setSubdivision(e.target.value)}>
                                {regiones.map((region) => (
                                    <MenuItem key={region.id} value={region.id}>
                                        {region.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Options </InputLabel>
                            <Select value={option} fullwidth onChange={(e) => setOption(e.target.value)}>
                                {opciones.map((opcion) => (
                                    <MenuItem key={opcion.id} value={opcion.id}>
                                        {opcion.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'> Back to cart </Button>
                        <Button type='submit' variant='contained' color='primary'> Next </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
