<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";

const FormatoLps = (value: number): string => {
  const formatter = new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL',
    minimumFractionDigits: 2
  });

  return formatter.format(value);
}

const ListaTransacciones = ref()
const ObtenerListaCuentasAhorros = async () => {
  try {
    const response = await axios.get('http://localhost:5142/obtener-all-transacciones');
    ListaTransacciones.value = response.data;
  } catch (error) {
    console.error('Hubo un error al obtener las transacciones:', error);
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
        <strong>Transacciones</strong>
      </div>
      <div class="card-body">
        <div class="mt-0">

          <RouterLink class="btn btn-success" to="/crear-transaccion">Crear Transaccion</RouterLink>

          <table class="table table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>Número Cuentas Ahorro</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha Creación</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(Movimiento, Index) in ListaTransacciones">
              <td>{{ Index + 1 }}</td>
              <td>{{ Movimiento.numeroCuenta }}</td>
              <td>{{ Movimiento.tipo }}</td>
              <td>{{ FormatoLps(Movimiento.monto) }}</td>
              <td>{{ Movimiento.fechaCreacion }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>