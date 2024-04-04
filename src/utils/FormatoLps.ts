const FormatoLps = (value: number): string => {
    const formatter = new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
        minimumFractionDigits: 2
    });

    return formatter.format(value);
}

export default FormatoLps