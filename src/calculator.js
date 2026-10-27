export const initialState = { display: '0', previous: null, operator: null, waiting: false, expression: '', error: false };
const format = (value) => Number(value.toPrecision(12)).toString();
function calculate(a, b, op) {
  if (op === '÷' && b === 0) throw new Error('Não é possível dividir por zero.');
  const result = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
  if (!Number.isFinite(result)) throw new Error('Resultado fora do limite.');
  return result;
}
// Função pura: a interface usa useState e delega as transições para cá.
export function press(state, key) {
  if (key === 'AC') return { ...initialState };
  let s = state.error ? { ...initialState } : state;
  if (/^[0-9]$/.test(key)) {
    const current = s.waiting || s.display === '0' ? key : s.display + key;
    if (current.replace(/[-.]/g, '').length > 12) return s;
    return { ...s, display: current, waiting: false, expression: s.operator ? s.expression : '' };
  }
  if (key === ',') return { ...s, display: s.waiting ? '0.' : s.display.includes('.') ? s.display : s.display + '.', waiting: false };
  if (key === '⌫') {
    // Volta a editar o valor exibido, inclusive depois de pressionar igual.
    const editable = s.waiting ? { ...initialState, display: s.display } : s;
    const shortened = editable.display.slice(0, -1);
    const display = shortened && Number.isFinite(Number(shortened)) ? shortened : '0';
    return { ...editable, display, expression: editable.operator ? editable.expression : '' };
  }
  if (key === '±') return { ...s, display: format(-Number(s.display)) };
  if (['+', '−', '×', '÷', '='].includes(key)) {
    if (key === '=' && (!s.operator || s.waiting)) return s;
    try {
      let value = Number(s.display);
      let expression = s.expression;
      if (s.operator && !s.waiting) {
        expression = `${s.previous} ${s.operator} ${s.display} =`;
        value = calculate(s.previous, value, s.operator);
      }
      return { ...s, display: format(value), previous: key === '=' ? null : value,
        operator: key === '=' ? null : key, waiting: true,
        expression: key === '=' ? expression : `${format(value)} ${key}` };
    } catch (error) { return { ...initialState, display: 'Erro', expression: error.message, error: true }; }
  }
  return s;
}
