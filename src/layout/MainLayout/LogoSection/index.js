import config from 'config';
import Logo from 'ui-component/Logo';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
