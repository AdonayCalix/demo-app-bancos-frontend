import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
const notifyError = (mensaje: string) => {
    toast(mensaje, {
        autoClose: 5000,
        type: "error",
        "position": "bottom-right",
        "transition": "flip",
    });
}

export default notifyError