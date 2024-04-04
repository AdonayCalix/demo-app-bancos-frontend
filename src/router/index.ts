import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreacionCuentaAhorros from "@/views/CuentaAhorros.vue";
import CreacionTransaccion from "@/views/Transacciones.vue";
import ConsultaSaldo from "@/views/ConsultaSaldo.vue";
import FormularioCreacionCuentaAhorros from "@/components/cuenta_ahorros/FormularioCreacion.vue";
import FormularioCreacionTransaccion from "@/components/transacciones/FormularioCreacion.vue";
import Transacciones from "@/views/Transacciones.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {path: '/cuentas-ahorros', component: CreacionCuentaAhorros},
        {path: '/crear-cuenta-ahorro', component: FormularioCreacionCuentaAhorros},

        {path: '/transacciones', component: Transacciones},
        {path: '/crear-transaccion', component: FormularioCreacionTransaccion},

        {path: '/crear-transaccion', component: CreacionTransaccion},
        {path: '/consulta-saldo', component: ConsultaSaldo}
    ]
})

export default router
