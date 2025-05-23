import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Styles';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
  backButton: {
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: Colors.text.primary,
  },
  manualButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  manualButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});
