import { Toaster, toast } from "sonner";

export const successMessage = (texto) => toast.success(texto);
export const errorMessage = (texto) => toast.error(texto);
export const infoMessage = (texto) => toast.info(texto);
