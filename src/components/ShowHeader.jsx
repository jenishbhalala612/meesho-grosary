import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../container/Header";
import Footer from "../container/Footer";

const ShowHeader = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
export default ShowHeader;