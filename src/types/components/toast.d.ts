import { ToastContentProps } from "react-toastify";
import { TOAST_TYPES } from "@/data/toastTypes";

export type ToastTypes = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

type CustomToastProps = ToastContentProps<{
  message: string;
  type?: ToastTypes;
}>;

export interface ToastProps {
  message: string;
}
