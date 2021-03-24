import Footer from './footer'
import Navbar from './nav'

const Layout = ({children}) => {
    return ( 
        <div className='content'>
            <Navbar/>
            {children}
            <Footer/>
        </div>

     );
}


export default Layout;