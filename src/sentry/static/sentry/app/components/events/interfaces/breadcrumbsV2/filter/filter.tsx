import React from 'react';
import styled from '@emotion/styled';

import {t} from 'app/locale';
import DropdownControl from 'app/components/dropdownControl';

import {DropDownButton} from './dropdownButton';
import {OptionsGroup} from './optionsGroup';
import {Header} from './header';
import {OptionType, OptionLevel} from './types';

type Props = {
  options: [Array<OptionType>, Array<OptionLevel>];
  onClickOption: () => void;
  onCheckAll: () => void;
};

const Filter = ({options, onClickOption, onCheckAll}: Props) => {
  const hasTypeOption = options[0].length > 0;
  const hasLevelOption = options[1].length > 0;

  if (!hasTypeOption && !hasLevelOption) {
    return null;
  }

  const getCheckedQuantity = () => {
    let checkedQuantity = 0;

    for (const index in options) {
      for (const option in options[index]) {
        if (options[index][option].isChecked) {
          checkedQuantity += 1;
        }
      }
    }

    return checkedQuantity;
  };

  return (
    <Wrapper>
      <DropdownControl
        menuWidth="240px"
        blendWithActor
        button={({isOpen, getActorProps}) => (
          <DropDownButton isOpen={isOpen} getActorProps={getActorProps} />
        )}
      >
        <React.Fragment>
          <Header
            onCheckAll={onCheckAll}
            checkedQuantity={getCheckedQuantity()}
            isAllChecked={false}
          />
          {hasTypeOption && (
            <OptionsGroup title={t('Type')} onClick={onClickOption} data={options[0]} />
          )}

          {hasLevelOption && (
            <OptionsGroup title={t('Level')} onClick={onClickOption} data={options[1]} />
          )}
        </React.Fragment>
      </DropdownControl>
    </Wrapper>
  );
};

export {Filter};

const Wrapper = styled('div')`
  position: relative;
  display: flex;
`;
