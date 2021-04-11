import React from 'react'
import { Grid } from '@material-ui/core';
import Product from './Product'
const prods = [
    { src: 'https://sporting.vteximg.com.br/arquivos/ids/219784-1000-1000/4CD4371-004-1.jpg?v=637445899197800000', id: 1, name: 'Shoes', description: 'Running shoes', price: '$10' },
    { src: 'https://http2.mlstatic.com/D_NQ_NP_721393-MLA44666190295_012021-O.w', id: 2, name: 'Macbook', description: 'Apple macbook', price: '$5' },

]



const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {
                    prods.map((product) => (
                        <Grid item key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}>
                            <Product product={product} />
                        </Grid>
                    ))
                }

            </Grid>
        </main>
    )
}

export default Products
