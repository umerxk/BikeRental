import { message } from 'antd';

const success = (msg) => {
  message.success(msg);
};

const error = (msg) => {
  message.error(msg);
};

const warning = (msg) => {
  message.warning(msg);
};

const MessageToast = {
    success,
    error,
    warning
}

const AppMessages = ({ msg, type }) => (
    MessageToast[type](msg)
);

export default AppMessages;
