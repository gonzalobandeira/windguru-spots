import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Styles';

export default StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.text.primary,
  },
  spotsList: {
    marginBottom: 8,
  },
  spotItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    marginBottom: 8,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  spotLocation: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  spotId: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distance: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  permissionText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.primary,
  },
  noSpotsText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 14,
    color: Colors.text.secondary,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
});

