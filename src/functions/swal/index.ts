import Swal, { SweetAlertOptions } from 'sweetalert2'
import './style.css'

export const swal = (options: SweetAlertOptions<any, any>) => {
    Swal.fire({
        showClass: {
            popup: 'ANIMATED_ENTER',
        },
        hideClass: {
            popup: 'ANIMATED_EXIT',
        },
        ...options
    })
}
