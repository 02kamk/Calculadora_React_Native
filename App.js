import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PaperProvider, MD3LightTheme, Surface, Text, Button } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { initialState, press } from './src/calculator';

const theme = { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, primary: '#b85e89', background: '#fff4f8', surface: '#ffffff' } };
const rows = [['AC', '⌫', '±', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '−'], ['1', '2', '3', '+'], ['0', ',', '=']];
const labels = { AC: 'Limpar tudo', '⌫': 'Apagar último dígito', '±': 'Trocar sinal', '÷': 'Dividir', '×': 'Multiplicar', '−': 'Subtrair', '+': 'Somar', '=': 'Calcular resultado', ',': 'Vírgula decimal' };
function CalculatorButton({ value, onPress, selected }) {
  const operator = ['+', '−', '×', '÷'].includes(value);
  return <Button mode="contained" accessibilityLabel={labels[value] || value}
    onPress={() => onPress(value)} textColor={value === '=' || selected ? '#ffffff' : '#684c68'}
    buttonColor={value === '=' || selected ? '#b85e89' : operator ? '#e9dcfa' : ['AC', '⌫', '±'].includes(value) ? '#dff2eb' : '#fff0f5'}
    style={[styles.key, value === '0' && styles.zero]} contentStyle={styles.keyContent} labelStyle={styles.keyLabel}>
    {value}
  </Button>;
}
function Display({ state }) {
  return <Surface elevation={0} style={styles.display}>
    <Text style={styles.expression}>{(state.error ? state.expression : state.expression.replace(/\./g, ',')) || 'Pronta para calcular'}</Text>
    <Text accessibilityLiveRegion="polite" accessibilityLabel={`Resultado: ${state.display}`} numberOfLines={1} adjustsFontSizeToFit style={[styles.result, state.error && styles.error]}>{state.display.replace('.', ',')}</Text>
  </Surface>;
}
export default function App() {
  const [state, setState] = useState(initialState);
  return <SafeAreaProvider><PaperProvider theme={theme}><SafeAreaView style={styles.safe}>
    <StatusBar style="dark" />
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.calculator}>
        <View style={styles.decoration} accessible={false}><Text style={styles.sparkle}>✦</Text><View style={styles.mascot}><Text style={styles.face}>˶ᵔ ᵕ ᵔ˶</Text></View><Text style={styles.sparkle}>♡</Text></View>
        <Text variant="headlineLarge" style={styles.title}>Calculadora</Text>
        <Text style={styles.subtitle}>Pequenas contas, grandes sorrisos ♡</Text>
        <Display state={state} />
        <View style={styles.keyboard}>{rows.map((row, index) => <View style={styles.row} key={index}>{row.map(value => <CalculatorButton key={value} value={value} selected={state.operator === value} onPress={key => setState(current => press(current, key))} />)}</View>)}</View>
        <Text style={styles.note}>Operações em sequência, da esquerda para a direita.</Text>
      </View>
    </ScrollView>
  </SafeAreaView></PaperProvider></SafeAreaProvider>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff4f8' },
  page: { flexGrow: 1, justifyContent: 'center', padding: 20, paddingVertical: 28 },
  calculator: { width: '100%', maxWidth: 420, alignSelf: 'center', backgroundColor: '#fffdfd', borderRadius: 36, padding: 22, borderWidth: 2, borderColor: '#f4dfe9', boxShadow: '0px 12px 36px rgba(164, 98, 131, 0.10)' },
  decoration: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 12 },
  sparkle: { color: '#bd7ba0', fontSize: 22 },
  mascot: { backgroundColor: '#fce3ee', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 8, borderWidth: 2, borderColor: '#ffffff', transform: [{ rotate: '-5deg' }] },
  face: { color: '#925572', fontSize: 23, fontWeight: '600' },
  title: { color: '#684c68', fontWeight: '800', textAlign: 'center', letterSpacing: -0.8 },
  subtitle: { color: '#956b83', marginTop: 6, marginBottom: 24, textAlign: 'center', fontSize: 12 },
  display: { backgroundColor: '#f0f5eb', borderRadius: 24, padding: 20, minHeight: 138, justifyContent: 'center', borderWidth: 1, borderColor: '#e2ebda' },
  expression: { textAlign: 'right', color: '#718367', fontSize: 13, minHeight: 24 },
  result: { textAlign: 'right', color: '#52654d', fontSize: 54, fontWeight: '500', marginVertical: 4 },
  keyboard: { gap: 10, marginTop: 20 }, row: { flexDirection: 'row', gap: 10 },
  key: { flex: 1, borderRadius: 21, minWidth: 0 }, zero: { flex: 2.14 },
  keyContent: { height: 58 }, keyLabel: { fontSize: 22, marginHorizontal: 0, lineHeight: 30, fontWeight: '600' },
  note: { color: '#956b83', textAlign: 'center', fontSize: 10, lineHeight: 16, marginTop: 20 },
  error: { color: '#af365b' },
});
