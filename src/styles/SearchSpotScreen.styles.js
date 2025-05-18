import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text.primary,
  },
  manualButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  manualButtonText: {
    color: Colors.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
}); 