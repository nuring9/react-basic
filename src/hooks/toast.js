import { v4 as uuidv4 } from "uuid";

import { addToast as add, removeToasts } from "../store/toastSlice"; // 이미 addToast 상수가 있기 때문에 add로 이름을 변경.
import { useDispatch } from "react-redux";

const useToast = () => {
  const dispatch = useDispatch();

  const deleteToast = (id) => {
    // const filteredToasts = toasts.current.filter((toast) => {
    //   return toast.id !== id;
    // });
    // toasts.current = filteredToasts;

    // setToastsRerender((prev) => !prev);
    dispatch(removeToasts(id));
  };

  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id, // id: id
    };

    dispatch(add(toastWithId));
    // toasts.current = [...toasts.current, toastWithId];
    // setToastsRerender((prev) => !prev);

    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  return { addToast, deleteToast }; // 객체로 변경해주면 순서와 상관없이 사용할 수 있다.
};

export default useToast;
