const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error,response,body) => {
    const data = JSON.parse(body);
    const ipaddr = data.ip;

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (typeof ipaddr === "string") {
      callback(null, ipaddr);
      return;
    }

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, (error,response,body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.success) {
      const message = `Status is : ${data.success}. Server message : ${data.message} when using IP : ${data.ip}`;
      callback((Error(message)), null);
      return;
    }

    const location = {
      latitude : data.latitude,
      longitude : data.longitude
    };

    callback(null, location);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };