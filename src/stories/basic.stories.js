import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTable from './default-table';
import SelectTable from './select-table';
import SelectedArrayTable from './selected-array-table';
import ContextMenuTable from './context-menu-table';

storiesOf('01-Basic', module)
  .add('default table', () => <DefaultTable />)
  .add('select table', () => <SelectTable />)
  .add('selected-array table', () => <SelectedArrayTable />)
  .add('context-menu table', () => <ContextMenuTable />);
