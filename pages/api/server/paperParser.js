/*

  Problemas a serem resolvidos:

    1 - Separar o título do resto do texto.

    2 - Encontrar unicamente o texto referente a notícia.

    3 - Uma vez inserida a url identificar se o link se refere a um portal de notícias


*/

const puppeteer = require('puppeteer');

const helper = require('./helper.js').helpParsing();




function textSearch(url){

    let obj = {};

    /**
     * Creates the request and load the data necessary to be parsed
     */

    const loadingData = async () =>{

        console.log('Starting to load the data...');
        
    
        obj._browser = await puppeteer.launch({headless:true});
        obj._page = await obj._browser.newPage();
      
      
        await obj._page.setRequestInterception(true);
        
        obj._page.on('request', request => {
          if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'javascript') //Aborts request to a resource of image or stylesheet type
            request.abort();
          else
            request.continue();
        });
    
        await obj._page.goto(url);
        await obj._page.waitForSelector('footer', {timeout:10000}); //Waits for the selector mentioned to be loaded
    
        console.log('Page loaded!');
        
      }

      /**
       * Closes the request and the data once the data have been parsed
       */
    
      const closingData = async () =>{
    
        console.log('Closing the page...');
    
        await obj._page.close();
        await obj._browser.close();
    
        console.log('Page closed!');
    
      }

      /**
       * Properly deals with the requested data and assigns 'data' as attribute to the main object of the function
       */

      const parsingData = async () => {

        await loadingData()
        .then(
          await setTimeout( ()=>{console.log('Querying the data...')}, 2000 )
          )
        .catch(err=>console.log(err));


        text = await obj._page.$$eval('p', el=>{
          data = [];
          for(var element of el){
            data.push(element.innerText);
          }
          return data;
        });
        
        //console.log(text)
        text = await helper.probText(text)


        title = await obj._page.$$eval('h1', el=>{ //Gets inner text from elements in the browser context and returns as array
          data = [];
          for(var element of el){
            data.push(element.innerText);
          }
          return data;});
        
        //console.log(title)
        title = await helper.probTitle(title)
        

        //console.log(text);
        
        obj.text = text;
        obj.title = title;

        await closingData();

      }
      
      obj.parsingData = parsingData;


      return obj;

}


// const searched = textSearch("https://internacional.estadao.com.br/noticias/geral,passageiros-em-voos-indiretos-do-brasil-para-portugal-deverao-fazer-quarentena,70003638515");
// searched.parsingData();


module.exports = {
  textSearch
}
