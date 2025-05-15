// App Store ID
export const APP_STORE_ID = '6745230519';
export const COUNTRY_CODE = 'ES';
export const APP_LANGUAGE = 'en-GB';

export const APP_STORE_URL = `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}`;
export const ITUNES_LOOKUP_URL = `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${COUNTRY_CODE}`;
export const APP_STORE_LINK = `https://apps.apple.com/es/app/windguruspots/id${APP_STORE_ID}?l=${APP_LANGUAGE}`;

export const SHARE_FORECAST_MESSAGE = (spotId) =>
  `Take a look at this forecast!\n\nCheck it out on Windguru: https://www.windguru.cz/${spotId}\n\nFound using Windguru Spots ${APP_STORE_LINK} 📲`; 

export const UPDATE_APP_AVAILABLE = 'A new version of Windguru Spots is available. Would you like to update now?';


