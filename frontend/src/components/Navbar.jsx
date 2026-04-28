import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const NeonLogo = () => (
  <svg width="110" height="36" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6C5CE7"/>
        <stop offset="100%" stopColor="#00B894"/>
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#ng)" y="2"/>
    <line x1="9" y1="10" x2="9" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="23" y1="10" x2="23" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="9" y1="10" x2="23" y2="26" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <circle cx="24.5" cy="27" r="2" fill="#81ecec"/>
    <text x="40" y="24" fontFamily="'Cormorant Garamond', serif" fontSize="22" fontWeight="500" fill="url(#ng)" letterSpacing="-0.5">Neon</text>
  </svg>
);

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  const navLinkClass = 'flex flex-col items-center gap-1 text-xs tracking-widest text-gray-500 hover:text-purple-600 transition-colors duration-200'
  const activeBar = 'w-full border-none h-[2px] bg-gradient-to-r from-purple-500 to-teal-400 hidden'

  return (
    <div className='flex items-center justify-between py-5'>
      <Link to='/'><NeonLogo /></Link>

      <ul className='hidden sm:flex gap-8 text-xs tracking-widest font-medium uppercase'>
        <NavLink to='/' className={navLinkClass}>
          <p>Home</p>
          <hr className={activeBar} />
        </NavLink>
        <NavLink to='/collection' className={navLinkClass}>
          <p>Collection</p>
          <hr className={activeBar} />
        </NavLink>
        <NavLink to='/About' className={navLinkClass}>
          <p>About</p>
          <hr className={activeBar} />
        </NavLink>
        <NavLink to='/Contact' className={navLinkClass}>
          <p>Contact</p>
          <hr className={activeBar} />
        </NavLink>
      </ul>

      <div className='flex items-center gap-5'>
        <button
          onClick={() => setShowSearch(true)}
          className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-50 transition-colors'
        >
          <img src={assets.search_icon} className='w-4' alt="Search" />
        </button>

        <div className='group relative'>
          <button
            onClick={() => token ? null : navigate('/login')}
            className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-50 transition-colors'
          >
            <img className='w-4' src={assets.profile_icon} alt="Profile" />
          </button>
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-1 w-40 py-3 px-4 bg-white border border-gray-100 shadow-lg rounded-xl text-sm text-gray-500'>
                <p className='cursor-pointer hover:text-purple-600 py-1 px-2 rounded-lg hover:bg-purple-50'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-purple-600 py-1 px-2 rounded-lg hover:bg-purple-50'>Orders</p>
                <hr className='my-1 border-gray-100'/>
                <p onClick={logout} className='cursor-pointer hover:text-red-500 py-1 px-2 rounded-lg hover:bg-red-50'>Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-50 transition-colors'>
          <img src={assets.cart_icon} className='w-4 min-w-4' alt="Cart" />
          {getCartCount() > 0 && (
            <span className='absolute -right-1 -bottom-1 w-4 h-4 text-center leading-4 text-white text-[9px] rounded-full'
              style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}>
              {getCartCount()}
            </span>
          )}
        </Link>

        <button onClick={() => setVisible(true)} className='sm:hidden w-8 h-8 flex items-center justify-center'>
          <img src={assets.menu_icon} className='w-5' alt="Menu" />
        </button>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-50 transition-all duration-300 shadow-2xl ${visible ? 'w-72' : 'w-0'}`}>
        <div className='flex flex-col h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-5 cursor-pointer border-b border-gray-100'>
            <img className='h-3 rotate-180' src={assets.dropdown_icon} alt="" />
            <p className='text-sm text-gray-500'>Back</p>
          </div>
          <div className='flex flex-col gap-1 p-4'>
            {[['/', 'Home'], ['/collection', 'Collection'], ['/About', 'About'], ['/Contact', 'Contact']].map(([path, label]) => (
              <NavLink
                key={path}
                onClick={() => setVisible(false)}
                className='py-3 px-4 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 text-sm tracking-wide'
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className='mt-auto p-5 border-t border-gray-100'>
            <p className='text-xs text-gray-400 text-center'>© 2026 Neon — Fashion Redefined</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar