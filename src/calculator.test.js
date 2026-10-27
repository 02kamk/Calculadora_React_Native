import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, press } from './calculator.js';
const run = (...keys) => keys.reduce(press, { ...initialState });
test('quatro operações', () => {
  for (const [op, expected] of [['+', '10'], ['−', '6'], ['×', '16'], ['÷', '4']])
    assert.equal(run('8', op, '2', '=').display, expected);
});
test('decimais e precisão', () => assert.equal(run('0', ',', '1', '+', '0', ',', '2', '=').display, '0.3'));
test('operações encadeadas, da esquerda para direita', () => assert.equal(run('2', '+', '3', '×', '4', '=').display, '20'));
test('troca de operador', () => assert.equal(run('8', '+', '×', '2', '=').display, '16'));
test('divisão por zero e recuperação', () => {
  const result = run('8', '÷', '0', '='); assert.equal(result.error, true); assert.equal(press(result, '3').display, '3');
});
test('limpar, apagar e sinal', () => {
 assert.equal(run('1', '2', '⌫', '±').display, '-1'); assert.deepEqual(run('7', '+', 'AC'), initialState);
});
test('novo cálculo após resultado', () => assert.equal(run('2', '+', '3', '=', '7').display, '7'));

test('backspace edits a calculated result', () => {
 const result = run('6', '×', '7', '=', '⌫');
 assert.equal(result.display, '4'); assert.equal(result.waiting, false); assert.equal(result.expression, '');
 assert.equal(press(result, '5').display, '45');
 assert.equal(run('6', '×', '7', '=', '⌫', '+', '1', '=').display, '5');
});
test('backspace cancels pending operator before editing', () => {
 const result = run('1', '2', '+', '⌫');
 assert.equal(result.display, '1'); assert.equal(result.operator, null);
});
test('backspace preserves operation when editing second operand', () => {
 assert.equal(run('8', '+', '2', '3', '⌫', '=').display, '10');
 assert.equal(run('5', '±', '⌫').display, '0');
 assert.equal(run('1', '2', '⌫', '⌫', '⌫').display, '0');
});
