import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="site-header">
            <nav className="navbar" aria-label="Main navigation">
                <NavLink to="/" className="navbar-brand">
                    Zalex
                </NavLink>

                <div className="navbar-links">
                    <NavLink to="/request-certificate">
                        Request Certificate
                    </NavLink>

                    <NavLink to="/requests">Requests List</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
