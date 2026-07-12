---
title: Keys and UX patterns
description: "Secure key storage, confirm-before-sign UX, address display, and deep links for Safrochain mobile apps."
sidebar_position: 3
---

Mobile wallets handle real money. Follow these patterns on Flutter and React Native.

## Key storage

| Platform | Use | Avoid |
| --- | --- | --- |
| iOS | Keychain via secure storage plugin | UserDefaults, plain files |
| Android | Keystore / EncryptedSharedPreferences | SharedPreferences for mnemonics |
| RN | `expo-secure-store` or `react-native-keychain` | AsyncStorage for secrets |
| Flutter | Keychain via `flutter_secure_storage` (mnemonic for CosmJS bridge only) | SharedPreferences for secrets |

Never log mnemonics or private keys. Use biometrics to gate signing screens.

## Confirm-before-sign UX

1. Show **recipient** (SafHandle `@name` + resolved truncated `addr_safro...`)
2. Show **amount** in SAF and `usaf`
3. Show **fee estimate** from simulate (see [Simulate gas](../transactions/simulate-gas-fees))
4. Require explicit confirm (button + optional biometric)

## Address display

- Default: `addr_safro1abc...xyz` (first 10 + last 6 chars)
- With SafHandle: display `@john` prominently; show resolved address on confirm screen

## Deep links (planned)

Register app links for pay intents:

```
safro://pay/@alice?amount=1000000&denom=usaf&memo=coffee
https://pay.safrochain.com/@alice
```

See [SafHandle resolve](../safhandle/resolve) before building `MsgSend`.

## Related

- [Wallets](../wallets/supported-wallets)
- [Transactions](../transactions/signing-overview)
