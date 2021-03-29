import Head from 'next/head'
import Router from 'next/router'
import {useCookies} from 'react-cookie'


import {parseCookies} from '../helpers/'

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor turpis egestas ex porttitor consectetur. Praesent quis lectus quis nisi maximus lacinia. Ut porta, ligula id aliquet interdum, neque sapien vulputate nulla, eget viverra metus massa ut tortor. Donec bibendum fermentum justo non faucibus. Maecenas sit amet fermentum dui. Integer sollicitudin et justo ut laoreet. Sed hendrerit hendrerit arcu, ac interdum nulla. Aliquam nec fringilla lacus. Praesent arcu quam, varius at auctor eu, malesuada ac enim. Nullam egestas diam vel mauris posuere, id mattis lacus tincidunt. Integer vel condimentum magna, nec vestibulum augue. Curabitur pellentesque elementum mauris, et vestibulum elit lobortis iaculis."

var result={title:'', text:''}


const HomePage = props =>{

  const [cookie, setCookie] = useCookies(["content"])
  let text, title;


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

    result = await res.json();
    

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

    Router.reload(window.location.pathname);

    
  }

    if(props.text != undefined){

      text = textcookieParser(props.text)
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
        
        <h2>
          <p className='titleContent'>{props.title}</p>
        </h2>
  
        {text.map(txt=><p className='textContent'>{txt}</p>)}

  
      </div>
      </>
        )
  }




  HomePage.getInitialProps = async ({ req }) => {

    const data = parseCookies(req);
    //console.log(data)
    

    return data


  }


  function textcookieParser(text){
    let array = [];
    let toRemove = ['\\', '[', ']'];
    let aux, aux_2, aux_3;
    let ind_aux = 0;

    text = Array.from(text);
    text = text.filter((i) => !toRemove.includes(i));
    text = text.join('');

    for(let k=0; k<text.length-3; k++){

      aux = text[k]
      aux_2 = text[k+1]
      aux_3 = text[k+2]

      if(aux=='"' && aux_2 == ',' && aux_3 == '"' && ind_aux!=0){
        array.push(text.slice(ind_aux+3, k));
        ind_aux = k;

      }

      if(aux=='"' && aux_2 == ',' && aux_3 == '"' && ind_aux==0){
        array.push(text.slice(ind_aux+1, k));
        ind_aux = k;

      }

    }

    return array

  }

  
  export default HomePage