import Head from 'next/head'

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor turpis egestas ex porttitor consectetur. Praesent quis lectus quis nisi maximus lacinia. Ut porta, ligula id aliquet interdum, neque sapien vulputate nulla, eget viverra metus massa ut tortor. Donec bibendum fermentum justo non faucibus. Maecenas sit amet fermentum dui. Integer sollicitudin et justo ut laoreet. Sed hendrerit hendrerit arcu, ac interdum nulla. Aliquam nec fringilla lacus. Praesent arcu quam, varius at auctor eu, malesuada ac enim. Nullam egestas diam vel mauris posuere, id mattis lacus tincidunt. Integer vel condimentum magna, nec vestibulum augue. Curabitur pellentesque elementum mauris, et vestibulum elit lobortis iaculis."



function HomePage() {

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

    const result = await res.json()
    console.log(result)

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
        <p className='titleContent'>Title</p>
      </h2>
      <p className='textContent'>{text}</p>
    </div>

    </>
      )
  }

  
  export default HomePage