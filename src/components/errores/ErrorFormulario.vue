<script setup>
// @ts-nocheck
const props = defineProps({
  errorList: {
    type: Object,
    required: true
  }
});
</script>


<template>
  <div v-if="errorList" class="alert alert-danger" role="alert">
    <h6><strong>Errores de validación</strong></h6>
    <div v-for="(errors, field) in errorList" :key="field">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style>

</style>