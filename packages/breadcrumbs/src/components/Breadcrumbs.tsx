import React from 'react';
import styled from 'styled-components';
import { BreadcrumbsRoute } from '../interfaces';

interface Props {
  wrapperClassName?: string;
  currentBreadcrumbsClassName?: string;
  routes: BreadcrumbsRoute[];
}

const StyledWrapper = styled.div`
  .is-current {
    font-weight: bold;
  }
`

export const Breadcrumbs: React.FC<Props> = props => {
  const {
    wrapperClassName = 'breadcrumbs-wrapper',
    currentBreadcrumbsClassName = 'is-current',
    routes,
  } = props;

  return (
    <StyledWrapper className={wrapperClassName}>
      {routes.map((route, index) => {
        const { label: LabelComponent, children, props } = route;
        if (typeof LabelComponent === 'string') {
          if (!children) {
            return (
              <span
                key={index}
                className={currentBreadcrumbsClassName}
              >
                {LabelComponent}
              </span>
            );
          }

          return (
            <>
              <span key={index} className={currentBreadcrumbsClassName}>{LabelComponent}</span>;

            </>
          )
        }

        return <LabelComponent key={index} {...props} />;
      })}
    </StyledWrapper>
  )
};
