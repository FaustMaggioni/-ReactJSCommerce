import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 100
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
}));