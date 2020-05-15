import axios from 'axios'

    const url = 'http://127.0.0.1:8000/shop';
    // we need to set the parameters country in the end, to make it change
export const fetchdata = async () => {
        try {
            // by destructuring, it allows us to make less line
            const  {data} = await axios.get(url)
            // const modifiedData ={  confirmed,recovered,deaths, lastUpdate,
                // confirmed:data.confirmed,
                // recovered:data.recovered,
                // deaths:data.deaths,
                // lastUpdate:data.lastUpdate,}
            return {data}

        } catch (error) {
        }
    }

    export const fetchurgent = async () => {
        try {
            // by destructuring, it allows us to make less line
            const  {data} = await axios.get(`${url}/urgency`)
            // const modifiedData ={  confirmed,recovered,deaths, lastUpdate,
                // confirmed:data.confirmed,
                // recovered:data.recovered,
                // deaths:data.deaths,
                // lastUpdate:data.lastUpdate,}
            return {data}

        } catch (error) {
        }
    }
