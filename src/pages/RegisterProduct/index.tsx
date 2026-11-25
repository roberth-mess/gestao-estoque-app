import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useInventory } from '../../context/InventoryContext';
import { theme } from '../../global/theme';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

export const RegisterProduct: React.FC = () => {
  const { addProduct } = useInventory();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<{ name?: string; price?: string; quantity?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; price?: string; quantity?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Informe o nome do produto.';
    }

    const parsedPrice = parseFloat(price.replace(',', '.'));
    if (!price.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = 'Informe um preço válido maior que zero.';
    }

    const parsedQty = parseInt(quantity, 10);
    if (!quantity.trim() || isNaN(parsedQty) || parsedQty < 0) {
      newErrors.quantity = 'Informe uma quantidade inicial válida (0 ou mais).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;

    const parsedPrice = parseFloat(price.replace(',', '.'));
    const parsedQty = parseInt(quantity, 10);

    addProduct(name, parsedPrice, parsedQty);

    Alert.alert(
      'Produto Cadastrado',
      `"${name.trim()}" foi adicionado ao estoque com ${parsedQty} unidade(s).`
    );

    setName('');
    setPrice('');
    setQuantity('');
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="add-circle" size={28} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Novo Produto</Text>
              <Text style={styles.headerSubtitle}>
                Cadastre itens no inventário local
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <CustomInput
              label="Nome do Produto"
              iconName="pricetag-outline"
              placeholder="Ex: SSD NVMe 1TB Kingston"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              errorMessage={errors.name}
            />

            <CustomInput
              label="Preço Unitário (R$)"
              iconName="cash-outline"
              placeholder="Ex: 349.90"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(text) => {
                setPrice(text);
                if (errors.price) setErrors({ ...errors, price: undefined });
              }}
              errorMessage={errors.price}
            />

            <CustomInput
              label="Quantidade Inicial"
              iconName="layers-outline"
              placeholder="Ex: 15"
              keyboardType="number-pad"
              value={quantity}
              onChangeText={(text) => {
                setQuantity(text);
                if (errors.quantity) setErrors({ ...errors, quantity: undefined });
              }}
              errorMessage={errors.quantity}
            />

            <CustomButton
              title="Cadastrar no Estoque"
              iconName="checkmark-circle-outline"
              onPress={handleRegister}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
