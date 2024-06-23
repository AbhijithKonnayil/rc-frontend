import { default as React } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import logo from "../../imgs/logo.png";
import authServices from "../../services/authServices";
import "./sidebar.css";

const Navigation = () => {
  const userRole = localStorage.getItem("userRole");
  const empNav = [
    { title: "Home", route: "/home" },
    { title: "Trainings", route: "/trainings" },
    { title: "Schedule", route: "/schedule" },
    { title: "Analytics", route: "/analytics" },
    { title: "Certifications", route: "/certifications" },
  ];
  const adminNav = [
    ...(["EMP", "MNG"].includes(userRole) ? empNav : []),
    { title: "Management", route: "/management" },
  ];
  const navItems = userRole == "EMP" ? empNav : adminNav;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="sidebar flex flex-col h-screen">
      <div className="logo p-4 flex">
        <img src={logo} height={100} width={100} />
      </div>
      <nav className="nav flex flex-col flex-1 justify-between ">
        <ul className="flex-1">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${
                location.pathname === item.route ? "active" : ""
              }`}
            >
              <a href={item.route}>{item.title}</a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            authServices.logout().then(() => {
              navigate("/");
            });
          }}
          className="m-4 bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export function NavigationWrapper({ Child }) {
  return (
    <div className="">
      <div className="flex">
        {/* Navigation Side Pane */}
        <div className="">
          <Navigation />
        </div>
        <div className="flex-1 px-8 py-4 flex flex-col h-screen">{Child}</div>
      </div>
    </div>
  );
}
export default Navigation;
