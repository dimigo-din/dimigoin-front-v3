import { api } from "./api";

export const getAllCircles = () =>
    api<"allCircle">("GET", "/circle").then(e => e.circles)