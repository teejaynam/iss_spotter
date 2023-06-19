const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const ipaddr = JSON.parse(body).ip;

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
  const URL = `https://ipwho.is/${ip}`;

  request(URL, (error,response,body) => {

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

const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(URL, (error,response,body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code : ${response.statusCode} when fetching ISS pass over times : ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };