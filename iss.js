const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const URL = 'https://api.ipify.org?format=json';

  request(URL, (error,response,body) => {
    const data = JSON.parse(body);
    const ipaddr = data['ip'];
    if (typeof ipaddr === "string") {
      callback(null, ipaddr);
    } else {
      callback(error, null);
    }

  });

};

module.exports = { fetchMyIP };