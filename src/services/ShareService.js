import { Share } from 'react-native';
import { SHARE_FORECAST_MESSAGE, WINDGURU_URL } from '../constants/Messages';
import { track } from '@amplitude/analytics-react-native';

class ShareService {
  static async shareForecast(item) {
    try {
      const shareOptions = {
        message: SHARE_FORECAST_MESSAGE(item.spotId)
      };
      
      const result = await Share.share(shareOptions);
      
      if (result.action === Share.sharedAction) {
        // Track successful share
        track('forecast_shared', {
          spot_id: item.spotId,
          timestamp: new Date().toISOString(),
          action: result.action,
          activity_type: result.activityType
        });
      }

      return result;
    } catch (error) {
      console.error('ShareService: share error:', error);
      
      // Track failed share
      track('forecast_share_failed', {
        spot_id: item.spotId,
        error: error.message,
        timestamp: new Date().toISOString()
      });

      throw error;
    }
  }
}

export default ShareService; 