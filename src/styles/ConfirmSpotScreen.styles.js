import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Form, ModalStyles } from '../constants/Styles';

export const styles = StyleSheet.create({
  ...Form,
  ...ModalStyles,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text.primary,
    backgroundColor: Colors.white,
  },
  helpText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  modelSelector: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  modelSelectorText: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  groupSelector: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  groupSelectorText: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.text.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    padding: Spacing.md,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  modalList: {
    maxHeight: '70%',
  },
  modalCloseButton: {
    marginTop: Spacing.md,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  modelItem: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modelName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.primary,
  },
  modelDescription: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  groupItem: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  groupName: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  newGroupContainer: {
    padding: Spacing.md,
  },
  newGroupButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.md,
  },
  newGroupButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  createButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
  },
  newGroupButtonText: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  backButton: {
    marginBottom: Spacing.sm,
    alignSelf: 'flex-start',
  },
}); 