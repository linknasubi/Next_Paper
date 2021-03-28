import Head from 'next/head'
import Router from 'next/router'
import {useCookies} from 'react-cookie'


import {parseCookies} from '../helpers/'

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor turpis egestas ex porttitor consectetur. Praesent quis lectus quis nisi maximus lacinia. Ut porta, ligula id aliquet interdum, neque sapien vulputate nulla, eget viverra metus massa ut tortor. Donec bibendum fermentum justo non faucibus. Maecenas sit amet fermentum dui. Integer sollicitudin et justo ut laoreet. Sed hendrerit hendrerit arcu, ac interdum nulla. Aliquam nec fringilla lacus. Praesent arcu quam, varius at auctor eu, malesuada ac enim. Nullam egestas diam vel mauris posuere, id mattis lacus tincidunt. Integer vel condimentum magna, nec vestibulum augue. Curabitur pellentesque elementum mauris, et vestibulum elit lobortis iaculis."

let result={title:'a', text:'a'}


const HomePage = props =>{

  const [cookie, setCookie] = useCookies(["content"])

  
  const submitUrl = async event => {
    event.preventDefault();

    const res = await fetch('/api/paper', {
      body: JSON.stringify({
        urlText:urlText.value
      }),
      headers:{
        'Content-Type': 'application/json'
      },
      method:'POST'

    })

    result = await res.json()

    
    

    setCookie("user", JSON.stringify(result), {
      path:'/',
      maxAge:120,
      sameSite:true,

    })

    console.log(result)


    //Router.reload(window.location.pathname);
  

    }
  
    return (
    <>
    <Head>
      <title>Beauty Papering</title>
      <link rel="shortcut icon" type="image/jpg" href="faviconNews.png"/>
    </Head>

    <div>
    <form onSubmit={submitUrl}>
      <input name="urlText" type="text" id='urlText' required/>

    </form>
      {props.title}
      <h2>
        <p className='titleContent'>Title</p>
      </h2>
      <p className='textContent'>{text}</p>
    </div>

    </>
      )
  }

  HomePage.getInitialProps = async ({ req }) => {

    const data = parseCookies(req);
    

    return {data: data}


  }

  
  export default HomePage