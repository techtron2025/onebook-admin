import focus from './modules/focus';
import clickOutside from './modules/clickOutside.js';
import lazy from './modules/lazy.js';

const directivesList = {
	focus,
	clickOutside,
      lazy
};

const directives = {
	install: function (app) {
		Object.keys(directivesList).forEach((key) => {
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
