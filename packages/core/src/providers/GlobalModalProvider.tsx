import { Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

type ModalProps = {
  title?: string;
  okText?: string;
  cancelText?: string;
  content: JSX.Element;
  onOk?(): void;
  onCancel?(): void;
};

type GlobalModalContextContract = {
  showModal: (modalProps?: ModalProps) => void;
  hideModal: () => void;
  store: Store;
};

type Store = {
  modalProps?: ModalProps;
  show: boolean;
};

const initialState: GlobalModalContextContract = {
  showModal: () => {},
  hideModal: () => {},
  store: {
    show: false,
    modalProps: {
      content: <></>,
    },
  },
};

export const GlobalModalContext = createContext(initialState);

export const useGlobalModal = () => useContext(GlobalModalContext);

export const GlobalModalProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [store, setStore] = useState<Store>(initialState.store);
  const { modalProps } = store || initialState.store;

  useEffect(() => {
    router.events.on('routeChangeComplete', hideModal);

    // unsubscribe on component destroy in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', hideModal);
    };
  }, [router]);

  const showModal = (modalProps?: ModalProps) => {
    setStore({
      ...store,
      modalProps,
      show: true,
    });
  };

  const hideModal = () => {
    setStore({
      ...initialState.store,
    });
  };

  const onOkClick = () => {
    modalProps?.onOk?.();
    hideModal();
  };

  const onCancelClick = () => {
    modalProps?.onCancel?.();
    hideModal();
  };

  const renderComponent = () => {
    return (
      <Modal
        title={modalProps?.title || ''}
        open={store.show}
        onOk={onOkClick}
        onCancel={onCancelClick}
        width={1200}
        okText={modalProps?.okText || 'Close'}
        cancelText={modalProps?.cancelText}
      >
        {store.show && modalProps?.content}
      </Modal>
    );
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
