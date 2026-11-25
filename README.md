# Aplicativo Mobile de Gestão de Estoque (Mini ERP Local)

Projeto desenvolvido para a disciplina de **Programação para Ambientes Móveis** utilizando **React Native**, **Expo** e **TypeScript**.

## Estrutura de Pastas (Arquitetura Limpa / Modular)

```text
src/
├── components/        # Componentes reutilizáveis e tipados (cada um com seu styles.ts)
│   ├── CustomButton/
│   ├── CustomInput/
│   └── ProductCard/
├── context/           # Gerenciamento de estado global via Context API
│   └── InventoryContext.tsx
├── global/            # Tema global, cores, tipografia e interfaces/tipos
│   ├── theme.ts
│   └── types.ts
├── pages/             # Telas do aplicativo (cada uma com seu styles.ts isolado)
│   ├── Login/
│   ├── RegisterProduct/
│   ├── InventoryList/
│   └── StockOut/
└── routes/            # Configuração de navegação (Stack e Bottom Tabs)
    ├── index.tsx
    ├── stack.routes.tsx
    └── bottom.routes.tsx
```

## Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor Expo:
   ```bash
   npx expo start
   ```
3. Escaneie o QR Code no aplicativo **Expo Go** (Android/iOS) ou pressione `a` / `i` para abrir no emulador.

## Credenciais de Acesso (Simulação)

- **E-mail:** `admin@estoque.com` (ou qualquer e-mail válido)
- **Senha:** `123456` (mínimo 4 caracteres)
