import * as yup from 'yup'

const schema = yup.object({
    ClienteId: yup
        .number()
        .typeError('Cliente debe ser un número')
        .required('Debes de indicar el cliente')
        .nonNullable()
        .label('Cliente'),
    NumeroCuenta: yup
        .string()
        .required('Debes de indicar un número de cuenta')
        .typeError('El número de cuenta no puede contener letras, caracteres o simbolos especiales')
        .matches(/^\d{10}$/, 'El número debe tener exactamente 10 dígitos y ser numérico')
        .label('Número de Cuenta'),
    SaldoInicial: yup
        .number()
        .typeError('Saldo debe ser un número')
        .required('Debes de indicar el saldo inicial de la cuenta')
        .nonNullable()
        .label('Saldo')
})

export default schema