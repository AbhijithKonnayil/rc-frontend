import React from 'react';
import EmpHomePage from './empHomePage';
export default function Home() {

    const userRole = localStorage.getItem("userRole")

    function buildUi() {
        return <EmpHomePage />;
    }
    return (
        <div>
            {buildUi()}
        </div>
    );

}
