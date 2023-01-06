import { IconDashboard, IconReportAnalytics } from '@tabler/icons';

const subscribeMenu = {
    id: 'subscribe',
    title: 'Subscribe',
    type: 'group',
    children: [
        {
            id: 'wallet',
            title: 'Pay with Wallet',
            type: 'item',
            url: '/#',
            icon: IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'card',
            title: 'Pay with Card',
            type: 'item',
            url: '/#',
            icon: IconReportAnalytics,
            breadcrumbs: false
        }
    ]
};

export default subscribeMenu;
