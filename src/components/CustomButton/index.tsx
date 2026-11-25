import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { styles } from './styles';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'danger' | 'outline';
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  iconName,
  disabled,
  ...rest
}) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'danger' && styles.dangerButton,
        isOutline && styles.outlineButton,
        (disabled || loading) && styles.disabledButton,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? theme.colors.primary : theme.colors.white}
        />
      ) : (
        <>
          {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={isOutline ? theme.colors.primary : theme.colors.white}
              style={styles.icon}
            />
          )}
          <Text style={[styles.buttonText, isOutline && styles.outlineText]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
