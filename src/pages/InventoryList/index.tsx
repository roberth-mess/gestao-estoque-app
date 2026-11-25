import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useInventory } from '../../context/InventoryContext';
import { RootStackParamList } from '../../global/types';
import { theme } from '../../global/theme';
import { ProductCard } from '../../components/ProductCard';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const InventoryList: React.FC = () => {
  const { products, user, signOut } = useInventory();
  const navigation = useNavigation<NavigationProp>();

  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);
  const lowStockCount = products.filter((item) => item.quantity <= 5).length;

  const handleLogout = () => {
    signOut();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name || 'Operador'}</Text>
            <Text style={styles.headerTitle}>Controle de Estoque</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Produtos</Text>
            <Text style={styles.summaryValue}>{products.length}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Unidades Totais</Text>
            <Text style={styles.summaryValue}>{totalItems}</Text>
          </View>
          <View style={[styles.summaryCard, lowStockCount > 0 && styles.summaryAlertCard]}>
            <Text style={styles.summaryLabel}>Alerta Baixo</Text>
            <Text
              style={[
                styles.summaryValue,
                lowStockCount > 0 && { color: theme.colors.danger },
              ]}
            >
              {lowStockCount}
            </Text>
          </View>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="cube-outline" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>Nenhum produto cadastrado no estoque.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};
