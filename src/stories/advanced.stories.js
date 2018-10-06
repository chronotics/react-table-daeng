import React from 'react';
import { storiesOf } from '@storybook/react';
import StressTable from './stress-table';
import InfiniteTable from './infinite-table';
import BouncingScrollTable from './bouncing-scroll-table';
import FixedColumnsTable from './fixed-columns-table';

storiesOf('02-Advanced', module)
  .add('stress-menu table', () => <StressTable />)
  .add('infinite table', () => <InfiniteTable />)
  .add('bouncing-scroll table', () => <BouncingScrollTable />)
  .add('fixed-columns table', () => <FixedColumnsTable />);
