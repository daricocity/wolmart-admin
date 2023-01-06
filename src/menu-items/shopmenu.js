import MovieIcon from '@mui/icons-material/Movie';
import ViewListIcon from '@mui/icons-material/ViewList';

const shopmenu = {
    id: 'shopmenu',
    title: 'Shop Menu',
    type: 'group',
    children: [
        {
            id: 'categorys',
            title: 'Category',
            type: 'item',
            url: '/categorys',
            icon: MovieIcon,
            breadcrumbs: false
        },
        {
            id: 'products',
            title: 'Product',
            type: 'item',
            url: '/products',
            icon: MovieIcon,
            breadcrumbs: false
        },
        {
            id: 'cart',
            title: 'Cart',
            type: 'item',
            url: '/carts',
            icon: ViewListIcon,
            breadcrumbs: false
        }
    ]
};

export default shopmenu;
