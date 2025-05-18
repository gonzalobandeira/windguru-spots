import { ViewStyle } from 'react-native';

// Colors
export const Colors = {
  primary: '#0066cc',
  secondary: '#666666',
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#333333',
  border: '#e0e0e0',
  error: '#ff3b30',
  text: {
    primary: '#333333',
    secondary: '#666666',
    white: '#ffffff',
  },
  shadow: {
    color: '#000',
    offset: { width: 0, height: 2 },
    opacity: 0.25,
    radius: 3.84,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border Radius
export const BorderRadius = {
  sm: 4,
  md: 8,
};

// Font Sizes
export const FontSize = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

// Font Weights
export const FontWeight = {
  normal: 'normal',
  bold: 'bold',
};

// Button Heights
export const ButtonHeight = {
  sm: 36,
  md: 44,
  lg: 48,
};

// Modal
export const Modal = {
  maxHeight: '80%',
  width: '90%',
  listMaxHeight: '70%',
};

// Shadow
export const Shadow = {
  small: {
    shadowColor: Colors.shadow.color,
    shadowOffset: Colors.shadow.offset,
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: Colors.shadow.radius,
    elevation: 5,
  },
  medium: {
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Widget Heights
export const WidgetHeight = {
  fixed: 320,
}; 

// Tooltip
export const Tooltip: Record<string, ViewStyle> = {
  container: {
    position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    maxWidth: '80%',
    ...Shadow.medium,
  },
  tooltipContent: {
    marginBottom: Spacing.sm,
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    padding: Spacing.xs,
  },
}; 