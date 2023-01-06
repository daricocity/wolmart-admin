import MailIcon from '@mui/icons-material/Mail';
import MessageIcon from '@mui/icons-material/Message';
import FeedbackIcon from '@mui/icons-material/Feedback';

const eAccountMenu = {
    id: 'eAccountMenu',
    title: 'E-Account',
    type: 'group',
    children: [
        {
            id: 'transfer',
            title: 'Transfer',
            type: 'item',
            url: '',
            icon: MailIcon,
            breadcrumbs: false
        },
        {
            id: 'pay',
            title: 'Pay Referal',
            type: 'item',
            url: '',
            icon: FeedbackIcon,
            breadcrumbs: false
        },
        {
            id: 'transactions',
            title: 'Transaction Records',
            type: 'item',
            url: '',
            icon: MessageIcon,
            breadcrumbs: false
        }
    ]
};

export default eAccountMenu;
