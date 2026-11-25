import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  badgeSuccess: {
    backgroundColor: theme.colors.successBg,
  },
  badgeWarning: {
    backgroundColor: theme.colors.warningBg,
  },
  badgeDanger: {
    backgroundColor: theme.colors.dangerBg,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  textSuccess: {
    color: theme.colors.success,
  },
  textWarning: {
    color: theme.colors.warning,
  },
  textDanger: {
    color: theme.colors.danger,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
    paddingTop: theme.spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  quantityBox: {
    alignItems: 'flex-end',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  dateText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
});
