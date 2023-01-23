import { FC } from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";

const Toast: FC<ToastContainerProps> = (props) => {
  return <ToastContainer {...props} bodyClassName="text-xs" />;
};

export default Toast;

