const { fetchMyIP, fetchCoordsByIP } = require('./iss');

let ipaddr;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  //ipaddr = ip Why cant it take ipaddr when I assign it 'ip'??
});

ipaddr = '99.240.253.215';

fetchCoordsByIP(ipaddr, (error, data) => {
  if (error) {
    console.log("Failed to fetch!",error);
    return;
  }
  
  console.log("Fetched coords:", data);
});