import React from 'react';
import { useSelector } from 'react-redux';
import { CoreStore } from '../../../redux';

type Props = {
  HeaderMainSection: React.FC<any>;
};

export const Header: React.FC<Props> = ({ HeaderMainSection }: Props) => {
  // const dispatch = useDispatch();
  const { name } = useSelector((store: CoreStore) => store.coreStore);

  // TODO: create a simple header component
  return (
    <>
      <div>{name}</div>
      <HeaderMainSection />
    </>
  );
};
