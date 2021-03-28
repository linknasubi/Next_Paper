import '../styles/globals.css'
import Layout from '../comps/layout'
import {CookiesProvider} from 'react-cookie'

function MyApp({Component, pageProps}){
    return (

        <>
        <CookiesProvider>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </CookiesProvider>
        </>
    );
}

export default MyApp