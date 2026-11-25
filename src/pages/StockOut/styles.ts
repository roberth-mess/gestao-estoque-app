import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 50,
  },
  dropdownTriggerText: {
    fontSize: 15,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  dropdownPlaceholder: {
    color: theme.colors.textSecondary,
  },
  dropdownList: {
    marginTop: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    maxHeight: 200,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemSelected: {
    backgroundColor: '#DBEAFE',
  },
  dropdownItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  dropdownItemNameSelected: {
    color: theme.colors.primary,
  },
  dropdownItemStock: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  emptyDropdownText: {
    padding: theme.spacing.md,
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  selectedInfoBox: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  selectedInfoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  selectedInfoText: {
    fontSize: 13,
    color: theme.colors.text,
  },
  selectedInfoBold: {
    fontWeight: '700',
  },
  quantitySection: {
    marginTop: theme.spacing.md,
  },
});
