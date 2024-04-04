<script setup lang="ts">
// @ts-nocheck
import {ErrorMessage, useForm} from "vee-validate";
import schema from "@/validations/cuenta_ahorros_validation";
import {onMounted, ref} from "vue";
import axios from "axios";
import notifyError from "@/utils/ToastErrorNotificacion";
import notifySuccess from "@/utils/ToastSuccessNotificacion";
import ErrorFormulario from "@/components/errores/ErrorFormulario.vue";

const {defineField, handleSubmit, errors} = useForm({
  validationSchema: schema
})

const [ClienteId] = defineField('ClienteId')
const [NumeroCuenta] = defineField('NumeroCuenta')
const [SaldoInicial] = defineField('SaldoInicial')

const showLoader = ref(false)
const errorList = ref('')

const onSubmit = handleSubmit(async (values, ctx) => {
  console.log(values)

  try {
    const response = await axios.post('http://localhost:5142/crear-cuenta-ahorro', values);
    notifySuccess("Se agrego de forma exitosa la cuenta de ahorro")
    ctx.resetForm()
    errorList.value = ""
  } catch (err: any) {
    notifyError("Revisa los siguientes errores")
    errorList.value = err.response.data.errors
    console.log(errorList)
  }
})

const ListaClientes = ref()
const ObtenerListaClientes = async () => {
  try {
    const response = await axios.get('http://localhost:5142/obtener-clientes');
    ListaClientes.value = response.data;
  } catch (error) {
    console.error('Hubo un error al obtener los clientes:', error);
  }
}

onMounted(() => {
  ObtenerListaClientes()
})
</script>

<template>

  <div class="container-fluid col-md-8 mt-3">
    <div class="card">
      <div class="card-header">
        <strong>Agregar Cuenta de Ahorro</strong>
      </div>
      <div class="card-body">
        <ErrorFormulario :error-list="errorList"/>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="clienteId" class="form-label">ID del Cliente</label>
            <select :class="{ 'form-select': true, 'is-invalid': errors.ClienteId }" v-model="ClienteId">
              <option v-for="(Cliente, Index) in ListaClientes" :value="Cliente.id">{{
                  Cliente.nombreCompleto
                }}
              </option>
            </select>
            <div :class="{ 'invalid-feedback': errors.ClienteId }">{{ errors.ClienteId }}</div>
          </div>
          <div class="mb-3">
            <label for="numeroCuenta" class="form-label">Número de Cuenta</label>
            <input type="text" :class="{ 'form-control': true, 'is-invalid': errors.NumeroCuenta }" id="numeroCuenta"
                   v-model="NumeroCuenta">
            <div :class="{ 'invalid-feedback': errors.NumeroCuenta }">{{ errors.NumeroCuenta }}</div>
          </div>
          <div class="mb-3">
            <label for="saldo" class="form-label">Saldo</label>
            <input type="number" :class="{ 'form-control': true, 'is-invalid': errors.SaldoInicial }" id="saldo"
                   v-model="SaldoInicial">
            <div :class="{ 'invalid-feedback': errors.SaldoInicial }">{{ errors.SaldoInicial }}</div>
          </div>
          <div class="d-flex align-items-start btn">
            <RouterLink class="btn btn-danger" to="/cuentas-ahorros">Cancelar</RouterLink>&nbsp;
            <button type="submit" class="btn btn-success">
              Agregar Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>