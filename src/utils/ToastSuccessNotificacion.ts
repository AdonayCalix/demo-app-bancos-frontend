import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
const notifySuccess = (mensaje: string) => {
    toast(mensaje, {
        autoClose: 5000,
        type: "success",
        "position": "bottom-right",
        "transition": "flip",
    });
}

export default notifySuccess