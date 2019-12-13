<template>
  <div id="app">
    {{messages}}
  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => ({ messages: ['Hey John', 'Howdy Paco'] })
}
</script>