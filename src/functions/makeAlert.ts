import { toast } from "react-toastify"

const makeAlert = () => {

}
export default {
  error(message: string) {
    toast(message, {
      type: 'error'
    })
  }
}