import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { styles } from './styles';

interface CustomInputProps extends TextInputProps {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  errorMessage?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  errorMessage,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, errorMessage ? styles.inputError : null]}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={errorMessage ? theme.colors.danger : theme.colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.textSecondary}
          {...rest}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};
