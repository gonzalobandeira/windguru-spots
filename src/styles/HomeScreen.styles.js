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
    gap: Spacing.sm,
  },
  iconButton: {
    backgroundColor: Colors.secondary,
    width: ButtonHeight.md,
    height: ButtonHeight.md,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  exportButtonText: {
    color: Colors.text.white,
    fontWeight: FontWeight.bold,
  },
  addButton: {
    backgroundColor: Colors.primary,
    height: ButtonHeight.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.text.white,
    fontSize: FontSize.md,
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
    fontWeight: FontWeight.medium,
  },
  locationModel: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
  },
  deleteButton: {
    backgroundColor: Colors.error,
    width: ButtonHeight.sm,
    height: ButtonHeight.sm,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
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
  expandButton: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  expandButtonText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
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
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
  },
  footerSeparator: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    marginHorizontal: Spacing.xs,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    width: '90%',
    maxWidth: 400,
    padding: Spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  closeButton: {
    padding: Spacing.xs,
  },
}); 