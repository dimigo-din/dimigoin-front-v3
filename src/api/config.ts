import { api } from "./api";

export const getAllConfigs = () =>
    api<"config">("GET", "/config").then(e => e.config)