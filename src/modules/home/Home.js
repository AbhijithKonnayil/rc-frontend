import React from 'react';
import AdminHomePage from './AdminHomePage';
import EmpHomePage from './empHomePage';
export default function Home() {
   
    const userRole = localStorage.getItem("userRole")

    function buildUi() {
        if (userRole == 'EMP') return <EmpHomePage />;
        else return <AdminHomePage />

    }
    return (
        <div>
           
           
            {buildUi()}
        </div>
    );

}
