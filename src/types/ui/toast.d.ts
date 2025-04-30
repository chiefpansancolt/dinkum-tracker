/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ToastContentProps } from "react-toastify";
import { TOAST_TYPES } from "@/data/constants";

export type ToastTypes = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

export interface ToastProps {
  message: string;
}

export interface CustomToastProps
  extends ToastContentProps<{
    message: string;
    type?: ToastTypes;
  }> {}
