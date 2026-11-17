import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RequestCertificate from "../pages/RequestCertificate";
import RequestsList from "../pages/RequestsList";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={<Navigate to="/request-certificate" replace />}
                    />

                    <Route
                        path="/request-certificate"
                        element={<RequestCertificate />}
                    />

                    <Route path="/requests" element={<RequestsList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
