import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Button', module).add('with text', () => (
  <button onClick={action('clicked')}>Hello Button</button>
));
