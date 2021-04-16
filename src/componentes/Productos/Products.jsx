import React from 'react'
import { Grid } from '@material-ui/core';
import Product from './Product/Product'
import useStyles from './style'






const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {
                    products.map((product) => {
                        return (
                            <Grid item key={product.id}
                                xs={12}
                                sm={7}
                                md={5}
                                lg={3}
                                className={classes.card}
                            >
                                <Product product={product} onAddToCart={onAddToCart} />
                            </Grid>
                        )
                    }
                    )
                }

            </Grid>
        </main>
    )
}

export default Products
