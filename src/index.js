import App from 'App';
import config from './config';
import { store } from 'store';
import 'assets/scss/style.scss';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from 'serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from './context/cartContext/CartContext';
import { UserContextProvider } from './context/userContext/UserContext';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { ProductContextProvider } from './context/productContext/ProductContext';
import { CategoryContextProvider } from './context/categoryContext/CategoryContext';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <AuthContextProvider>
                <UserContextProvider>
                    <CategoryContextProvider>
                        <ProductContextProvider>
                            <CartContextProvider>
                                <App />
                            </CartContextProvider>
                        </ProductContextProvider>
                    </CategoryContextProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
