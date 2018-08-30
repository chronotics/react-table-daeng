import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTable from './default-table';
import SelectTable from './select-table';
import ContextMenuTable from './context-menu-table';

storiesOf('01-Basic', module)
  .add('default table', () => <DefaultTable />)
  .add('select table', () => <SelectTable />)
  .add('context-menu table', () => <ContextMenuTable />);
