import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'


const AddressForm = ({ checkoutToken }) => {

    const methods = useForm();
    const [countriesList, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [subdivisions, setSubdivisions] = useState([])
    const [subdivision, setSubdivision] = useState('')
    const [options, setOptions] = useState([])
    const [option, setOption] = useState('')

    const countries = Object.entries(countriesList).map(([code, name]) => ({ id: code, label: name }))
    console.log(countries)
    useEffect(() => {
        console.log("token en address", checkoutToken)
        fetchCountries(checkoutToken.id)
    }, [])

    const fetchCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setCountries(countries)
        setCountry(Object.keys(countries)[0])
        console.log(countries)

    }
    return (
        <>
            <Typography variant='h6' gutterBottom> Shipping Address </Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required={true} name='firstName' label='First Name' />
                        <FormInput required={true} name='lastname' label='Last Name' />
                        <FormInput required={true} name='address' label='Address' />
                        <FormInput required={true} name='email' label='Email' />
                        <FormInput required={true} name='city' label='City' />
                        <FormInput required={true} name='zip' label='Postal code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Country </InputLabel>
                            <Select value={country} fullwidth onChange={(e) => setCountry(e.target.value)}>
                                {countries.map((pais) => (
                                    <MenuItem key={pais.id} value={pais.id}>
                                        {pais.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/*<Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Subdivision </InputLabel>
                            <Select value={ } fullwidth onChange={ }>
                                <MenuItem key={ } value={ }>
                                    Select
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Options </InputLabel>
                            <Select value={ } fullwidth onChange={ }>
                                <MenuItem key={ } value={ }>
                                    Select
                                </MenuItem>
                            </Select>
                        </Grid>*/}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
