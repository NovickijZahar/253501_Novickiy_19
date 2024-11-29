import { ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, CREATE_ROUTE, GENDER_CHECK_ROUTE, GOOGLE_REDIRECT, IP_ROUTE, LOGIN_ROUTE, PIZZA_ROUTE, REGISTRATION_ROUTE, UPDATE_ROUTE } from './utils/consts';
import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Catalog from './pages/Catalog';
import Auth from './pages/Auth';
import Pizza from './pages/Pizza';
import PizzaForm from './pages/PizzaForm';
import Ip from './pages/Ip';
import GenderCheck from './pages/GenderCheck';
import GoogleRedirect from './pages/GoogleCallback';

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_ROUTE,
        Component: PizzaForm
    },
    {
        path: UPDATE_ROUTE + '/:id',
        Component: PizzaForm
    }
]

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: PIZZA_ROUTE + '/:id',
        Component: Pizza
    },
    {
        path: IP_ROUTE,
        Component: Ip
    },
    {
        path: GENDER_CHECK_ROUTE,
        Component: GenderCheck
    },
    {
        path: GOOGLE_REDIRECT + '/:token',
        Component: GoogleRedirect
    }
]