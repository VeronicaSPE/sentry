import React from 'react';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';

import {t} from 'app/locale';
import DropdownControl from 'app/components/dropdownControl';

import {DropDownButton} from './dropdownButton';
import {OptionsGroup} from './optionsGroup';
import {Header} from './header';
import {OptionType, OptionLevel} from './types';

type Props = {
  options: [Array<OptionType>, Array<OptionLevel>];
  onClickOption: () => void;
  onCheckAll: (checkAll: boolean) => void;
};

type State = {
  checkAll: boolean;
  hasTypeOption: boolean;
  hasLevelOption: boolean;
  checkedQuantity: number;
};

class Filter extends React.Component<Props, State> {
  state: State = {
    checkAll: true,
    hasTypeOption: false,
    hasLevelOption: false,
    checkedQuantity: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps.options, this.props.options)) {
      this.updateState();
    }
  }

  updateState = () => {
    const {options} = this.props;
    this.setState({
      hasTypeOption: options[0].length > 0,
      hasLevelOption: options[1].length > 0,
      checkedQuantity: this.getCheckedQuantity(),
    });
  };

  handleToggleCheckAll = () => {
    const {onCheckAll} = this.props;

    this.setState(
      prevState => ({
        checkAll: !prevState.checkAll,
      }),
      () => {
        onCheckAll(this.state.checkAll);
      }
    );
  };

  getCheckedQuantity = () => {
    const {options} = this.props;

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

  render() {
    const {options, onClickOption} = this.props;
    const {hasTypeOption, hasLevelOption, checkedQuantity} = this.state;

    if (!hasTypeOption && !hasLevelOption) {
      return null;
    }

    return (
      <Wrapper>
        <DropdownControl
          menuWidth="240px"
          blendWithActor
          button={({isOpen, getActorProps}) => (
            <DropDownButton
              isOpen={isOpen}
              getActorProps={getActorProps}
              checkedQuantity={checkedQuantity}
            />
          )}
        >
          <React.Fragment>
            <Header
              onCheckAll={this.handleToggleCheckAll}
              checkedQuantity={checkedQuantity}
              isAllChecked={false}
            />
            {hasTypeOption && (
              <OptionsGroup title={t('Type')} onClick={onClickOption} data={options[0]} />
            )}

            {hasLevelOption && (
              <OptionsGroup
                title={t('Level')}
                onClick={onClickOption}
                data={options[1]}
              />
            )}
          </React.Fragment>
        </DropdownControl>
      </Wrapper>
    );
  }
}

export {Filter};

const Wrapper = styled('div')`
  position: relative;
  display: flex;
`;
