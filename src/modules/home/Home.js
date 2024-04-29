import React from 'react';
import { useNavigate } from "react-router";
import authServices from '../../services/authServices';
import AdminHomePage from './AdminHomePage';
import EmpHomePage from './empHomePage';
export default function Home() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole")

    function buildUi() {
        if (userRole == 'EMP') return <EmpHomePage />;
        else return <AdminHomePage />

    }
    return (
        <div>
            <button onClick={() => { navigate("/assign-curriculum"); }} >Assign Curriculum</button>

            <button onClick={() => { authServices.logout(); navigate("/"); }} >Logout</button>

            {buildUi()}
        </div>
    );

}
