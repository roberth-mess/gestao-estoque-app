import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useInventory } from '../../context/InventoryContext';
import { theme } from '../../global/theme';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

export const StockOut: React.FC = () => {
  const { products, removeStock } = useInventory();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [outQuantity, setOutQuantity] = useState('');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((item) => item.name.toLowerCase().includes(query));
  }, [products, searchQuery]);

  const selectedProduct = useMemo(
    () => products.find((item) => item.id === selectedProductId) || null,
    [products, selectedProductId]
  );

  const handleConfirmStockOut = () => {
    if (!selectedProductId) {
      Alert.alert('Atenção', 'Selecione um produto na lista suspensa antes de dar baixa.');
      return;
    }

    const parsedAmount = parseInt(outQuantity, 10);
    if (!outQuantity.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Quantidade Inválida', 'Informe um número inteiro maior que zero.');
      return;
    }

    const result = removeStock(selectedProductId, parsedAmount);

    if (result.success) {
      Alert.alert('Baixa Registrada', result.message);
      setOutQuantity('');
      setDropdownOpen(false);
    } else {
      Alert.alert('Erro na Operação', result.message);
    }
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
              <Ionicons name="arrow-down-circle" size={28} color={theme.colors.danger} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Saída de Estoque</Text>
              <Text style={styles.headerSubtitle}>
                Registre retiradas e abata o saldo em tempo real
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {/* 1. Barra de Busca */}
            <CustomInput
              label="1. Buscar Produto"
              iconName="search-outline"
              placeholder="Digite o nome do produto para filtrar..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setDropdownOpen(true);
              }}
            />

            {/* 2. Lista Suspensa (Seletor de Produto) */}
            <Text style={styles.sectionLabel}>2. Selecione o Produto</Text>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              activeOpacity={0.8}
              onPress={() => setDropdownOpen((prev) => !prev)}
            >
              <Text
                style={[
                  styles.dropdownTriggerText,
                  !selectedProduct && styles.dropdownPlaceholder,
                ]}
                numberOfLines={1}
              >
                {selectedProduct
                  ? `${selectedProduct.name} (Saldo: ${selectedProduct.quantity} un.)`
                  : `Escolha um item (${filteredProducts.length} encontrado(s))`}
              </Text>
              <Ionicons
                name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            {dropdownOpen && (
              <View style={styles.dropdownList}>
                {filteredProducts.length === 0 ? (
                  <Text style={styles.emptyDropdownText}>
                    Nenhum produto encontrado para "{searchQuery}".
                  </Text>
                ) : (
                  filteredProducts.map((item) => {
                    const isSelected = item.id === selectedProductId;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.dropdownItem,
                          isSelected && styles.dropdownItemSelected,
                        ]}
                        onPress={() => {
                          setSelectedProductId(item.id);
                          setDropdownOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemName,
                            isSelected && styles.dropdownItemNameSelected,
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text style={styles.dropdownItemStock}>
                          Disp.: {item.quantity} un.
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            )}

            {selectedProduct && (
              <View style={styles.selectedInfoBox}>
                <Text style={styles.selectedInfoTitle}>Item Selecionado:</Text>
                <Text style={styles.selectedInfoText}>
                  {selectedProduct.name} — Disponível em estoque:{' '}
                  <Text style={styles.selectedInfoBold}>
                    {selectedProduct.quantity} unidade(s)
                  </Text>
                </Text>
              </View>
            )}

            {/* 3. Campo Numérico de Saída */}
            <View style={styles.quantitySection}>
              <CustomInput
                label="3. Quantidade de Saída"
                iconName="remove-circle-outline"
                placeholder="Ex: 2"
                keyboardType="number-pad"
                value={outQuantity}
                onChangeText={setOutQuantity}
              />
            </View>

            <CustomButton
              title="Confirmar Baixa no Estoque"
              variant="danger"
              iconName="checkmark-done-outline"
              onPress={handleConfirmStockOut}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
