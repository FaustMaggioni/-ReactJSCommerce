import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import CheckOut from './CheckOut/CheckOut'
const Review = ({ checkoutToken }) => {
    return (
        <div>
            <Typography variant='h4' gutterBottom> Order Summary </Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem style={{ padding: '10px' }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Cantidad: ${product.quantity}`} />
                        <Typography variant='body2'> {product.line_total.formatted_with_code}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px' }}>
                    <ListItemText primary='Total'> </ListItemText>
                    <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
                        {checkoutToken.live.subtotal.formatted_with_code}
                    </Typography>
                </ListItem>
            </List>
        </div>
    )
}

export default Review
