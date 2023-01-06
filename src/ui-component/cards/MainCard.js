import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Card, CardContent, CardHeader, Divider, Typography, Grid } from '@mui/material';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            button,
            productSection,
            userSection,
            categoryListSection,
            productListSection,
            cartDetailSection,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary[200] + 75,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && button && (
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <CardHeader sx={headerSX} title={title} action={secondary} />
                                </Grid>
                                <Grid item>
                                    {userSection && (
                                        <Tooltip title="Back">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/users">
                                                    <ArrowBackIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {cartDetailSection && (
                                        <Tooltip title="Back">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/carts">
                                                    <ArrowBackIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {productSection && (
                                        <Tooltip title="Back">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/products">
                                                    <ArrowBackIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {productListSection && (
                                        <Tooltip title="Add">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/newProduct">
                                                    <AddIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {categoryListSection && (
                                        <Tooltip title="Add">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/newCategory">
                                                    <AddIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {darkTitle && button && (
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                                </Grid>
                                <Grid item>
                                    {userSection && (
                                        <Tooltip title="Back">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/users">
                                                    <ArrowBackIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {cartDetailSection && (
                                        <Tooltip title="Back">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/carts">
                                                    <ArrowBackIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {productSection && (
                                        <Tooltip title="Back">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/products">
                                                    <ArrowBackIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {productListSection && (
                                        <Tooltip title="Add">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/newProduct">
                                                    <AddIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {categoryListSection && (
                                        <Tooltip title="Add">
                                            <Fab
                                                color="success"
                                                aria-label="add"
                                                size="small"
                                                style={{ marginRight: '22px', background: '#00C853', alignItems: 'center' }}
                                            >
                                                <Link to="/newCategory">
                                                    <AddIcon
                                                        style={{ cursor: 'pointer', marginTop: '10px', fontSize: '18px', color: '#fff' }}
                                                    />
                                                </Link>
                                            </Fab>
                                        </Tooltip>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {!darkTitle && title && !button && (
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <CardHeader sx={headerSX} title={title} action={secondary} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {darkTitle && !button && (
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    sx: PropTypes.object,
    button: PropTypes.bool,
    border: PropTypes.bool,
    content: PropTypes.bool,
    shadow: PropTypes.string,
    children: PropTypes.node,
    boxShadow: PropTypes.bool,
    darkTitle: PropTypes.bool,
    contentSX: PropTypes.object,
    userSection: PropTypes.bool,
    productSection: PropTypes.bool,
    contentClass: PropTypes.string,
    cartDetailSection: PropTypes.bool,
    productListSection: PropTypes.bool,
    categoryListSection: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
