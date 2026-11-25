import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../global/types';
import { useInventory } from '../../context/InventoryContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { styles } from './styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn } = useInventory();

  const [email, setEmail] = useState('admin@estoque.com');
  const [password, setPassword] = useState('123456');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!email.includes('@')) {
      newErrors.email = 'Informe um endereço de e-mail válido.';
    }

    if (!password.trim()) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 4) {
      newErrors.password = 'A senha deve ter pelo menos 4 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateFields()) return;

    setLoading(true);

    // Simulação de requisição de autenticação assíncrona
    setTimeout(() => {
      setLoading(false);
      if (password === '123456' || password.length >= 4) {
        signIn(email.trim());
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Acesso Negado', 'Credenciais inválidas. Tente novamente.');
      }
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Acesso ao Sistema</Text>

            <CustomInput
              label="E-mail Corporativo"
              iconName="mail-outline"
              placeholder="ex: operador@empresa.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              errorMessage={errors.email}
            />

            <CustomInput
              label="Senha"
              iconName="lock-closed-outline"
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              errorMessage={errors.password}
            />

            <CustomButton
              title="Entrar no Sistema"
              iconName="log-in-outline"
              loading={loading}
              onPress={handleLogin}
            />

            <Text style={styles.hintText}>
              Dica: utilize admin@estoque.com e senha 123456
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};