import Footer from './footer'
import Navbar from './nav'

const Layout = ({children}) => {
    return ( 
        <div className='general'>
            <div className='content'>
                <Navbar/>
                {children}
            </div>
            <Footer/>
        </div>

     );
}


export default Layout;