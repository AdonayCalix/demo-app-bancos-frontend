<script setup lang="ts">
// @ts-nocheck
import {useForm} from "vee-validate";
import schema from "@/validations/registro_transacciones_validation";
import {onMounted, ref} from "vue";
import axios from "axios";
import notifyError from "@/utils/ToastErrorNotificacion";
import notifySuccess from "@/utils/ToastSuccessNotificacion";
import type {IListaTipoMovimientos} from "@/interface/IListaTipoMovimientos";
import ErrorFormulario from "@/components/errores/ErrorFormulario.vue";

const ListaMovimientos: Array<IListaTipoMovimientos> = [
  {
    Id: "Deposito",
    Nombre: "Deposito"
  },
  {
    Id: "Retiro",
    Nombre: "Retiro"
  }
]

const {defineField, handleSubmit, errors} = useForm({
  validationSchema: schema
})

const [CuentaAhorroId] = defineField('CuentaAhorroId')
const [Tipo] = defineField('Tipo')
const [Monto] = defineField('Monto')

const showLoader = ref(false)
const errorList = ref('')

const onSubmit = handleSubmit(async (values, ctx) => {
  try {
    const response = await axios.post('http://localhost:5142/crear-movimiento', values);
    notifySuccess("Se agrego de forma exitosa la cuenta de ahorro")
    ctx.resetForm()
    errorList.value = ""
  } catch (err: any) {
    notifyError("Revisa los siguientes errores")
    errorList.value = err.response.data.errors
    console.log(errorList)
  }
})

const ListaCuentasAhorro = ref()
const ObtenerListaCuentasAhorros = async () => {
  try {
    const response = await axios.get('http://localhost:5142/obtener-cuentas-ahorro');
    ListaCuentasAhorro.value = response.data;
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
        <strong>Agregar Transacción</strong>
      </div>
      <div class="card-body">
        <ErrorFormulario :error-list="errorList"/>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="clienteId" class="form-label">Cuenta de Ahorro</label>
            <select :class="{ 'form-select': true, 'is-invalid': errors.CuentaAhorroId }" v-model="CuentaAhorroId">
              <option v-for="(CuentaAhorro, Index) in ListaCuentasAhorro" :value="CuentaAhorro.id">
                {{ CuentaAhorro?.numeroCuenta }}
              </option>
            </select>
            <div :class="{ 'invalid-feedback': errors.CuentaAhorroId }">{{ errors.CuentaAhorroId }}</div>
          </div>

          <div class="mb-3">
            <label for="clienteId" class="form-label">Tipo Movimiento</label>
            <select :class="{ 'form-select': true, 'is-invalid': errors.Tipo }" v-model="Tipo">
              <option v-for="(Tipo, Index) in ListaMovimientos" :value="Tipo.Id">{{ Tipo.Nombre }}</option>
            </select>
            <div :class="{ 'invalid-feedback': errors.Tipo }">{{ errors.Tipo }}</div>
          </div>

          <div class="mb-3">
            <label for="saldo" class="form-label">Monto</label>
            <input type="number" :class="{ 'form-control': true, 'is-invalid': errors.Monto }" id="monto"
                   v-model="Monto">
            <div :class="{ 'invalid-feedback': errors.Monto }">{{ errors.Monto }}</div>
          </div>

          <div class="d-flex align-items-start btn">
            <RouterLink class="btn btn-danger" to="/transacciones">Cancelar</RouterLink>&nbsp;
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