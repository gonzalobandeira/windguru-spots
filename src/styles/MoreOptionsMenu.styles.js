import { StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, ButtonHeight, FontSize, FontWeight, Shadow } from '../constants/Styles';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  menuButton: {
    backgroundColor: Colors.secondary,
    width: ButtonHeight.sm * 0.85,
    height: ButtonHeight.sm * 0.85,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: ButtonHeight.sm * 0.85 + Spacing.xs,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    minWidth: 150,
    ...Shadow.medium,
    zIndex: 1001,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  menuItemText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
}); 