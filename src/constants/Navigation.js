export const NavigationApps = {
  GOOGLE_MAPS: 'google',
  WAZE: 'waze'
};

export const NavigationUrls = {
  [NavigationApps.GOOGLE_MAPS]: (latitude, longitude) => 
    `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  [NavigationApps.WAZE]: (latitude, longitude) => 
    `https://waze.com/ul?ll=${latitude},${longitude}`
};

export const NavigationAppNames = {
  [NavigationApps.GOOGLE_MAPS]: 'Google Maps',
  [NavigationApps.WAZE]: 'Waze'
}; 