import { useEffect } from "react";
import { Store } from "react-notifications-component";

export default function useNotify(msg: string) {
  

    useEffect(() => {
        Store.addNotification({
          message: msg,
          type: "success",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
        });
    });
  }
