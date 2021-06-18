import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes'
import { addReadme } from 'storybook-readme/vue';
import { setOptions } from '@storybook/addon-options'
import {withCssResources} from '@storybook/addon-cssresources'
import {withA11y} from '@storybook/addon-a11y'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import { Button } from 'vant'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

import Vue from 'vue'

Vue.use(Button)


// const req = require.context('../stories', true, /\.js$/)

function loadStories() {
	const req2 = require.context('../src/components', true, /.stories.jsx?/)
	req2.keys().forEach((filename) => req2(filename))
	const req = require.context('../stories', true, /\.js$/)
	req.keys().forEach(filename => req(filename))
}

setOptions({
  name: 'mi-Vant',
  url: '#',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: true,
  addonPanelInRight: true,
  sortStoriesByKind: false,
  hierarchySeparator: null,
  hierarchyRootSeparator: null,
  sidebarAnimations: true,
  selectedAddonPanel: undefined,
})

addParameters({
	viewport: {
		defaultViewport: 'iphonex',
		viewports: INITIAL_VIEWPORTS
	},
})
addDecorator(addReadme);
addDecorator(withNotes)
addDecorator(withNotes)
addDecorator(withCssResources)
addDecorator(withA11y)
configure(loadStories, module);
