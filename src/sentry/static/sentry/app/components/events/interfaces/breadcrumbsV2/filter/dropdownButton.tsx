import React from 'react';
import styled from '@emotion/styled';

import {t, tn} from 'app/locale';
import {GetActorPropsFn} from 'app/components/dropdownMenu';
import DropdownButton from 'app/components/dropdownButton';

type DropdownButtonProps = React.ComponentProps<typeof DropdownButton>;

type Props = {
  isOpen: boolean;
  getActorProps: GetActorPropsFn;
};

const DropDownButton = ({isOpen, getActorProps}: Props) => {
  const checkedOptionsQuantity = 1;

  const buttonProps = {
    label: t('Filter By'),
    priority: 'default',
    hasDarkBorderBottomColor: false,
  };

  if (checkedOptionsQuantity > 0) {
    buttonProps.label = tn(
      '%s Active Filter',
      '%s Active Filters',
      checkedOptionsQuantity
    );
    buttonProps.priority = 'primary';
    buttonProps.hasDarkBorderBottomColor = true;
  }

  return (
    <StyledDropdownButton
      {...getActorProps()}
      isOpen={isOpen}
      hasDarkBorderBottomColor={buttonProps.hasDarkBorderBottomColor}
      size="small"
      priority={buttonProps.priority as DropdownButtonProps['priority']}
    >
      {buttonProps.label}
    </StyledDropdownButton>
  );
};

export {DropDownButton};

const StyledDropdownButton = styled(DropdownButton)<{hasDarkBorderBottomColor?: boolean}>`
  border-right: 0;
  z-index: ${p => p.theme.zIndex.dropdown};
  border-radius: ${p =>
    p.isOpen
      ? `${p.theme.borderRadius} 0 0 0`
      : `${p.theme.borderRadius} 0 0 ${p.theme.borderRadius}`};
  white-space: nowrap;
  max-width: 200px;
  &:hover,
  &:active {
    border-right: 0;
  }
  ${p =>
    !p.isOpen &&
    p.hasDarkBorderBottomColor &&
    `
      border-bottom-color: ${p.theme.button.primary.border};
    `}
`;
