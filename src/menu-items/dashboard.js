import { IconDashboard } from '@tabler/icons';

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
