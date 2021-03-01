import Swal from 'sweetalert2';
import withReactContent, {
  ReactSweetAlertOptions,
} from 'sweetalert2-react-content';
import './style.css';

const SwalWithReact = withReactContent(Swal);

export const swal = (options: ReactSweetAlertOptions) =>
  SwalWithReact.fire({
    denyButtonText: '거부',
    cancelButtonText: '취소',
    confirmButtonText: '확인',
    showClass: {
      popup: 'ANIMATED_ENTER',
    },
    hideClass: {
      popup: 'ANIMATED_EXIT',
    },
    ...options,
  });
