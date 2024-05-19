import { default as React } from 'react';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import authServices from '../../services/authServices';

import './sidebar.css';

const Navigation = () => {
  const userRole = localStorage.getItem("userRole")
  const empNav = [
    { title: "Home", route: "/home", },
    { title: "Trainings", route: "/add-curriculum", },
    { title: "Schedule", route: "/schedule", },
    { title: "Analytics", route: "/analytics", },
    { title: "Certifications", route: "/certifications", },
    { title: "Management", route: "/management", }

  ]
  const adminNav = [
    { title: "Home", route: "/home", },
    { title: "Assign Curriculum", route: "/assign-curriculum", },
    { title: "Add Curriculum", route: "/add-curriculum", },

  ]
  const navItems = userRole == "EMP" ? empNav : adminNav;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="your-logo-url" alt="Logo" /> {/* Replace with your logo URL */}
      </div>
      <nav className="nav">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${location.pathname == item.route ? 'active' : ''}`}
            >
              <a href={item.route}>{item.title}</a>
            </li>

          ))}
        </ul>
        <button onClick={() => { authServices.logout(); navigate("/"); }} >Logout</button>

      </nav>
    </div>
  );
}

export function NavigationWrapper({ Child }) {
  return (
    <div className="">
      <div className="flex">
        {/* Navigation Side Pane */}
        <div className="">
          <Navigation />
        </div>
        <div className="flex-1 px-8 py-4  ">
          {Child}
        </div>
      </div>
    </div>
  );
}
export default Navigation;
