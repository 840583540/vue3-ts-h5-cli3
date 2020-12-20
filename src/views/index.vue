<template>
  <div>
    <router-view v-if="!pageLoadiing"></router-view>
    <router-view v-else name="skeleton"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Home',
  setup () {
    return {
      pageLoadiing: false
    }
  }
});
</script>

<style>

</style>