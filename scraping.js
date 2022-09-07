//Author : Hardik Pratap Singh

//AIM : I am trying to get the data of countries and their capitals from wikipedia and storing it in the 
//JSON format in a file named hardik_p_singh.json

//However, the output is not looking that good, but yeah all countries and their capitals are successfully matched... 


const axios = require("axios");
const cheerio = require("cheerio"); 
const fs = require("fs");


const url = "https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_and_their_capitals_in_native_languages" ; 

async function scrape(){
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const countryname = $("table tr") ; 
    // const capitalname = $("table tr td:nth-child(2)") ; 
    let obj = {
        country : "" , 
        capital : "" , 
    };

    let s = "" ; 

    const matrix = [] ; 
    countryname.each(function (idx,el) {
        const coun = $(el).find("td:nth-child(1)").text().trim() ; 
        const capi = $(el).find("td:nth-child(2)").text().trim() ; 
        // const capi = $(el).find("nth-child(2)").text() ; 
        // obj.country = coun ;  
        // obj.capital = capi ;  
        s =  coun + ":"  + capi ; 
        console.log(s) ; 
        matrix.push(s) ; 
    }); 

    fs.writeFile("scrapedfile.json", JSON.stringify(matrix, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });
}

scrape();