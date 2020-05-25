import React from 'react';
import styled from '@emotion/styled';

import {Event} from 'app/types';
import Tooltip from 'app/components/tooltip';
import space from 'app/styles/space';

import {Time} from './time';
import {CollapsedInfo} from './collapsedInfo';
import BreadcrumbData from './breadcrumbData/breadcrumbData';
import {Category} from './category';
import {Icon} from './icon';
import {Level} from './level';
import {Grid, GridCell, GridCellLeft} from './styles';
import {Breadcrumb, BreadcrumbDetails, BreadcrumbType} from './types';

type Breadcrumbs = Array<Breadcrumb & BreadcrumbDetails & {id: number}>;

type Props = {
  breadcrumbs: Breadcrumbs;
  collapsedQuantity: number;
  onToggleCollapse: () => void;
  event: Event;
  orgId: string | null;
};

type State = {
  containerMaxHeight?: React.CSSProperties['maxHeight'];
};

class ListBody extends React.Component<Props, State> {
  state: State = {};

  componentDidMount() {
    this.loadContainerMaxHeight();
  }

  containerRef = React.createRef<HTMLDivElement>();

  loadContainerMaxHeight = () => {
    const offsetHeight = this.containerRef?.current?.offsetHeight;
    this.setState({
      containerMaxHeight: offsetHeight ? `${offsetHeight}px` : 'none',
    });
  };

  render() {
    const {collapsedQuantity, onToggleCollapse, breadcrumbs, event, orgId} = this.props;
    const {containerMaxHeight} = this.state;

    return (
      <Grid maxHeight={containerMaxHeight} ref={this.containerRef}>
        {collapsedQuantity > 0 && (
          <CollapsedInfo onClick={onToggleCollapse} quantity={collapsedQuantity} />
        )}
        {breadcrumbs.map(({color, icon, ...crumb}, idx) => {
          const hasError = crumb.type === BreadcrumbType.ERROR;
          const isLastItem = breadcrumbs.length - 1 === idx;
          return (
            <React.Fragment key={idx}>
              <GridCellLeft hasError={hasError} isLastItem={isLastItem}>
                <Tooltip title={crumb.description}>
                  <Icon icon={icon} color={color} />
                </Tooltip>
              </GridCellLeft>
              <GridCellCategory hasError={hasError} isLastItem={isLastItem}>
                <Category category={crumb?.category} />
              </GridCellCategory>
              <GridCell hasError={hasError} isLastItem={isLastItem}>
                <BreadcrumbData
                  event={event}
                  orgId={orgId}
                  breadcrumb={crumb as Breadcrumb}
                />
              </GridCell>
              <GridCell hasError={hasError} isLastItem={isLastItem}>
                <Level level={crumb.level} />
              </GridCell>
              <GridCell hasError={hasError} isLastItem={isLastItem}>
                <Time timestamp={crumb.timestamp} />
              </GridCell>
            </React.Fragment>
          );
        })}
      </Grid>
    );
  }
}

export {ListBody};

const GridCellCategory = styled(GridCell)`
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding-left: ${space(1)};
  }
`;
