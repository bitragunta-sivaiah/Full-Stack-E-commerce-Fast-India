import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import useMobile from '../hook/useMobile';
import { useSelector } from 'react-redux';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const [isMobile] = useMobile();
    const navigate = useNavigate();
    const location = useLocation();
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalQty,setTotalQty] = useState(0);
    const [openCartSection,setOpenCartSection] = useState(false)

    const user = useSelector((state) => state.user);
    // console.log('user', user);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const cartItem = useSelector(state => state.cartItem.cart)

    const isSearchPage = location.pathname === '/search';

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate('/login');
            return;
        }
        navigate('user');
    }

    // total items count and total items
    useEffect(()=>{
        const qty = cartItem.reduce((preve,curr)=>{
                    return preve + curr.quantity
                },0)
                setTotalQty(qty)
                
                const tPrice = cartItem.reduce((preve,curr)=>{
                    return preve + (curr.productId.price * curr.quantity)
                },0)
                setTotalPrice(tPrice)
    },[cartItem])
    return (
        <header className='h-36 lg:h-20 sticky top-0 z-40 flex flex-col justify-between py-2 items-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex items-center px-2 justify-between'>
                        {/* logo */}
                        <Link to='/'>
                            <h1 className='text-3xl font-bold font-rubik text-primary-blue'>Fast<span className='text-accent-green'>India</span></h1>
                        </Link>
                        {/* search */}
                        <div className='hidden lg:block'>
                            <Search />
                        </div>
                        {/* user profile */}
                        <button onClick={handleMobileUser} className='text-text-gray lg:hidden absolute right-2'>
                            <HiOutlineUserCircle size={40} />
                        </button>
                        {/* cart */}
                        <div className="flex items-center justify-center gap-8">
                            {user?._id ? (
                                <div className='relative hidden lg:block'>
                                    <div onClick={() => setOpenUserMenu(!openUserMenu)} className='flex cursor-pointer items-center gap-2'>
                                        <p>Account</p>
                                        {
                                            !openUserMenu ? (
                                                <VscTriangleDown size={22} />
                                            ) : (
                                                <VscTriangleUp size={22} />
                                            )
                                        }
                                    </div>
                                    {
                                        openUserMenu && (
                                            <div className="right-0 absolute h-20 top-16">
                                                <div className="bg-bg-light-cream font-rubik shadow-lg p-4 min-w-52">
                                                    <UserMenu close={handleCloseUserMenu} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <Link to={'/login'} className='text-xl font-inter hidden lg:block'>Login</Link>
                            )}



                            {
                                isMobile ? (
                                    <div className="fixed bottom-0 left-0 w-full bg-primary-blue text-white p-4 flex justify-between items-center">
                                    <div>
                                    {
                                            cartItem[0]  ? (
                                               <div>
                                                 <p className='max-md:text-[12px]' >{totalQty} items</p>
                                                <p className='max-md:text-[14px] font-semibold' >Total : {DisplayPriceInRupees(totalPrice)}</p>
                                               </div>
                                            ) : (
                                                <p className='max-md:text-[14px]'>Empty Cart</p>
                                            )
                                      }
                                        {/* <p>1 item</p>
                                        <p>Total Price: ₹37</p> */}
                                    </div>
                                    <Link to={'/cart'} className="bg-white text-primary-blue px-4 py-2 rounded">View Cart</Link>
                                </div>
                                ):(
                                    <button onClick={()=>setOpenCartSection(true)} className='flex items-center bg-primary-blue/90 text-white w-[140px] h-[55px] px-2 py-1'>
                                    <HiOutlineShoppingCart size={30} />
                                    <span className='flex flex-col items-start justify-center ml-2 font-inter'>
                                    {
                                            cartItem[0]  ? (
                                               <div>
                                                 <p className='max-md:text-[12px]' >{totalQty} items</p>
                                                <p className='max-md:text-[14px] font-semibold' >{DisplayPriceInRupees(totalPrice)}</p>
                                               </div>
                                            ) : (
                                                <p className='max-md:text-[14px]'>Empty Cart</p>
                                            )
                                      }
                                        {/* <p className='max-md:text-[14px]'>1 item</p>
                                        <p className='max-md:text-[14px]'>Total Price</p> */}
                                    </span>
                                </button>
                                )
                            }
                          


                          
                        </div>
                    </div>
                )
            }
            <nav className='w-full lg:hidden relative bottom-2'>
                <Search />
            </nav>
            {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
        </header>
    );
}

export default Header;
