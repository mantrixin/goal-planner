import { APP_PAGES } from './data';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../styles/layout';
import ProtectedRoute from '../component/global/ProtectedRoute';

const AppRouter = () => {
    return(
        <BrowserRouter>
        <Routes>
            {APP_PAGES.map((page) => (
                <Route
                    key={page.link}
                    path={page.link}
                    element={
                        page.link === '/' || page.link === '*' ? (
                            <Layout>
                                <page.element />
                            </Layout>
                        ) : (
                            <ProtectedRoute>
                                <Layout>
                                    <page.element />
                                </Layout>
                            </ProtectedRoute>
                        )
                    }
                />
            ))}
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;