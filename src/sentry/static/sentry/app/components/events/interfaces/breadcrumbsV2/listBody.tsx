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
  maxHeight?: React.CSSProperties['maxHeight'];
};

const ListBody = React.forwardRef<HTMLDivElement, Props>(
  ({collapsedQuantity, onToggleCollapse, orgId, event, maxHeight, breadcrumbs}, ref) => (
    <Grid maxHeight={maxHeight} ref={ref}>
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
  )
);

export {ListBody};

const GridCellCategory = styled(GridCell)`
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding-left: ${space(1)};
  }
`;
