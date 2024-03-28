import { Input as AntdInput, InputProps } from 'antd';
import React from 'react';

interface Props extends InputProps {}

export const Input: React.FC<Props> = props => {
  return <AntdInput {...props}>{props.children}</AntdInput>;
};
