import { makeStyles } from '@material-ui/core/styles';
import { positions } from '@material-ui/system';

export default makeStyles(() => ({
    root: {
        minWidth: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'bottom'
    },
    cardContent: {
        display: 'flex' | '',
        justifyContent: 'space-between',
    }

}
));