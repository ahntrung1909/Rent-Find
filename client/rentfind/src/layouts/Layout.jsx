import React from 'react'
import Header from '../components/Header/Header'
import { Outlet, useRouteError } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import ErrorPage from '../ErrorPage'
import './layout.scss'

function ErrorBoundary({ children }) {
    const error = useRouteError();
    if (error) {
        return <ErrorPage />;
    }
    return children;
}

export default function Layout() {
  return (
    <div className='root'>
        <Header />
        <main>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </main>
        <Footer />
    </div>
  )
}
