<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/"><strong>Demo App</strong></RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cuentas-ahorros"><strong>Cuentas Ahorrros</strong></RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/transacciones"><strong>Transacción</strong></RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/consulta-saldo"><strong>Saldo de Cuenta</strong></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView/>
</template>

<style scoped>
</style>
