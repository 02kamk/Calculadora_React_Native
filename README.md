# Calculadora Kawaii

Exercício de Soluções Mobile: React Native + Expo, componentes do React Native Paper e gerenciamento de estado com useState.

## Executar

Abra esta pasta no VS Code. No terminal integrado:

```sh
npm install
npm start
```

Instale o Expo Go no celular. Conecte celular e computador à mesma rede Wi-Fi e leia o QR code do terminal (pelo Expo Go no Android ou pela câmera no iPhone). Se houver incompatibilidade de SDK, consulte https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/ . Este projeto usa Expo SDK 57.

Para testar no navegador: `npm run web`. Para testar a lógica: `npm test`.

## Como funciona

- `App.js`: tema do Paper, tela principal e componentes `CalculatorButton` e `Display`. Os botões recebem valor e função por props. O componente principal usa `useState` para atualizar o visor.
- `src/calculator.js`: transições de estado e quatro operações, sem `eval`.
- `src/calculator.test.js`: testes automatizados da lógica com o test runner do Node.
- `app.json`: identificação e configuração Expo.

O visor aceita até 12 dígitos; os resultados são arredondados a 12 algarismos significativos. Vírgula decimal, troca de sinal, apagar e limpar estão disponíveis. Divisão por zero mostra uma mensagem e permite começar novamente digitando um número.

Operações encadeadas são realizadas da esquerda para a direita, como em uma calculadora simples: `2 + 3 × 4 = 20`. Não há precedência algébrica. O botão igual conclui a operação; pressioná-lo novamente não repete a operação.

## Conferência manual

- `8 + 2 = 10`, `8 − 2 = 6`, `8 × 2 = 16`, `8 ÷ 2 = 4`.
- `0,1 + 0,2 = 0,3`.
- `8 ÷ 0 =`: mensagem de erro. Digite `3` para reiniciar.
- `AC`: limpa tudo; `⌫`: remove um dígito, inclusive após o resultado; `±`: inverte o sinal.

