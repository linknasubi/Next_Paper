import Footer from './footer'


const Layout = ({children}) => {
    return ( 
        <div className='content'>
            {children}
            <Footer/>
        </div>

     );
}


export default Layout;