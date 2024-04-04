<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import FormatoLps from "@/utils/FormatoLps";

const ListaCuentasAhorro = ref()
const DatosUltimaTransaccion = ref()
const CuentaAhorroId = ref<string>()
const ObtenerListaCuentasAhorros = async () => {
  try {
    const response = await axios.get('http://localhost:5142/obtener-cuentas-ahorro');
    ListaCuentasAhorro.value = response.data;
  } catch (error) {
    console.error('Hubo un error al obtener los clientes:', error);
  }
}

const ObtenerInformacionSobreCuenta = async () => {
  try {
    const response = await axios.get(`http://localhost:5142/obtener-ultimo-movimiento/${CuentaAhorroId.value}`);
    DatosUltimaTransaccion.value = response.data;
  } catch (error) {
    console.error('Hubo un error al obtener los datos de la ultima transaccion:', error);
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
        <strong>Consulta de Saldo</strong>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="clienteId" class="form-label">Cuenta de Ahorro</label>

          <select :class="{ 'form-select': true}" v-model="CuentaAhorroId" @change="ObtenerInformacionSobreCuenta">
            <option v-for="(CuentaAhorro, Index) in ListaCuentasAhorro" :value="CuentaAhorro.id">
              {{ CuentaAhorro?.numeroCuenta }}
            </option>
          </select>
        </div>

        <div v-if="DatosUltimaTransaccion">
          <div class="mt-3">
            <p><strong>Información Sobre Cuenta Ahorro</strong></p>
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Cliente</th>
                <th>Número de Cuenta</th>
                <th>Saldo Inicial</th>
                <th>Saldo Actual</th>
                <th>Fecha Creación</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ DatosUltimaTransaccion?.nombreCompleto }}</td>
                <td>{{ DatosUltimaTransaccion?.numeroCuenta }}</td>
                <td>{{ FormatoLps(DatosUltimaTransaccion?.saldoInicial) }}</td>
                <td>{{ FormatoLps(DatosUltimaTransaccion?.saldoActual) }}</td>
                <td>{{ DatosUltimaTransaccion?.fechaCreacionCuenta  }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-3">
            <p><strong>Información Sobre Ultima Transacción</strong></p>
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Número Cuentas Ahorro</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha Creación</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ DatosUltimaTransaccion?.numeroCuenta }}</td>
                <td>{{ DatosUltimaTransaccion?.tipo }}</td>
                <td>{{ FormatoLps(DatosUltimaTransaccion?.monto) }}</td>
                <td>{{ DatosUltimaTransaccion?.fechaCreacion }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>