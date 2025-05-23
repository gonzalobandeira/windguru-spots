import { StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '../constants/Styles';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  resultsContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  resultsList: {
    maxHeight: 300,
  },
  spotItem: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  spotLocation: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  spotId: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
});

export default styles;
