import { Modal } from 'antd';
import type { ModalProps } from 'antd/es';
import { useRouter } from 'next/router';
import React, {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Props = {
  children: ReactNode;
};

interface OnrModalProps extends ModalProps {
  content: JSX.Element;
}

type GlobalModalContextContract = {
  showModal: (modalProps?: OnrModalProps) => void;
  hideModal: () => void;
  store: Store;
};

type Store = {
  modalProps?: OnrModalProps;
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

  const showModal = (modalProps?: OnrModalProps) => {
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

  const onOkClick = (e: MouseEvent<HTMLButtonElement>) => {
    modalProps?.onOk?.(e);
    hideModal();
  };

  const onCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    modalProps?.onCancel?.(e);
    hideModal();
  };

  const renderComponent = () => {
    return (
      <Modal
        title={modalProps?.title || ''}
        open={store.show}
        onOk={onOkClick}
        onCancel={onCancelClick}
        width={modalProps?.width ?? 1200}
        okText={modalProps?.okText || 'Close'}
        destroyOnClose
        {...modalProps}
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
