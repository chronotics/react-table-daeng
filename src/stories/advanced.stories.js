import React from 'react';
import { storiesOf } from '@storybook/react';
import StressTable from './stress-table';

storiesOf('02-Advanced', module).add('stress-menu table', () => (
  <StressTable />
));
