
((module) => {
	'use strict';

	var {statSync, writeFileSync} = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var _mkdirSync = require('fs-force-mkdir-sync');
	var _rmSync = require('fs-force-delete-sync');
	var Info = require('fs-force-utils/info');
	var Action = require('fs-force-utils/action');
	var _donothing = require('fs-force-utils/do-nothing');
	var flatArray = require('fs-force-utils/flat-array');
	var _getdesc = require('fs-force-utils/write-file-desc');

	var resolvePath = path.resolve;
	var getParent = path.dirname;

	var _writeFileSync = (filename, descriptor, onaction) => {
		var callOnAction = (action) =>
			justTry(() => onaction(action), (error) => console.error(error));
		var createInfo = (...action) =>
			new Info('mkfile', filename, action);
		var data = descriptor.data;
		var options = descriptor.options;
		var mkdiract = _mkdirSync(getParent(filename), onaction).action;
		return justTry(() => statSync(filename), () => write('create'), handleExist);
		function handleExist(statinfo) {
			if (statinfo.isDirectory()) {
				let rmact = _rmSync(filename, onaction).action;
				return write('create', ...flatArray(rmact));
			}
			if (statinfo.isFile()) {
				return write('edit');
			}
			throw new Error(`Can't write "${filename}" as a file`);
		}
		function write(type, ...nextact) {
			writeFileSync(filename, data, options);
			var action = new Action(type, filename, 'file');
			justTry(onaction, [action]);
			return createInfo(...flatArray(mkdiract), ...nextact, action);
		}
	};

	module.exports = (filename, descriptor, onaction = _donothing) =>
		_writeFileSync(resolvePath(filename), _getdesc(descriptor), onaction);

})(module);
