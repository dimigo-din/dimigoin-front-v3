import { toast } from "react-toastify"

export default {
  error(message: string) {
    toast(message, {
      type: 'error'
    })
  }
}