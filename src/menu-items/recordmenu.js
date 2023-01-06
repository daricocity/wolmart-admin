import MovieIcon from '@mui/icons-material/Movie';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const recordmenu = {
    id: 'recordmenu',
    title: 'Record Menu',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'All Users List',
            type: 'item',
            url: '/users',
            icon: PeopleOutlineIcon,
            breadcrumbs: false
        },
        {
            id: 'transactions',
            title: 'All Transactions List',
            type: 'item',
            url: '/#',
            icon: MovieIcon,
            breadcrumbs: false
        },
        {
            id: 'referal',
            title: 'User Referal List',
            type: 'item',
            url: '/#',
            icon: MovieIcon,
            breadcrumbs: false
        }
    ]
};

export default recordmenu;
