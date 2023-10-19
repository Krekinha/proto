import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

export const notifyService = {
  success,
  error,
};

function success(msg: string, title?: string) {
  toast.success(msg, {
    position: "top-center",
    hideProgressBar: true,
    autoClose: 1500,
    theme: "colored",
    transition: Zoom,
  });
}

function error(msg: any, title?: string) {
  toast.error(msg, {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "colored",
    transition: Zoom,
  });
}
