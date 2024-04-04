import * as yup from 'yup'

const schema = yup.object({
    CuentaAhorroId: yup
        .number()
        .typeError('El identificador de la cuenta de ahorro debe ser un número')
        .required('Debes de indicar la cuenta de ahorro')
        .nonNullable()
        .label('Cuenta de Ahorro'),
    Tipo: yup
        .string()
        .required('Debes de indicar el tipo de transacción')
        .label('Tipo de Movimiento'),
    Monto: yup
        .number()
        .typeError('Monto debe ser un número')
        .required('Debes de indicar el monto de la transacción')
        .nonNullable()
        .label('Monto'),
   /* FechaMovimiento: yup
        .date()
        .typeError('Fecha debe ser tipo date')
        .required('Debes de indicar una fecha')
        .nonNullable()
        .label('Fecha')*/
})

export default schema