import { StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, ButtonHeight, FontSize, FontWeight, Shadow } from '../constants/Styles';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuButton: {
    backgroundColor: Colors.white,
    width: ButtonHeight.sm * 0.85,
    height: ButtonHeight.sm * 0.85,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    top: ButtonHeight.sm * 0.85 + Spacing.xs,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    ...Shadow.medium,
    transform: [{ translateY: 0 }],
    alignSelf: 'flex-start',
    width: 'auto',
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
  menuItemTextWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  windguruIcon: {
    width: 60,
    height: 16,
    marginLeft: 2,
  },
});
