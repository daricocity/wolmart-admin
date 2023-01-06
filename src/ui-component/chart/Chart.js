import { useState } from 'react';
import PropTypes from 'prop-types';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const status = [
    {
        value: 'lyear',
        label: 'Last Year'
    },
    {
        value: 'tyear',
        label: 'This Year'
    }
];

const Chart = ({ title, data, dataKey, grid, isLoading }) => {
    const [value, setValue] = useState('lyear');
    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Data Chart</Typography>
                                        </Grid>
                                        <Grid item style={{ marginBottom: '20px' }}>
                                            <Typography variant="h4">{title}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <ResponsiveContainer width="100%" aspect={2.07 / 1}>
                                        <LineChart data={data}>
                                            <XAxis dataKey="name" stroke="#5550bd" />
                                            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                                            <Tooltip />
                                            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

Chart.propTypes = {
    data: PropTypes.array,
    grid: PropTypes.bool,
    title: PropTypes.string,
    dataKey: PropTypes.string,
    isLoading: PropTypes.bool
};

export default Chart;
