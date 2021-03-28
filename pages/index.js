import Head from 'next/head'
import Router from 'next/router'
import {useCookies} from 'react-cookie'


import {parseCookies} from '../helpers/'

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor turpis egestas ex porttitor consectetur. Praesent quis lectus quis nisi maximus lacinia. Ut porta, ligula id aliquet interdum, neque sapien vulputate nulla, eget viverra metus massa ut tortor. Donec bibendum fermentum justo non faucibus. Maecenas sit amet fermentum dui. Integer sollicitudin et justo ut laoreet. Sed hendrerit hendrerit arcu, ac interdum nulla. Aliquam nec fringilla lacus. Praesent arcu quam, varius at auctor eu, malesuada ac enim. Nullam egestas diam vel mauris posuere, id mattis lacus tincidunt. Integer vel condimentum magna, nec vestibulum augue. Curabitur pellentesque elementum mauris, et vestibulum elit lobortis iaculis."

let result={title:'a', text:'a'}


const HomePage = props =>{

  const [cookie, setCookie] = useCookies(["content"])
  props.title = 'Insira a URL'


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


    setCookie("text", JSON.stringify(result.text), {
      path:'/',
      maxAge:1200,
      sameSite:true,

    })

    setCookie("title", JSON.stringify(result.title), {
      path:'/',
      maxAge:1200,
      sameSite:true,

    })


    //Router.reload(window.location.pathname);
    

    }

    console.log({props})
  

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
      
      <h2>
        <p className='titleContent'>Title</p>
      </h2>
    <p className='textContent'>{props.text}</p>
    </div>

    </>
      )
  }

  HomePage.getInitialProps = async ({ req }) => {

    const data = parseCookies(req);
    console.log(data)
    

    return data


  }

  
  export default HomePage