import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen} = useContext(CartContext);
    return(
        <>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
               <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>Shop</Link>
                {
                    currentUser ? 
                        <span onClick={signOutUser} className='nav-link'>Sign Out</span>
                        :
                        <Link className='nav-link' to='/auth'>Sign In</Link>
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
          <Outlet />
        </>
    )
}

export default Navigation;