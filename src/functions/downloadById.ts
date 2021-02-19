import { DownloadbleFile } from "../constants/types"

const BASE_URI = process.env.REACT_APP_API_URI

export const downloadFileFromDownloadble = (file: DownloadbleFile) => {
    const url = `${BASE_URI}file/download/${file._id}`
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url);
}
