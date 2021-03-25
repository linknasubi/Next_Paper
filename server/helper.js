function helpParsing(){

    let obj = {};
  
    /**
     * 
     * @param {array} array Array to be checked
     * @param {array} values Value or values to be removed
     * 
     * @returns {array} A new array with the refered values removed
     */
  
    const remove = (array, values) => {
      let new_arr = [];
  
  
      if (values.lenght == 0 || values.length == 1){
        for(let i of array){
  
          if(i != values){
            new_arr.push(i);
          }
  
        }
      }
  
      else{
        
        for(let i in array){
    
          value.forEach( (value) => {       
            if(i != value){
              new_arr.push(i);
            }
          })
        }
      }
  
      return new_arr;
    }

    /**
     * 
     * @param {array} values Array of strings
     * 
     * @returns The mean value
     */

    const meanWords = (values) => {

        let value = 0;

        for(let i of values){
            value += (i.split(' ').length);
        }

        value = value/values.length;

        return value;

    };

    /**
     * 
     * @param {*} values Array of phrases.
     * @param {*} mean Words mean from the array of phrases
     * 
     * @returns The standard deviation value
     */

    const devWords = (values, mean) => {

        let value = 0;

        for(let i of values){

            value += Math.pow( ( (i.split(' ').length) - mean ), 2);
        }

        value = value/values.length;
        value = Math.pow(value, (1/2));

        return value;

    }
  
    /**
     * 
     * @param {array} arr_str String array to be evaluated
     * 
     * @returns The most likely string to be the title
     */
  
  
    const probTitle = async (arr_str) => {
  
      let spac_count = 0;
      let aux_spac;
      let chosen_str;
  
      for(let str of arr_str){
        aux_spac = str.split(' ');
        aux_spac = remove(aux_spac, ['']).length;
  
        if(aux_spac > spac_count){
          spac_count = aux_spac;
          chosen_str = str;
        }
  
      }
  
      return chosen_str;
  
      
    }


    const probText = async (arr_str) => {
        let great_str = 0;
        let aux = 0;
        let chosen_strs = [];
        let mean_str; let dev_str;
        let lim_min, lim_max;


        //Identifies the greatest phrase based in its number of words.
        for(let i of arr_str){
            aux = i.split(' ').length;

            if(aux > great_str){
                great_str = aux;
            }
        }

        //Removes all phrases that has less than 20% the size of the greatest phrase.
        arr_str = arr_str.filter(item => item.split(' ').length > great_str * 0.3); 

        mean_str = meanWords(arr_str);
        dev_str = devWords(arr_str, mean_str);

        /*
          If per_str > 1 then its values is generally smaller than the mean, so its values is adjusted
          to choose the most likely strings

          The same is applied to per_str < 1.
        */
        per_str = (great_str - mean_str)/dev_str

        if(per_str > 1){
          lim_max = per_str * 1.1;
          lim_min = per_str * 0.5;
        }

        else{
          lim_min = per_str * 1.1;
          lim_max = per_str * 0.5;
        }

        

        //console.log({mean_str, dev_str, great_str, per_str, lim_max, lim_min});

        for(let i of arr_str){

            aux = i.split(' ').length;

            if( aux >= (mean_str - (dev_str*lim_min)) && aux <= (mean_str + (dev_str*lim_max) )){


                chosen_strs.push(i);
            }

        }

        return chosen_strs;

    }
    
    obj.probTitle = probTitle;
    obj.probText = probText;
    
    return obj
  
  }

  
module.exports = {
    helpParsing
};