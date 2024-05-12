const axios = require("axios");

//keys
const key1 = process.env.twelvedata;
const key2 = process.env.twelvedata2;
const key3 = process.env.twelvedata3;
const key4 = process.env.xRapidKey;
const key5 = process.env.xRapidKey2;
const key6 = process.env.xRapidKey3;
const keys = [
    {
        "source": "twelvedata",
        "key": key1
    },
    {
        "source": "twelvedata",
        "key": key2
    },
    {
        "source": "twelvedata",
        "key": key3
    },
    {
        "source": "rapidApi",
        "key": key4
    },
    {
        "source": "rapidApi",
        "key": key5
    },
    {
        "source": "rapidApi",
        "key": key6
    },
];

//****************************************************************** PRICE ***************************************************** */
const twelvedataPrice = async (symbol) => {
    //Loop over all api options
    for(var i = 0; i < keys.length; i++)
    {
        const source = keys[i].source;
        const key = keys[i].key;
        var option;

        //if twelvedata api key
        if(source == "twelvedata")
        {
            option = {
                method: 'GET',
                url: `https://api.twelvedata.com/price`,
                params: {
                    symbol : symbol,
                    apikey: key,
                },
            };
        }

        //if rapid api's api key
        else
        {
            option = {
                method: 'GET',
                url: 'https://twelve-data1.p.rapidapi.com/price',
                params: {
                  symbol: symbol,
                  format: 'json',
                },
                headers: {
                  'X-RapidAPI-Key': key,
                  'X-RapidAPI-Host': process.env.xRapidHost
                }
            };
        }

        //make the api call
        try 
        {
            const response = await axios.request(option);
            const data = response.data;

            //invalid data
            if(data.code == 404)
            {
                //return null values
                return {
                    "price": null
                };
            }
            if (data && data.code != 403 && data.code != 429) 
            {
                console.log(`Current Price: used key ${i}`);
                return data;
            } 
        }

        //unsuccessful or reached minutely limit, move to next option
        catch(err) 
        {
            console.log("Error: " + err.message);

            if(i == 5)
                i = -1;     //will reset to i=0 after i++
        }
    }
}

//****************************************************************** QUOTE ***************************************************** */
const twelvedataQuote = async (symbol) => {
    //Loop over all api options
    for(var i = 0; i < keys.length; i++)
    {
        const source = keys[i].source;
        const key = keys[i].key;
        var option;

        //if twelvedata api key
        if(source == "twelvedata")
        {
            option = {
                method: 'GET',
                url: `https://api.twelvedata.com/quote`,
                params: {
                    symbol : symbol,
                    interval: "1day",
                    apikey: key,
                },
            };
        }

        //if rapid api's api key
        else
        {
            option = {
                method: 'GET',
                url: 'https://twelve-data1.p.rapidapi.com/quote',
                params: {
                  symbol: symbol,
                  interval: '1day',
                  format: 'json',
                },
                headers: {
                  'X-RapidAPI-Key': key,
                  'X-RapidAPI-Host': process.env.xRapidHost
                }
            };
        }

        //make the api call
        try 
        {
            const response = await axios.request(option);
            const data = response.data;

            //invalid data
            if(data.code == 404)
            {
                //return null values
                return {
                    "name": null,
                    "exchange": null,
                    "change": null,
                    "percent_change": null
                };
            }
            if (data && data.code != 403 && data.code != 429) 
            {
                console.log(`Quote: used key ${i}`);
                return data;
            } 
        }

        //unsuccessful or reached minutely limit, move to next option
        catch(err) 
        {
            console.log("Error: " + err.message);

            if(i == 5)
                i = -1;     //will reset to i=0 after i++
        }
    }
}

//****************************************************************** LOGO ***************************************************** */
const twelvedataLogo = async (symbol) => {
    //Loop over all api options
    for(var i = 0; i < keys.length; i++)
    {
        const source = keys[i].source;
        const key = keys[i].key;
        var option;

        //if twelvedata api key
        if(source == "twelvedata")
        {
            option = {
                method: 'GET',
                url: `https://api.twelvedata.com/logo`,
                params: {
                    symbol : symbol,
                    apikey: key,
                },
            };
        }

        //if rapid api's api key
        else
        {
            option = {
                method: 'GET',
                url: 'https://twelve-data1.p.rapidapi.com/logo',
                params: {
                  symbol: symbol,
                },
                headers: {
                  'X-RapidAPI-Key': key,
                  'X-RapidAPI-Host': process.env.xRapidHost
                }
            };
        }

        //make the api call
        try 
        {
            const response = await axios.request(option);
            const data = response.data;

            //invalid data
            if(data.code == 404)
            {
                //return null values
                return {
                    "url": null
                };
            }
            if (data && data.code != 403 && data.code != 429) 
            {
                console.log(`Logo: used key ${i}`);
                return data;
            } 
        }

        //unsuccessful or reached minutely limit, move to next option
        catch(err) 
        {
            console.log("Error: " + err.message);

            if(i == 5)
                i = -1;     //will reset to i=0 after i++
        }
    }
}

//****************************************************************** HISTORY ***************************************************** */
const twelvedataHistory = async(symbol) => {
    const to = new Date();
    const to_year = to.getFullYear();
    const to_month = String(to.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is represented as 0
    const to_day = String(to.getDate()).padStart(2, '0');
    const to_formattedDate = `${to_year}-${to_month}-${to_day}`;
    const from_formattedDate = `${to_year - 1}-${to_month}-${to_day}`;

    //Loop over all api options
    for(var i = 0; i < keys.length; i++)
    {
        const source = keys[i].source;
        const key = keys[i].key;
        var option;

        //if twelvedata api key
        if(source == "twelvedata")
        {
            option = {
                method: 'GET',
                url: `https://api.twelvedata.com/time_series`,
                params: {
                    symbol: symbol,
                    interval: "1day",
                    apikey: key,
                    start_date: from_formattedDate,
                    end_date: to_formattedDate
                  },
            };
        }

        //if rapid api's api key
        else
        {
            option = {
                method: 'GET',
                url: 'https://twelve-data1.p.rapidapi.com/time_series',
                params: {
                  symbol: symbol,
                  interval: "1day",
                  outputsize: 260,
                  format: "json"
                },
                headers: {
                  'X-RapidAPI-Key': key,
                  'X-RapidAPI-Host': process.env.xRapidHost
                }
            };
        }

        //make the api call
        try 
        {
            const response = await axios.request(option);
            const data = response.data;

            //invalid data
            if(data.code == 404)
            {
                //return null values
                return {
                    "values": null
                };
            }
            // Check if data is valid
            if (data && data.code != 403 && data.code != 429) 
            {
                console.log(`History: used key ${i}`);
                return data;
            } 
        }

        //unsuccessful or reached minutely limit, move to next option
        catch(err) 
        {
            console.log("Error: " + err.message);

            if(i == 5)
                i = -1;     //will reset to i=0 after i++
        }
    }
}

module.exports = {
    twelvedataPrice,
    twelvedataQuote,
    twelvedataLogo,
    twelvedataHistory
}