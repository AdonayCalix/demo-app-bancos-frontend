<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import FormatoLps from "../utils/FormatoLps";

const ListaCuentasAhorros = ref()

const ObtenerListaCuentasAhorros = async () => {
  try {
    const response = await axios.get('http://localhost:5142/obtener-all-cuentas-ahorro');
    ListaCuentasAhorros.value = response.data;
  } catch (error) {
    console.error('Hubo un error al obtener los clientes:', error);
  }
}

onMounted(() => {
  ObtenerListaCuentasAhorros()
})

</script>

<template>

  <div class="container-fluid col-md-8 mt-3">
    <div class="card">
      <div class="card-header">
        <strong>Cuentas de Ahorros</strong>
      </div>
      <div class="card-body">
        <div class="mt-0">

          <RouterLink class="btn btn-success" to="/crear-cuenta-ahorro">Crear Cuentas Ahorros</RouterLink>

          <table class="table table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Número de Cuenta</th>
              <th>Saldo Inicial</th>
              <th>Saldo Actual</th>
              <th>Fecha Creación</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(CuentaAhorro, Index) in ListaCuentasAhorros">
              <td>{{ Index + 1}}</td>
              <td>{{ CuentaAhorro.nombreCliente }}</td>
              <td>{{ CuentaAhorro.numeroCuenta }}</td>
              <td>{{ FormatoLps(CuentaAhorro.saldoInicial) }}</td>
              <td>{{ FormatoLps(CuentaAhorro.saldoActual) }}</td>
              <td>{{ CuentaAhorro.fechaCreacion }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
/* Estilos adicionales si son necesarios */
</style>
