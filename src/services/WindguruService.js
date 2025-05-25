import { WINDGURU_URL } from '../constants/Messages';

class WindguruService {
  /**
   * Get spot coordinates from Windguru API
   * @param {string} spotId - The Windguru spot ID
   * @returns {Promise<Object|null>} Object with latitude and longitude, or null if not found
   */
  async getSpotCoordinates(spotId) {
    if (!spotId) {
      return null;
    }

    try {
      const response = await fetch(`${WINDGURU_URL}/int/iapi.php?q=forecast_spot&id_spot=${spotId}`, {
        method: 'GET',
        headers: {
          'Referer': 'https://api.windguru.cz/',
          'Accept': 'application/json',
          'User-Agent': 'WindguruSpots/1.0'
        }
      });

      if (!response.ok) {
        console.log('HTTP error! status:', response.status);
        return null;
      }

      const data = await response.json();
      
      // Extract coordinates from the spots object
      if (data.spots && data.spots[spotId]) {
        const spot = data.spots[spotId];
        
        if (spot.lat && spot.lon) {
          return {
            latitude: spot.lat,
            longitude: spot.lon
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching spot coordinates:', error);
      return null;
    }
  }
}

export default new WindguruService(); 