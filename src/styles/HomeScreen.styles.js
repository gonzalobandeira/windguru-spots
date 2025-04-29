import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, ButtonHeight, Shadow } from '../constants/Styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  addButtonText: {
    color: Colors.text.white,
    fontWeight: FontWeight.bold,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  listContainer: {
    paddingBottom: Spacing.xl,
  },
  locationItem: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    ...Shadow.small,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  locationHeader: {
    flexDirection: 'row',
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  locationDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  locationSpotId: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  locationModel: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
  deleteButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  deleteButtonText: {
    color: Colors.text.white,
    fontWeight: FontWeight.bold,
  },
  widgetContainer: {
    height: 300,
  },
  groupItem: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    ...Shadow.small,
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  groupCount: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  groupActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  expandButton: {
    padding: Spacing.sm,
  },
  expandButtonText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  groupContent: {
    padding: Spacing.lg,
  },
  ungroupedSection: {
    marginTop: Spacing.lg,
  },
  ungroupedTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
  },
  emptyText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  emptySubText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
}); 