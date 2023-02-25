import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const toasts = useRef([]);
  const [, setToastsRerender] = useState(false);

  const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter((toast) => {
      return toast.id !== id;
    });
    toasts.current = filteredToasts;

    setToastsRerender((prev) => !prev);
  };

  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id, // id: id
    };

    toasts.current = [...toasts.current, toastWithId];

    setToastsRerender((prev) => !prev);

    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  return [toasts.current, addToast, deleteToast];
};

export default useToast;
