import config from '../../config';
import { Grid } from '@mui/material';
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import { useEffect, useState, useMemo } from 'react';
import Chart from '../../ui-component/chart/Chart';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import WidgetSm from '../../ui-component/widgetSm/widgetSm';
import { axiosHandler, errorHandler } from '../../utils/utils';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [userStats, setUserStats] = useState([]);
    const MONTHS = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], []);

    useEffect(() => {
        setLoading(false);
        const getStats = async () => {
            try {
                const res = await axiosHandler({
                    method: 'get',
                    url: `${config.proxy}/users/stats`,
                    token: JSON.parse(localStorage.getItem('user')).accessToken
                }).catch((e) => console.log(errorHandler(e)));
                const statsList = res.data.sort(function (a, b) {
                    return a._id - b._id;
                });
                statsList.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {
                            name: MONTHS[item._id - 1],
                            'New User': item.total
                        }
                    ])
                ); // for each res. set the data
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard data={userStats} isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <Chart data={userStats} title="User Analytics" grid dataKey="New User" isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WidgetSm isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
