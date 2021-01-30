import { OutgoRequestForm } from ".";
import { api } from "./api";

export const requestOutgo = (outgoForm: OutgoRequestForm) => api<"requestOutgo">("POST", "/outgo-request", outgoForm)