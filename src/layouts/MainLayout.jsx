import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function MainLayout() {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
