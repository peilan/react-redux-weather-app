export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      if (position) {
        const {latitude, longitude} = position.coords
        resolve({lat: latitude, lng: longitude})
      }
    })
  })
}