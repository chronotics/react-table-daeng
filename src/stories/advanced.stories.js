import React from 'react';
import { storiesOf } from '@storybook/react';
import StressTable from './stress-table';
import InfiniteTable from './infinite-table';

storiesOf('02-Advanced', module)
  .add('stress-menu table', () => <StressTable />)
  .add('infinite table', () => <InfiniteTable />);
