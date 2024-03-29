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

export interface OnrModalProps extends ModalProps {
  content: JSX.Element;
  onOkClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCancelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  showFooter?: boolean;
}

type GlobalModalContextContract = {
  showModal: (modalProps: OnrModalProps) => void;
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

  const showModal = (props: OnrModalProps) => {
    const modalProps: OnrModalProps = { ...props };
    if (!modalProps?.showFooter) {
      modalProps.footer = null;
    }

    setStore({
      ...initialState.store,
      modalProps,
      show: true,
    });
  };

  const hideModal = () => {
    setStore(store => ({
      ...store,
      show: false,
    }));
  };

  const onOkClick = (e: MouseEvent<HTMLButtonElement>) => {
    modalProps?.onOkClick?.(e);
    hideModal();
  };

  const onCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    modalProps?.onCancelClick?.(e);
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
        okText={modalProps?.okText || 'Submit'}
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
