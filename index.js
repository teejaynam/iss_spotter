const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("Failed to fetch!",error);
      return;
    }
    
    console.log("Fetched coords:", data);

    fetchISSFlyOverTimes(data, (error, passTimes) => {
      if (error) {
        console.log("It didnt work",error);
        return;
      }

      console.log("It works. Returned flyover times:", passTimes);
    });
  });
});