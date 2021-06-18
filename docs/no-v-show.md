# Prefer `hidden` attribute over `v-show` directive

## Fail

```vue
<template>
  <div v-show="!foo"></div>
</template>
```

## Pass

```vue
<template>
  <div :hidden="foo"></div>
</template>
```
