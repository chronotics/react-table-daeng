import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTable from './default-table';
import SelectTable from './select-table';

storiesOf('Basic', module)
  .add('default table', () => <DefaultTable />)
  .add('select table', () => <SelectTable />);
