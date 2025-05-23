/**
 * Utility functions for location-based operations
 */
import { SUGGESTED_SPOTS_CONFIG } from '../constants/SuggestedSpotsConfig';

/**
 * Calculate the distance between two coordinates in kilometers using the Haversine formula
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lon1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Get nearby spots based on user location
 * @param {Object} userLocation - User's current location {latitude, longitude}
 * @param {Object} spotsData - Object containing all spots data
 * @param {number} maxDistance - Maximum distance in kilometers (default: from config)
 * @param {number} limit - Maximum number of spots to return (default: from config)
 * @returns {Array} Array of nearby spots sorted by distance
 */
export const getNearbySpots = (
  userLocation, 
  spotsData, 
  maxDistance = SUGGESTED_SPOTS_CONFIG.MAX_DISTANCE_KM, 
  limit = SUGGESTED_SPOTS_CONFIG.MAX_SPOTS_TO_DISPLAY
) => {
  if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
    return [];
  }

  const nearbySpots = [];

  // Process the spots data
  Object.entries(spotsData).forEach(([continent, countries]) => {
    Object.entries(countries).forEach(([country, spots]) => {
      Object.entries(spots).forEach(([spotName, spotId]) => {
        // Get spot coordinates from the spotId
        // Note: This is a simplified approach. In a real app, you would have
        // actual coordinates for each spot in your database.
        // For this example, we'll extract coordinates from the spotId
        // assuming the format includes lat/lon information
        
        // This is a placeholder. In reality, you would have a proper way to get coordinates
        // For demonstration, we'll generate random coordinates near the user
        const spotLat = userLocation.latitude + (Math.random() - 0.5) * 2;
        const spotLon = userLocation.longitude + (Math.random() - 0.5) * 2;
        
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          spotLat,
          spotLon
        );

        if (distance <= maxDistance) {
          nearbySpots.push({
            name: spotName,
            country,
            continent,
            id: spotId,
            distance: distance.toFixed(1),
            coordinates: {
              latitude: spotLat,
              longitude: spotLon,
            },
          });
        }
      });
    });
  });

  // Sort by distance and limit the results
  return nearbySpots
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, limit);
};
