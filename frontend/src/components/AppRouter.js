import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import { CATALOG_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { Context } from '..';

const AppRouter = () => {
    const { user } = useContext(Context);
    
    return (    
        <Routes>
            {user.user.role === 'admin' && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to={CATALOG_ROUTE} />} />
        </Routes>
    )
}

export default AppRouter;