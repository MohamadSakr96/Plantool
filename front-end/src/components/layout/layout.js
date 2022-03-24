import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar/navbar';

// this layout component render the navbar for specific pages

export const Layout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}
