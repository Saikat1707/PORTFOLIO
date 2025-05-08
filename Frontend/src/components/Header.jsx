import React from 'react'
import { Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl">My Application</h1>
            <nav className="mt-2">
            <a href="/" className="text-white mr-4">Home</a>
            <a href="/about" className="text-white">About</a>
            </nav>
        </header>
    </>
  )
}

export default Header
