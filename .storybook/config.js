import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/basic.stories.js');
  require('../src/stories/advanced.stories.js');
}

configure(loadStories, module);
