import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../global/types';
import { theme } from '../../global/theme';
import { styles } from './styles';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getStockStatus = () => {
    if (product.quantity === 0) {
      return {
        label: 'Sem Estoque',
        badgeStyle: styles.badgeDanger,
        textStyle: styles.textDanger,
        icon: 'alert-circle' as const,
        iconColor: theme.colors.danger,
      };
    }
    if (product.quantity <= 5) {
      return {
        label: 'Estoque Baixo',
        badgeStyle: styles.badgeWarning,
        textStyle: styles.textWarning,
        icon: 'warning' as const,
        iconColor: theme.colors.warning,
      };
    }
    return {
      label: 'Normal',
      badgeStyle: styles.badgeSuccess,
      textStyle: styles.textSuccess,
      icon: 'checkmark-circle' as const,
      iconColor: theme.colors.success,
    };
  };

  const status = getStockStatus();
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={[styles.badge, status.badgeStyle]}>
          <Ionicons name={status.icon} size={14} color={status.iconColor} />
          <Text style={[styles.badgeText, status.textStyle]}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View>
          <Text style={styles.detailLabel}>Preço Unitário</Text>
          <Text style={styles.priceValue}>{formattedPrice}</Text>
        </View>

        <View style={styles.quantityBox}>
          <Text style={styles.detailLabel}>Saldo Atual</Text>
          <Text style={styles.quantityValue}>{product.quantity} un.</Text>
        </View>
      </View>

      <Text style={styles.dateText}>Cadastrado em: {product.createdAt}</Text>
    </View>
  );
};
