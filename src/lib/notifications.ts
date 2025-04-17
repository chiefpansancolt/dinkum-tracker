import { toast } from "react-toastify";
import { ToastProps } from "@/types/ui/toast";
import { TOAST_TYPES } from "@/data/constants";
import CustomToast from "@/comps/Toast";

export const errorToast = ({ message }: ToastProps) => {
  toast(CustomToast, {
    data: {
      message: message,
      type: TOAST_TYPES.ERROR,
    },
    autoClose: false,
  });
};

export const successToast = ({ message }: ToastProps) => {
  toast(CustomToast, {
    data: {
      message: message,
      type: TOAST_TYPES.SUCCESS,
    },
  });
};

export const infoToast = ({ message }: ToastProps) => {
  toast(CustomToast, {
    data: {
      message: message,
      type: TOAST_TYPES.INFO,
    },
  });
};

export const warningToast = ({ message }: ToastProps) => {
  toast(CustomToast, {
    data: {
      message: message,
      type: TOAST_TYPES.WARNING,
    },
  });
};
