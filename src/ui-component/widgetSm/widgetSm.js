import config from '../../config';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import User1 from 'assets/images/users/avatar image.png';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { axiosHandler, errorHandler, capitalizeFirstLetter, formatDate } from '../../utils/utils';

const WidgetSm = ({ isLoading }) => {
    const theme = useTheme();
    const [newUsers, setNewUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axiosHandler({
                    method: 'get',
                    url: `${config.proxy}/users?new=true`,
                    token: JSON.parse(localStorage.getItem('user')).accessToken
                }).catch((e) => console.log(errorHandler(e)));
                setNewUsers(res.data.filter((item) => item.isAdmin !== true));
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">New Join Members</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {newUsers.map((user, ind) => (
                                    <div key={ind}>
                                        <Grid container alignItems="center" justifyContent="flex-start">
                                            <Grid item>
                                                <Avatar
                                                    src={user.profilePic ? user.profilePic : User1}
                                                    sx={{
                                                        ...theme.typography.mediumAvatar,
                                                        cursor: 'pointer'
                                                    }}
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="span">
                                                    <Typography variant="h4">{capitalizeFirstLetter(user.username)}</Typography>
                                                    <Typography variant="h6">{formatDate(user.createdAt)}</Typography>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ my: 1.5 }} />
                                    </div>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

WidgetSm.propTypes = {
    isLoading: PropTypes.bool
};

export default WidgetSm;
