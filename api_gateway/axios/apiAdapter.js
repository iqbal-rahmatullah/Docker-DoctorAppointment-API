const axios = require('axios');

module.exports = (baseUrl)=>{
    return axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            // tambahkan header lain sesuai kebutuhan
          },
    })
}
 