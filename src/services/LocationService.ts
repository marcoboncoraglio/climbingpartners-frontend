//TODO: take location from gps connection if enabled
export const getLocation = (highAccuracy: boolean) => {
  console.log("highaccuracy: " + highAccuracy);
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (err) => {      
        console.log(err.message + ", getting approximate locationg from ip...")
        resolve(fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            return {
              lat: location.latitude,
              lng: location.longitude
            };
          }));
      }, { enableHighAccuracy: highAccuracy });
    });
  }

var gpsID: number;

export const enableGPS = () => {
  gpsID = navigator.geolocation.watchPosition(
    () => {console.log("gps enabled")}, 
    () => {console.log("gps error")}
    );
}

export const disableGPS = () => {
  navigator.geolocation.clearWatch(gpsID);
  console.log("disabled gps")
}
