import themes from 'themes';
import { useContext, lazy } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { ThemeProvider } from '@mui/material/styles';
import NavigationScroll from 'layout/NavigationScroll';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext/AuthContext';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

const User = Loadable(lazy(() => import('views/user')));
const CartDetail = Loadable(lazy(() => import('views/cart')));
const Product = Loadable(lazy(() => import('views/product')));
const Login = Loadable(lazy(() => import('views/auth/Login')));
const UserList = Loadable(lazy(() => import('views/userList')));
const Category = Loadable(lazy(() => import('views/category')));
const CartList = Loadable(lazy(() => import('views/cartList')));
const NewProduct = Loadable(lazy(() => import('views/newProduct')));
const NewCategory = Loadable(lazy(() => import('views/newCategory')));
const ProductList = Loadable(lazy(() => import('views/productList')));
const CategoryList = Loadable(lazy(() => import('views/categoryList')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const App = () => {
    const { user } = useContext(AuthContext);
    const customization = useSelector((state) => state.customization);
    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes>
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                            <Route
                                path="/product/:productId"
                                element={user ? <MainLayout Children={<Product />} /> : <Navigate to="/login" />}
                            />
                            <Route
                                path="/categorys/:categoryId"
                                element={user ? <MainLayout Children={<Category />} /> : <Navigate to="/login" />}
                            />
                            <Route
                                path="/newProduct"
                                element={user ? <MainLayout Children={<NewProduct />} /> : <Navigate to="/login" />}
                            />
                            <Route
                                path="/cart/:cartId"
                                element={user ? <MainLayout Children={<CartDetail />} /> : <Navigate to="/login" />}
                            />
                            <Route
                                path="/newCategory"
                                element={user ? <MainLayout Children={<NewCategory />} /> : <Navigate to="/login" />}
                            />
                            <Route
                                path="/categorys"
                                element={user ? <MainLayout Children={<CategoryList />} /> : <Navigate to="/login" />}
                            />
                            <Route path="/carts" element={user ? <MainLayout Children={<CartList />} /> : <Navigate to="/login" />} />
                            <Route path="/users" element={user ? <MainLayout Children={<UserList />} /> : <Navigate to="/login" />} />
                            <Route path="/" element={user ? <MainLayout Children={<DashboardDefault />} /> : <Navigate to="/login" />} />
                            <Route path="/user/:userId" element={user ? <MainLayout Children={<User />} /> : <Navigate to="/login" />} />
                            <Route path="/products" element={user ? <MainLayout Children={<ProductList />} /> : <Navigate to="/login" />} />
                        </Routes>
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};

export default App;
