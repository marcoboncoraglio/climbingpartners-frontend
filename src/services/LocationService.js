export const getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.watchPosition((position) => {
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
      }, { enableHighAccuracy: true });
    });
  }