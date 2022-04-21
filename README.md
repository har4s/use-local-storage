# Use Local Storage

A React Hook for using Browser Local/Session Storage

## Installation

```shell
npm install @har4s/use-local-storage
```

or

```shell
yarn add @har4s/use-local-storage
```

## Usage

```js
import { useLocalStorage } from '@har4s/use-local-storage';
// or import { useSessionStorage } from '@har4s/use-local-storage';

export const Example = () => {
  // ...
  const [something, setSomething] = useLocalStorage('key', 'fallback');
  // or const [something, setSomething] = useSessionStorage('key', {...});
  // ...
};
```
