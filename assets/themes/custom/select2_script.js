/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function (root, jQuery) {
			if (jQuery === undefined) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function (jQuery) {
	// This is needed so we can catch the AMD loader configuration and use it
	// The inner file should be wrapped (by `banner.start.js`) in a function that
	// returns the AMD loader references.
	var S2 = (function () {
		// Restore the Select2 AMD loader so it can be used
		// Needed mostly in the language files, where the loader is not inserted
		if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
			var S2 = jQuery.fn.select2.amd;
		}
		var S2;
		(function () {
			if (!S2 || !S2.requirejs) {
				if (!S2) {
					S2 = {};
				} else {
					require = S2;
				}
				/**
				 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
				 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
				 */
				//Going sloppy to avoid 'use strict' string cost, but strict practices should
				//be followed.
				/*global setTimeout: false */

				var requirejs, require, define;
				(function (undef) {
					var main, req, makeMap, handlers,
						defined = {},
						waiting = {},
						config = {},
						defining = {},
						hasOwn = Object.prototype.hasOwnProperty,
						aps = [].slice,
						jsSuffixRegExp = /\.js$/;

					function hasProp(obj, prop) {
						return hasOwn.call(obj, prop);
					}

					/**
					 * Given a relative module name, like ./something, normalize it to
					 * a real name that can be mapped to a path.
					 * @param {String} name the relative name
					 * @param {String} baseName a real name that the name arg is relative
					 * to.
					 * @returns {String} normalized name
					 */
					function normalize(name, baseName) {
						var nameParts, nameSegment, mapValue, foundMap, lastIndex,
							foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
							baseParts = baseName && baseName.split("/"),
							map = config.map,
							starMap = (map && map['*']) || {};

						//Adjust any relative paths.
						if (name) {
							name = name.split('/');
							lastIndex = name.length - 1;

							// If wanting node ID compatibility, strip .js from end
							// of IDs. Have to do this here, and not in nameToUrl
							// because node allows either .js or non .js to map
							// to same file.
							if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
								name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
							}

							// Starts with a '.' so need the baseName
							if (name[0].charAt(0) === '.' && baseParts) {
								//Convert baseName to array, and lop off the last part,
								//so that . matches that 'directory' and not name of the baseName's
								//module. For instance, baseName of 'one/two/three', maps to
								//'one/two/three.js', but we want the directory, 'one/two' for
								//this normalization.
								normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
								name = normalizedBaseParts.concat(name);
							}

							//start trimDots
							for (i = 0; i < name.length; i++) {
								part = name[i];
								if (part === '.') {
									name.splice(i, 1);
									i -= 1;
								} else if (part === '..') {
									// If at the start, or previous value is still ..,
									// keep them so that when converted to a path it may
									// still work when converted to a path, even though
									// as an ID it is less than ideal. In larger point
									// releases, may be better to just kick out an error.
									if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
										continue;
									} else if (i > 0) {
										name.splice(i - 1, 2);
										i -= 2;
									}
								}
							}
							//end trimDots

							name = name.join('/');
						}

						//Apply map config if available.
						if ((baseParts || starMap) && map) {
							nameParts = name.split('/');

							for (i = nameParts.length; i > 0; i -= 1) {
								nameSegment = nameParts.slice(0, i).join("/");

								if (baseParts) {
									//Find the longest baseName segment match in the config.
									//So, do joins on the biggest to smallest lengths of baseParts.
									for (j = baseParts.length; j > 0; j -= 1) {
										mapValue = map[baseParts.slice(0, j).join('/')];

										//baseName segment has  config, find if it has one for
										//this name.
										if (mapValue) {
											mapValue = mapValue[nameSegment];
											if (mapValue) {
												//Match, update name to the new value.
												foundMap = mapValue;
												foundI = i;
												break;
											}
										}
									}
								}

								if (foundMap) {
									break;
								}

								//Check for a star map match, but just hold on to it,
								//if there is a shorter segment match later in a matching
								//config, then favor over this star map.
								if (!foundStarMap && starMap && starMap[nameSegment]) {
									foundStarMap = starMap[nameSegment];
									starI = i;
								}
							}

							if (!foundMap && foundStarMap) {
								foundMap = foundStarMap;
								foundI = starI;
							}

							if (foundMap) {
								nameParts.splice(0, foundI, foundMap);
								name = nameParts.join('/');
							}
						}

						return name;
					}

					function makeRequire(relName, forceSync) {
						return function () {
							//A version of a require function that passes a moduleName
							//value for items that may need to
							//look up paths relative to the moduleName
							var args = aps.call(arguments, 0);

							//If first arg is not require('string'), and there is only
							//one arg, it is the array form without a callback. Insert
							//a null so that the following concat is correct.
							if (typeof args[0] !== 'string' && args.length === 1) {
								args.push(null);
							}
							return req.apply(undef, args.concat([relName, forceSync]));
						};
					}

					function makeNormalize(relName) {
						return function (name) {
							return normalize(name, relName);
						};
					}

					function makeLoad(depName) {
						return function (value) {
							defined[depName] = value;
						};
					}

					function callDep(name) {
						if (hasProp(waiting, name)) {
							var args = waiting[name];
							delete waiting[name];
							defining[name] = true;
							main.apply(undef, args);
						}

						if (!hasProp(defined, name) && !hasProp(defining, name)) {
							throw new Error('No ' + name);
						}
						return defined[name];
					}

					//Turns a plugin!resource to [plugin, resource]
					//with the plugin being undefined if the name
					//did not have a plugin prefix.
					function splitPrefix(name) {
						var prefix,
							index = name ? name.indexOf('!') : -1;
						if (index > -1) {
							prefix = name.substring(0, index);
							name = name.substring(index + 1, name.length);
						}
						return [prefix, name];
					}

					//Creates a parts array for a relName where first part is plugin ID,
					//second part is resource ID. Assumes relName has already been normalized.
					function makeRelParts(relName) {
						return relName ? splitPrefix(relName) : [];
					}

					/**
					 * Makes a name map, normalizing the name, and using a plugin
					 * for normalization if necessary. Grabs a ref to plugin
					 * too, as an optimization.
					 */
					makeMap = function (name, relParts) {
						var plugin,
							parts = splitPrefix(name),
							prefix = parts[0],
							relResourceName = relParts[1];

						name = parts[1];

						if (prefix) {
							prefix = normalize(prefix, relResourceName);
							plugin = callDep(prefix);
						}

						//Normalize according
						if (prefix) {
							if (plugin && plugin.normalize) {
								name = plugin.normalize(name, makeNormalize(relResourceName));
							} else {
								name = normalize(name, relResourceName);
							}
						} else {
							name = normalize(name, relResourceName);
							parts = splitPrefix(name);
							prefix = parts[0];
							name = parts[1];
							if (prefix) {
								plugin = callDep(prefix);
							}
						}

						//Using ridiculous property names for space reasons
						return {
							f: prefix ? prefix + '!' + name : name, //fullName
							n: name,
							pr: prefix,
							p: plugin
						};
					};

					function makeConfig(name) {
						return function () {
							return (config && config.config && config.config[name]) || {};
						};
					}

					handlers = {
						require: function (name) {
							return makeRequire(name);
						},
						exports: function (name) {
							var e = defined[name];
							if (typeof e !== 'undefined') {
								return e;
							} else {
								return (defined[name] = {});
							}
						},
						module: function (name) {
							return {
								id: name,
								uri: '',
								exports: defined[name],
								config: makeConfig(name)
							};
						}
					};

					main = function (name, deps, callback, relName) {
						var cjsModule, depName, ret, map, i, relParts,
							args = [],
							callbackType = typeof callback,
							usingExports;

						//Use name if no relName
						relName = relName || name;
						relParts = makeRelParts(relName);

						//Call the callback to define the module, if necessary.
						if (callbackType === 'undefined' || callbackType === 'function') {
							//Pull out the defined dependencies and pass the ordered
							//values to the callback.
							//Default to [require, exports, module] if no deps
							deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
							for (i = 0; i < deps.length; i += 1) {
								map = makeMap(deps[i], relParts);
								depName = map.f;

								//Fast path CommonJS standard dependencies.
								if (depName === "require") {
									args[i] = handlers.require(name);
								} else if (depName === "exports") {
									//CommonJS module spec 1.1
									args[i] = handlers.exports(name);
									usingExports = true;
								} else if (depName === "module") {
									//CommonJS module spec 1.1
									cjsModule = args[i] = handlers.module(name);
								} else if (hasProp(defined, depName) ||
									hasProp(waiting, depName) ||
									hasProp(defining, depName)) {
									args[i] = callDep(depName);
								} else if (map.p) {
									map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
									args[i] = defined[depName];
								} else {
									throw new Error(name + ' missing ' + depName);
								}
							}

							ret = callback ? callback.apply(defined[name], args) : undefined;

							if (name) {
								//If setting exports via "module" is in play,
								//favor that over return value and exports. After that,
								//favor a non-undefined return value over exports use.
								if (cjsModule && cjsModule.exports !== undef &&
									cjsModule.exports !== defined[name]) {
									defined[name] = cjsModule.exports;
								} else if (ret !== undef || !usingExports) {
									//Use the return value from the function.
									defined[name] = ret;
								}
							}
						} else if (name) {
							//May just be an object definition for the module. Only
							//worry about defining if have a module name.
							defined[name] = callback;
						}
					};

					requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
						if (typeof deps === "string") {
							if (handlers[deps]) {
								//callback in this case is really relName
								return handlers[deps](callback);
							}
							//Just return the module wanted. In this scenario, the
							//deps arg is the module name, and second arg (if passed)
							//is just the relName.
							//Normalize module name, if it contains . or ..
							return callDep(makeMap(deps, makeRelParts(callback)).f);
						} else if (!deps.splice) {
							//deps is a config object, not an array.
							config = deps;
							if (config.deps) {
								req(config.deps, config.callback);
							}
							if (!callback) {
								return;
							}

							if (callback.splice) {
								//callback is an array, which means it is a dependency list.
								//Adjust args if there are dependencies
								deps = callback;
								callback = relName;
								relName = null;
							} else {
								deps = undef;
							}
						}

						//Support require(['a'])
						callback = callback || function () {};

						//If relName is a function, it is an errback handler,
						//so remove it.
						if (typeof relName === 'function') {
							relName = forceSync;
							forceSync = alt;
						}

						//Simulate async callback;
						if (forceSync) {
							main(undef, deps, callback, relName);
						} else {
							//Using a non-zero value because of concern for what old browsers
							//do, and latest browsers "upgrade" to 4 if lower value is used:
							//http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
							//If want a value immediately, use require('id') instead -- something
							//that works in almond on the global level, but not guaranteed and
							//unlikely to work in other AMD implementations.
							setTimeout(function () {
								main(undef, deps, callback, relName);
							}, 4);
						}

						return req;
					};

					/**
					 * Just drops the config on the floor, but returns req in case
					 * the config return value is used.
					 */
					req.config = function (cfg) {
						return req(cfg);
					};

					/**
					 * Expose module registry for debugging and tooling
					 */
					requirejs._defined = defined;

					define = function (name, deps, callback) {
						if (typeof name !== 'string') {
							throw new Error('See almond README: incorrect module build, no module name');
						}

						//This module may not have dependencies
						if (!deps.splice) {
							//deps is not an array, so probably means
							//an object literal or factory function for
							//the value. Adjust args.
							callback = deps;
							deps = [];
						}

						if (!hasProp(defined, name) && !hasProp(waiting, name)) {
							waiting[name] = [name, deps, callback];
						}
					};

					define.amd = {
						jQuery: true
					};
				}());

				S2.requirejs = requirejs;
				S2.require = require;
				S2.define = define;
			}
		}());
		S2.define("almond", function () {});

		/* global jQuery:false, $:false */
		S2.define('jquery', [], function () {
			var _$ = jQuery || $;

			if (_$ == null && console && console.error) {
				console.error(
					'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
					'found. Make sure that you are including jQuery before Select2 on your ' +
					'web page.'
				);
			}

			return _$;
		});

		S2.define('select2/utils', [
			'jquery'
		], function ($) {
			var Utils = {};

			Utils.Extend = function (ChildClass, SuperClass) {
				var __hasProp = {}.hasOwnProperty;

				function BaseConstructor() {
					this.constructor = ChildClass;
				}

				for (var key in SuperClass) {
					if (__hasProp.call(SuperClass, key)) {
						ChildClass[key] = SuperClass[key];
					}
				}

				BaseConstructor.prototype = SuperClass.prototype;
				ChildClass.prototype = new BaseConstructor();
				ChildClass.__super__ = SuperClass.prototype;

				return ChildClass;
			};

			function getMethods(theClass) {
				var proto = theClass.prototype;

				var methods = [];

				for (var methodName in proto) {
					var m = proto[methodName];

					if (typeof m !== 'function') {
						continue;
					}

					if (methodName === 'constructor') {
						continue;
					}

					methods.push(methodName);
				}

				return methods;
			}

			Utils.Decorate = function (SuperClass, DecoratorClass) {
				var decoratedMethods = getMethods(DecoratorClass);
				var superMethods = getMethods(SuperClass);

				function DecoratedClass() {
					var unshift = Array.prototype.unshift;

					var argCount = DecoratorClass.prototype.constructor.length;

					var calledConstructor = SuperClass.prototype.constructor;

					if (argCount > 0) {
						unshift.call(arguments, SuperClass.prototype.constructor);

						calledConstructor = DecoratorClass.prototype.constructor;
					}

					calledConstructor.apply(this, arguments);
				}

				DecoratorClass.displayName = SuperClass.displayName;

				function ctr() {
					this.constructor = DecoratedClass;
				}

				DecoratedClass.prototype = new ctr();

				for (var m = 0; m < superMethods.length; m++) {
					var superMethod = superMethods[m];

					DecoratedClass.prototype[superMethod] =
						SuperClass.prototype[superMethod];
				}

				var calledMethod = function (methodName) {
					// Stub out the original method if it's not decorating an actual method
					var originalMethod = function () {};

					if (methodName in DecoratedClass.prototype) {
						originalMethod = DecoratedClass.prototype[methodName];
					}

					var decoratedMethod = DecoratorClass.prototype[methodName];

					return function () {
						var unshift = Array.prototype.unshift;

						unshift.call(arguments, originalMethod);

						return decoratedMethod.apply(this, arguments);
					};
				};

				for (var d = 0; d < decoratedMethods.length; d++) {
					var decoratedMethod = decoratedMethods[d];

					DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
				}

				return DecoratedClass;
			};

			var Observable = function () {
				this.listeners = {};
			};

			Observable.prototype.on = function (event, callback) {
				this.listeners = this.listeners || {};

				if (event in this.listeners) {
					this.listeners[event].push(callback);
				} else {
					this.listeners[event] = [callback];
				}
			};

			Observable.prototype.trigger = function (event) {
				var slice = Array.prototype.slice;
				var params = slice.call(arguments, 1);

				this.listeners = this.listeners || {};

				// Params should always come in as an array
				if (params == null) {
					params = [];
				}

				// If there are no arguments to the event, use a temporary object
				if (params.length === 0) {
					params.push({});
				}

				// Set the `_type` of the first object to the event
				params[0]._type = event;

				if (event in this.listeners) {
					this.invoke(this.listeners[event], slice.call(arguments, 1));
				}

				if ('*' in this.listeners) {
					this.invoke(this.listeners['*'], arguments);
				}
			};

			Observable.prototype.invoke = function (listeners, params) {
				for (var i = 0, len = listeners.length; i < len; i++) {
					listeners[i].apply(this, params);
				}
			};

			Utils.Observable = Observable;

			Utils.generateChars = function (length) {
				var chars = '';

				for (var i = 0; i < length; i++) {
					var randomChar = Math.floor(Math.random() * 36);
					chars += randomChar.toString(36);
				}

				return chars;
			};

			Utils.bind = function (func, context) {
				return function () {
					func.apply(context, arguments);
				};
			};

			Utils._convertData = function (data) {
				for (var originalKey in data) {
					var keys = originalKey.split('-');

					var dataLevel = data;

					if (keys.length === 1) {
						continue;
					}

					for (var k = 0; k < keys.length; k++) {
						var key = keys[k];

						// Lowercase the first letter
						// By default, dash-separated becomes camelCase
						key = key.substring(0, 1).toLowerCase() + key.substring(1);

						if (!(key in dataLevel)) {
							dataLevel[key] = {};
						}

						if (k == keys.length - 1) {
							dataLevel[key] = data[originalKey];
						}

						dataLevel = dataLevel[key];
					}

					delete data[originalKey];
				}

				return data;
			};

			Utils.hasScroll = function (index, el) {
				// Adapted from the function created by @ShadowScripter
				// and adapted by @BillBarry on the Stack Exchange Code Review website.
				// The original code can be found at
				// http://codereview.stackexchange.com/q/13338
				// and was designed to be used with the Sizzle selector engine.

				var $el = $(el);
				var overflowX = el.style.overflowX;
				var overflowY = el.style.overflowY;

				//Check both x and y declarations
				if (overflowX === overflowY &&
					(overflowY === 'hidden' || overflowY === 'visible')) {
					return false;
				}

				if (overflowX === 'scroll' || overflowY === 'scroll') {
					return true;
				}

				return ($el.innerHeight() < el.scrollHeight ||
					$el.innerWidth() < el.scrollWidth);
			};

			Utils.escapeMarkup = function (markup) {
				var replaceMap = {
					'\\': '&#92;',
					'&': '&amp;',
					'<': '&lt;',
					'>': '&gt;',
					'"': '&quot;',
					'\'': '&#39;',
					'/': '&#47;'
				};

				// Do not try to escape the markup if it's not a string
				if (typeof markup !== 'string') {
					return markup;
				}

				return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
					return replaceMap[match];
				});
			};

			// Append an array of jQuery nodes to a given element.
			Utils.appendMany = function ($element, $nodes) {
				// jQuery 1.7.x does not support $.fn.append() with an array
				// Fall back to a jQuery object collection using $.fn.add()
				if ($.fn.jquery.substr(0, 3) === '1.7') {
					var $jqNodes = $();

					$.map($nodes, function (node) {
						$jqNodes = $jqNodes.add(node);
					});

					$nodes = $jqNodes;
				}

				$element.append($nodes);
			};

			// Cache objects in Utils.__cache instead of $.data (see #4346)
			Utils.__cache = {};

			var id = 0;
			Utils.GetUniqueElementId = function (element) {
				// Get a unique element Id. If element has no id, 
				// creates a new unique number, stores it in the id 
				// attribute and returns the new id. 
				// If an id already exists, it simply returns it.

				var select2Id = element.getAttribute('data-select2-id');
				if (select2Id == null) {
					// If element has id, use it.
					if (element.id) {
						select2Id = element.id;
						element.setAttribute('data-select2-id', select2Id);
					} else {
						element.setAttribute('data-select2-id', ++id);
						select2Id = id.toString();
					}
				}
				return select2Id;
			};

			Utils.StoreData = function (element, name, value) {
				// Stores an item in the cache for a specified element.
				// name is the cache key.    
				var id = Utils.GetUniqueElementId(element);
				if (!Utils.__cache[id]) {
					Utils.__cache[id] = {};
				}

				Utils.__cache[id][name] = value;
			};

			Utils.GetData = function (element, name) {
				// Retrieves a value from the cache by its key (name)
				// name is optional. If no name specified, return 
				// all cache items for the specified element.
				// and for a specified element.
				var id = Utils.GetUniqueElementId(element);
				if (name) {
					if (Utils.__cache[id]) {
						return Utils.__cache[id][name] != null ?
							Utils.__cache[id][name] :
							$(element).data(name); // Fallback to HTML5 data attribs.
					}
					return $(element).data(name); // Fallback to HTML5 data attribs.
				} else {
					return Utils.__cache[id];
				}
			};

			Utils.RemoveData = function (element) {
				// Removes all cached items for a specified element.
				var id = Utils.GetUniqueElementId(element);
				if (Utils.__cache[id] != null) {
					delete Utils.__cache[id];
				}
			};

			return Utils;
		});

		S2.define('select2/results', [
			'jquery',
			'./utils'
		], function ($, Utils) {
			function Results($element, options, dataAdapter) {
				this.$element = $element;
				this.data = dataAdapter;
				this.options = options;

				Results.__super__.constructor.call(this);
			}

			Utils.Extend(Results, Utils.Observable);

			Results.prototype.render = function () {
				var $results = $(
					'<ul class="select2-results__options" role="tree"></ul>'
				);

				if (this.options.get('multiple')) {
					$results.attr('aria-multiselectable', 'true');
				}

				this.$results = $results;

				return $results;
			};

			Results.prototype.clear = function () {
				this.$results.empty();
			};

			Results.prototype.displayMessage = function (params) {
				var escapeMarkup = this.options.get('escapeMarkup');

				this.clear();
				this.hideLoading();

				var $message = $(
					'<li role="treeitem" aria-live="assertive"' +
					' class="select2-results__option"></li>'
				);

				var message = this.options.get('translations').get(params.message);

				$message.append(
					escapeMarkup(
						message(params.args)
					)
				);

				$message[0].className += ' select2-results__message';

				this.$results.append($message);
			};

			Results.prototype.hideMessages = function () {
				this.$results.find('.select2-results__message').remove();
			};

			Results.prototype.append = function (data) {
				this.hideLoading();

				var $options = [];

				if (data.results == null || data.results.length === 0) {
					if (this.$results.children().length === 0) {
						this.trigger('results:message', {
							message: 'noResults'
						});
					}

					return;
				}

				data.results = this.sort(data.results);

				for (var d = 0; d < data.results.length; d++) {
					var item = data.results[d];

					var $option = this.option(item);

					$options.push($option);
				}

				this.$results.append($options);
			};

			Results.prototype.position = function ($results, $dropdown) {
				var $resultsContainer = $dropdown.find('.select2-results');
				$resultsContainer.append($results);
			};

			Results.prototype.sort = function (data) {
				var sorter = this.options.get('sorter');

				return sorter(data);
			};

			Results.prototype.highlightFirstItem = function () {
				var $options = this.$results
					.find('.select2-results__option[aria-selected]');

				var $selected = $options.filter('[aria-selected=true]');

				// Check if there are any selected options
				if ($selected.length > 0) {
					// If there are selected options, highlight the first
					$selected.first().trigger('mouseenter');
				} else {
					// If there are no selected options, highlight the first option
					// in the dropdown
					$options.first().trigger('mouseenter');
				}

				this.ensureHighlightVisible();
			};

			Results.prototype.setClasses = function () {
				var self = this;

				this.data.current(function (selected) {
					var selectedIds = $.map(selected, function (s) {
						return s.id.toString();
					});

					var $options = self.$results
						.find('.select2-results__option[aria-selected]');

					$options.each(function () {
						var $option = $(this);

						var item = Utils.GetData(this, 'data');

						// id needs to be converted to a string when comparing
						var id = '' + item.id;

						if ((item.element != null && item.element.selected) ||
							(item.element == null && $.inArray(id, selectedIds) > -1)) {
							$option.attr('aria-selected', 'true');
						} else {
							$option.attr('aria-selected', 'false');
						}
					});

				});
			};

			Results.prototype.showLoading = function (params) {
				this.hideLoading();

				var loadingMore = this.options.get('translations').get('searching');

				var loading = {
					disabled: true,
					loading: true,
					text: loadingMore(params)
				};
				var $loading = this.option(loading);
				$loading.className += ' loading-results';

				this.$results.prepend($loading);
			};

			Results.prototype.hideLoading = function () {
				this.$results.find('.loading-results').remove();
			};

			Results.prototype.option = function (data) {
				var option = document.createElement('li');
				option.className = 'select2-results__option';

				var attrs = {
					'role': 'treeitem',
					'aria-selected': 'false'
				};

				if (data.disabled) {
					delete attrs['aria-selected'];
					attrs['aria-disabled'] = 'true';
				}

				if (data.id == null) {
					delete attrs['aria-selected'];
				}

				if (data._resultId != null) {
					option.id = data._resultId;
				}

				if (data.title) {
					option.title = data.title;
				}

				if (data.children) {
					attrs.role = 'group';
					attrs['aria-label'] = data.text;
					delete attrs['aria-selected'];
				}

				for (var attr in attrs) {
					var val = attrs[attr];

					option.setAttribute(attr, val);
				}

				if (data.children) {
					var $option = $(option);

					var label = document.createElement('strong');
					label.className = 'select2-results__group';

					var $label = $(label);
					this.template(data, label);

					var $children = [];

					for (var c = 0; c < data.children.length; c++) {
						var child = data.children[c];

						var $child = this.option(child);

						$children.push($child);
					}

					var $childrenContainer = $('<ul></ul>', {
						'class': 'select2-results__options select2-results__options--nested'
					});

					$childrenContainer.append($children);

					$option.append(label);
					$option.append($childrenContainer);
				} else {
					this.template(data, option);
				}

				Utils.StoreData(option, 'data', data);

				return option;
			};

			Results.prototype.bind = function (container, $container) {
				var self = this;

				var id = container.id + '-results';

				this.$results.attr('id', id);

				container.on('results:all', function (params) {
					self.clear();
					self.append(params.data);

					if (container.isOpen()) {
						self.setClasses();
						self.highlightFirstItem();
					}
				});

				container.on('results:append', function (params) {
					self.append(params.data);

					if (container.isOpen()) {
						self.setClasses();
					}
				});

				container.on('query', function (params) {
					self.hideMessages();
					self.showLoading(params);
				});

				container.on('select', function () {
					if (!container.isOpen()) {
						return;
					}

					self.setClasses();
					self.highlightFirstItem();
				});

				container.on('unselect', function () {
					if (!container.isOpen()) {
						return;
					}

					self.setClasses();
					self.highlightFirstItem();
				});

				container.on('open', function () {
					// When the dropdown is open, aria-expended="true"
					self.$results.attr('aria-expanded', 'true');
					self.$results.attr('aria-hidden', 'false');

					self.setClasses();
					self.ensureHighlightVisible();
				});

				container.on('close', function () {
					// When the dropdown is closed, aria-expended="false"
					self.$results.attr('aria-expanded', 'false');
					self.$results.attr('aria-hidden', 'true');
					self.$results.removeAttr('aria-activedescendant');
				});

				container.on('results:toggle', function () {
					var $highlighted = self.getHighlightedResults();

					if ($highlighted.length === 0) {
						return;
					}

					$highlighted.trigger('mouseup');
				});

				container.on('results:select', function () {
					var $highlighted = self.getHighlightedResults();

					if ($highlighted.length === 0) {
						return;
					}

					var data = Utils.GetData($highlighted[0], 'data');

					if ($highlighted.attr('aria-selected') == 'true') {
						self.trigger('close', {});
					} else {
						self.trigger('select', {
							data: data
						});
					}
				});

				container.on('results:previous', function () {
					var $highlighted = self.getHighlightedResults();

					var $options = self.$results.find('[aria-selected]');

					var currentIndex = $options.index($highlighted);

					// If we are already at te top, don't move further
					// If no options, currentIndex will be -1
					if (currentIndex <= 0) {
						return;
					}

					var nextIndex = currentIndex - 1;

					// If none are highlighted, highlight the first
					if ($highlighted.length === 0) {
						nextIndex = 0;
					}

					var $next = $options.eq(nextIndex);

					$next.trigger('mouseenter');

					var currentOffset = self.$results.offset().top;
					var nextTop = $next.offset().top;
					var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

					if (nextIndex === 0) {
						self.$results.scrollTop(0);
					} else if (nextTop - currentOffset < 0) {
						self.$results.scrollTop(nextOffset);
					}
				});

				container.on('results:next', function () {
					var $highlighted = self.getHighlightedResults();

					var $options = self.$results.find('[aria-selected]');

					var currentIndex = $options.index($highlighted);

					var nextIndex = currentIndex + 1;

					// If we are at the last option, stay there
					if (nextIndex >= $options.length) {
						return;
					}

					var $next = $options.eq(nextIndex);

					$next.trigger('mouseenter');

					var currentOffset = self.$results.offset().top +
						self.$results.outerHeight(false);
					var nextBottom = $next.offset().top + $next.outerHeight(false);
					var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

					if (nextIndex === 0) {
						self.$results.scrollTop(0);
					} else if (nextBottom > currentOffset) {
						self.$results.scrollTop(nextOffset);
					}
				});

				container.on('results:focus', function (params) {
					params.element.addClass('select2-results__option--highlighted');
				});

				container.on('results:message', function (params) {
					self.displayMessage(params);
				});

				if ($.fn.mousewheel) {
					this.$results.on('mousewheel', function (e) {
						var top = self.$results.scrollTop();

						var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

						var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
						var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

						if (isAtTop) {
							self.$results.scrollTop(0);

							e.preventDefault();
							e.stopPropagation();
						} else if (isAtBottom) {
							self.$results.scrollTop(
								self.$results.get(0).scrollHeight - self.$results.height()
							);

							e.preventDefault();
							e.stopPropagation();
						}
					});
				}

				this.$results.on('mouseup', '.select2-results__option[aria-selected]',
					function (evt) {
						var $this = $(this);

						var data = Utils.GetData(this, 'data');

						if ($this.attr('aria-selected') === 'true') {
							if (self.options.get('multiple')) {
								self.trigger('unselect', {
									originalEvent: evt,
									data: data
								});
							} else {
								self.trigger('close', {});
							}

							return;
						}

						self.trigger('select', {
							originalEvent: evt,
							data: data
						});
					});

				this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
					function (evt) {
						var data = Utils.GetData(this, 'data');

						self.getHighlightedResults()
							.removeClass('select2-results__option--highlighted');

						self.trigger('results:focus', {
							data: data,
							element: $(this)
						});
					});
			};

			Results.prototype.getHighlightedResults = function () {
				var $highlighted = this.$results
					.find('.select2-results__option--highlighted');

				return $highlighted;
			};

			Results.prototype.destroy = function () {
				this.$results.remove();
			};

			Results.prototype.ensureHighlightVisible = function () {
				var $highlighted = this.getHighlightedResults();

				if ($highlighted.length === 0) {
					return;
				}

				var $options = this.$results.find('[aria-selected]');

				var currentIndex = $options.index($highlighted);

				var currentOffset = this.$results.offset().top;
				var nextTop = $highlighted.offset().top;
				var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

				var offsetDelta = nextTop - currentOffset;
				nextOffset -= $highlighted.outerHeight(false) * 2;

				if (currentIndex <= 2) {
					this.$results.scrollTop(0);
				} else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
					this.$results.scrollTop(nextOffset);
				}
			};

			Results.prototype.template = function (result, container) {
				var template = this.options.get('templateResult');
				var escapeMarkup = this.options.get('escapeMarkup');

				var content = template(result, container);

				if (content == null) {
					container.style.display = 'none';
				} else if (typeof content === 'string') {
					container.innerHTML = escapeMarkup(content);
				} else {
					$(container).append(content);
				}
			};

			return Results;
		});

		S2.define('select2/keys', [

		], function () {
			var KEYS = {
				BACKSPACE: 8,
				TAB: 9,
				ENTER: 13,
				SHIFT: 16,
				CTRL: 17,
				ALT: 18,
				ESC: 27,
				SPACE: 32,
				PAGE_UP: 33,
				PAGE_DOWN: 34,
				END: 35,
				HOME: 36,
				LEFT: 37,
				UP: 38,
				RIGHT: 39,
				DOWN: 40,
				DELETE: 46
			};

			return KEYS;
		});

		S2.define('select2/selection/base', [
			'jquery',
			'../utils',
			'../keys'
		], function ($, Utils, KEYS) {
			function BaseSelection($element, options) {
				this.$element = $element;
				this.options = options;

				BaseSelection.__super__.constructor.call(this);
			}

			Utils.Extend(BaseSelection, Utils.Observable);

			BaseSelection.prototype.render = function () {
				var $selection = $(
					'<span class="select2-selection" role="combobox" ' +
					' aria-haspopup="true" aria-expanded="false">' +
					'</span>'
				);

				this._tabindex = 0;

				if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
					this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
				} else if (this.$element.attr('tabindex') != null) {
					this._tabindex = this.$element.attr('tabindex');
				}

				$selection.attr('title', this.$element.attr('title'));
				$selection.attr('tabindex', this._tabindex);

				this.$selection = $selection;

				return $selection;
			};

			BaseSelection.prototype.bind = function (container, $container) {
				var self = this;

				var id = container.id + '-container';
				var resultsId = container.id + '-results';

				this.container = container;

				this.$selection.on('focus', function (evt) {
					self.trigger('focus', evt);
				});

				this.$selection.on('blur', function (evt) {
					self._handleBlur(evt);
				});

				this.$selection.on('keydown', function (evt) {
					self.trigger('keypress', evt);

					if (evt.which === KEYS.SPACE) {
						evt.preventDefault();
					}
				});

				container.on('results:focus', function (params) {
					self.$selection.attr('aria-activedescendant', params.data._resultId);
				});

				container.on('selection:update', function (params) {
					self.update(params.data);
				});

				container.on('open', function () {
					// When the dropdown is open, aria-expanded="true"
					self.$selection.attr('aria-expanded', 'true');
					self.$selection.attr('aria-owns', resultsId);

					self._attachCloseHandler(container);
				});

				container.on('close', function () {
					// When the dropdown is closed, aria-expanded="false"
					self.$selection.attr('aria-expanded', 'false');
					self.$selection.removeAttr('aria-activedescendant');
					self.$selection.removeAttr('aria-owns');

					self.$selection.focus();
					window.setTimeout(function () {
						self.$selection.focus();
					}, 0);

					self._detachCloseHandler(container);
				});

				container.on('enable', function () {
					self.$selection.attr('tabindex', self._tabindex);
				});

				container.on('disable', function () {
					self.$selection.attr('tabindex', '-1');
				});
			};

			BaseSelection.prototype._handleBlur = function (evt) {
				var self = this;

				// This needs to be delayed as the active element is the body when the tab
				// key is pressed, possibly along with others.
				window.setTimeout(function () {
					// Don't trigger `blur` if the focus is still in the selection
					if (
						(document.activeElement == self.$selection[0]) ||
						($.contains(self.$selection[0], document.activeElement))
					) {
						return;
					}

					self.trigger('blur', evt);
				}, 1);
			};

			BaseSelection.prototype._attachCloseHandler = function (container) {
				var self = this;

				$(document.body).on('mousedown.select2.' + container.id, function (e) {
					var $target = $(e.target);

					var $select = $target.closest('.select2');

					var $all = $('.select2.select2-container--open');

					$all.each(function () {
						var $this = $(this);

						if (this == $select[0]) {
							return;
						}

						var $element = Utils.GetData(this, 'element');

						$element.select2('close');
					});
				});
			};

			BaseSelection.prototype._detachCloseHandler = function (container) {
				$(document.body).off('mousedown.select2.' + container.id);
			};

			BaseSelection.prototype.position = function ($selection, $container) {
				var $selectionContainer = $container.find('.selection');
				$selectionContainer.append($selection);
			};

			BaseSelection.prototype.destroy = function () {
				this._detachCloseHandler(this.container);
			};

			BaseSelection.prototype.update = function (data) {
				throw new Error('The `update` method must be defined in child classes.');
			};

			return BaseSelection;
		});

		S2.define('select2/selection/single', [
			'jquery',
			'./base',
			'../utils',
			'../keys'
		], function ($, BaseSelection, Utils, KEYS) {
			function SingleSelection() {
				SingleSelection.__super__.constructor.apply(this, arguments);
			}

			Utils.Extend(SingleSelection, BaseSelection);

			SingleSelection.prototype.render = function () {
				var $selection = SingleSelection.__super__.render.call(this);

				$selection.addClass('select2-selection--single');

				$selection.html(
					'<span class="select2-selection__rendered"></span>' +
					'<span class="select2-selection__arrow" role="presentation">' +
					'<b role="presentation"></b>' +
					'</span>'
				);

				return $selection;
			};

			SingleSelection.prototype.bind = function (container, $container) {
				var self = this;

				SingleSelection.__super__.bind.apply(this, arguments);

				var id = container.id + '-container';

				this.$selection.find('.select2-selection__rendered')
					.attr('id', id)
					.attr('role', 'textbox')
					.attr('aria-readonly', 'true');
				this.$selection.attr('aria-labelledby', id);

				this.$selection.on('mousedown', function (evt) {
					// Only respond to left clicks
					if (evt.which !== 1) {
						return;
					}

					self.trigger('toggle', {
						originalEvent: evt
					});
				});

				this.$selection.on('focus', function (evt) {
					// User focuses on the container
				});

				this.$selection.on('blur', function (evt) {
					// User exits the container
				});

				container.on('focus', function (evt) {
					if (!container.isOpen()) {
						self.$selection.focus();
					}
				});
			};

			SingleSelection.prototype.clear = function () {
				var $rendered = this.$selection.find('.select2-selection__rendered');
				$rendered.empty();
				$rendered.removeAttr('title'); // clear tooltip on empty
			};

			SingleSelection.prototype.display = function (data, container) {
				var template = this.options.get('templateSelection');
				var escapeMarkup = this.options.get('escapeMarkup');

				return escapeMarkup(template(data, container));
			};

			SingleSelection.prototype.selectionContainer = function () {
				return $('<span></span>');
			};

			SingleSelection.prototype.update = function (data) {
				if (data.length === 0) {
					this.clear();
					return;
				}

				var selection = data[0];

				var $rendered = this.$selection.find('.select2-selection__rendered');
				var formatted = this.display(selection, $rendered);

				$rendered.empty().append(formatted);
				$rendered.attr('title', selection.title || selection.text);
			};

			return SingleSelection;
		});

		S2.define('select2/selection/multiple', [
			'jquery',
			'./base',
			'../utils'
		], function ($, BaseSelection, Utils) {
			function MultipleSelection($element, options) {
				MultipleSelection.__super__.constructor.apply(this, arguments);
			}

			Utils.Extend(MultipleSelection, BaseSelection);

			MultipleSelection.prototype.render = function () {
				var $selection = MultipleSelection.__super__.render.call(this);

				$selection.addClass('select2-selection--multiple');

				$selection.html(
					'<ul class="select2-selection__rendered"></ul>'
				);

				return $selection;
			};

			MultipleSelection.prototype.bind = function (container, $container) {
				var self = this;

				MultipleSelection.__super__.bind.apply(this, arguments);

				this.$selection.on('click', function (evt) {
					self.trigger('toggle', {
						originalEvent: evt
					});
				});

				this.$selection.on(
					'click',
					'.select2-selection__choice__remove',
					function (evt) {
						// Ignore the event if it is disabled
						if (self.options.get('disabled')) {
							return;
						}

						var $remove = $(this);
						var $selection = $remove.parent();

						var data = Utils.GetData($selection[0], 'data');

						self.trigger('unselect', {
							originalEvent: evt,
							data: data
						});
					}
				);
			};

			MultipleSelection.prototype.clear = function () {
				var $rendered = this.$selection.find('.select2-selection__rendered');
				$rendered.empty();
				$rendered.removeAttr('title');
			};

			MultipleSelection.prototype.display = function (data, container) {
				var template = this.options.get('templateSelection');
				var escapeMarkup = this.options.get('escapeMarkup');

				return escapeMarkup(template(data, container));
			};

			MultipleSelection.prototype.selectionContainer = function () {
				var $container = $(
					'<li class="select2-selection__choice">' +
					'<span class="select2-selection__choice__remove" role="presentation">' +
					'&times;' +
					'</span>' +
					'</li>'
				);

				return $container;
			};

			MultipleSelection.prototype.update = function (data) {
				this.clear();

				if (data.length === 0) {
					return;
				}

				var $selections = [];

				for (var d = 0; d < data.length; d++) {
					var selection = data[d];

					var $selection = this.selectionContainer();
					var formatted = this.display(selection, $selection);

					$selection.append(formatted);
					$selection.attr('title', selection.title || selection.text);

					Utils.StoreData($selection[0], 'data', selection);

					$selections.push($selection);
				}

				var $rendered = this.$selection.find('.select2-selection__rendered');

				Utils.appendMany($rendered, $selections);
			};

			return MultipleSelection;
		});

		S2.define('select2/selection/placeholder', [
			'../utils'
		], function (Utils) {
			function Placeholder(decorated, $element, options) {
				this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

				decorated.call(this, $element, options);
			}

			Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
				if (typeof placeholder === 'string') {
					placeholder = {
						id: '',
						text: placeholder
					};
				}

				return placeholder;
			};

			Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
				var $placeholder = this.selectionContainer();

				$placeholder.html(this.display(placeholder));
				$placeholder.addClass('select2-selection__placeholder')
					.removeClass('select2-selection__choice');

				return $placeholder;
			};

			Placeholder.prototype.update = function (decorated, data) {
				var singlePlaceholder = (
					data.length == 1 && data[0].id != this.placeholder.id
				);
				var multipleSelections = data.length > 1;

				if (multipleSelections || singlePlaceholder) {
					return decorated.call(this, data);
				}

				this.clear();

				var $placeholder = this.createPlaceholder(this.placeholder);

				this.$selection.find('.select2-selection__rendered').append($placeholder);
			};

			return Placeholder;
		});

		S2.define('select2/selection/allowClear', [
			'jquery',
			'../keys',
			'../utils'
		], function ($, KEYS, Utils) {
			function AllowClear() {}

			AllowClear.prototype.bind = function (decorated, container, $container) {
				var self = this;

				decorated.call(this, container, $container);

				if (this.placeholder == null) {
					if (this.options.get('debug') && window.console && console.error) {
						console.error(
							'Select2: The `allowClear` option should be used in combination ' +
							'with the `placeholder` option.'
						);
					}
				}

				this.$selection.on('mousedown', '.select2-selection__clear',
					function (evt) {
						self._handleClear(evt);
					});

				container.on('keypress', function (evt) {
					self._handleKeyboardClear(evt, container);
				});
			};

			AllowClear.prototype._handleClear = function (_, evt) {
				// Ignore the event if it is disabled
				if (this.options.get('disabled')) {
					return;
				}

				var $clear = this.$selection.find('.select2-selection__clear');

				// Ignore the event if nothing has been selected
				if ($clear.length === 0) {
					return;
				}

				evt.stopPropagation();

				var data = Utils.GetData($clear[0], 'data');

				var previousVal = this.$element.val();
				this.$element.val(this.placeholder.id);

				var unselectData = {
					data: data
				};
				this.trigger('clear', unselectData);
				if (unselectData.prevented) {
					this.$element.val(previousVal);
					return;
				}

				for (var d = 0; d < data.length; d++) {
					unselectData = {
						data: data[d]
					};

					// Trigger the `unselect` event, so people can prevent it from being
					// cleared.
					this.trigger('unselect', unselectData);

					// If the event was prevented, don't clear it out.
					if (unselectData.prevented) {
						this.$element.val(previousVal);
						return;
					}
				}

				this.$element.trigger('change');

				this.trigger('toggle', {});
			};

			AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
				if (container.isOpen()) {
					return;
				}

				if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
					this._handleClear(evt);
				}
			};

			AllowClear.prototype.update = function (decorated, data) {
				decorated.call(this, data);

				if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
					data.length === 0) {
					return;
				}

				var $remove = $(
					'<span class="select2-selection__clear">' +
					'&times;' +
					'</span>'
				);
				Utils.StoreData($remove[0], 'data', data);

				this.$selection.find('.select2-selection__rendered').prepend($remove);
			};

			return AllowClear;
		});

		S2.define('select2/selection/search', [
			'jquery',
			'../utils',
			'../keys'
		], function ($, Utils, KEYS) {
			function Search(decorated, $element, options) {
				decorated.call(this, $element, options);
			}

			Search.prototype.render = function (decorated) {
				var $search = $(
					'<li class="select2-search select2-search--inline">' +
					'<input class="select2-search__field" type="search" tabindex="-1"' +
					' autocomplete="off" autocorrect="off" autocapitalize="none"' +
					' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
					'</li>'
				);

				this.$searchContainer = $search;
				this.$search = $search.find('input');

				var $rendered = decorated.call(this);

				this._transferTabIndex();

				return $rendered;
			};

			Search.prototype.bind = function (decorated, container, $container) {
				var self = this;

				decorated.call(this, container, $container);

				container.on('open', function () {
					self.$search.trigger('focus');
				});

				container.on('close', function () {
					self.$search.val('');
					self.$search.removeAttr('aria-activedescendant');
					self.$search.trigger('focus');
				});

				container.on('enable', function () {
					self.$search.prop('disabled', false);

					self._transferTabIndex();
				});

				container.on('disable', function () {
					self.$search.prop('disabled', true);
				});

				container.on('focus', function (evt) {
					self.$search.trigger('focus');
				});

				container.on('results:focus', function (params) {
					self.$search.attr('aria-activedescendant', params.id);
				});

				this.$selection.on('focusin', '.select2-search--inline', function (evt) {
					self.trigger('focus', evt);
				});

				this.$selection.on('focusout', '.select2-search--inline', function (evt) {
					self._handleBlur(evt);
				});

				this.$selection.on('keydown', '.select2-search--inline', function (evt) {
					evt.stopPropagation();

					self.trigger('keypress', evt);

					self._keyUpPrevented = evt.isDefaultPrevented();

					var key = evt.which;

					if (key === KEYS.BACKSPACE && self.$search.val() === '') {
						var $previousChoice = self.$searchContainer
							.prev('.select2-selection__choice');

						if ($previousChoice.length > 0) {
							var item = Utils.GetData($previousChoice[0], 'data');

							self.searchRemoveChoice(item);

							evt.preventDefault();
						}
					}
				});

				// Try to detect the IE version should the `documentMode` property that
				// is stored on the document. This is only implemented in IE and is
				// slightly cleaner than doing a user agent check.
				// This property is not available in Edge, but Edge also doesn't have
				// this bug.
				var msie = document.documentMode;
				var disableInputEvents = msie && msie <= 11;

				// Workaround for browsers which do not support the `input` event
				// This will prevent double-triggering of events for browsers which support
				// both the `keyup` and `input` events.
				this.$selection.on(
					'input.searchcheck',
					'.select2-search--inline',
					function (evt) {
						// IE will trigger the `input` event when a placeholder is used on a
						// search box. To get around this issue, we are forced to ignore all
						// `input` events in IE and keep using `keyup`.
						if (disableInputEvents) {
							self.$selection.off('input.search input.searchcheck');
							return;
						}

						// Unbind the duplicated `keyup` event
						self.$selection.off('keyup.search');
					}
				);

				this.$selection.on(
					'keyup.search input.search',
					'.select2-search--inline',
					function (evt) {
						// IE will trigger the `input` event when a placeholder is used on a
						// search box. To get around this issue, we are forced to ignore all
						// `input` events in IE and keep using `keyup`.
						if (disableInputEvents && evt.type === 'input') {
							self.$selection.off('input.search input.searchcheck');
							return;
						}

						var key = evt.which;

						// We can freely ignore events from modifier keys
						if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
							return;
						}

						// Tabbing will be handled during the `keydown` phase
						if (key == KEYS.TAB) {
							return;
						}

						self.handleSearch(evt);
					}
				);
			};

			/**
			 * This method will transfer the tabindex attribute from the rendered
			 * selection to the search box. This allows for the search box to be used as
			 * the primary focus instead of the selection container.
			 *
			 * @private
			 */
			Search.prototype._transferTabIndex = function (decorated) {
				this.$search.attr('tabindex', this.$selection.attr('tabindex'));
				this.$selection.attr('tabindex', '-1');
			};

			Search.prototype.createPlaceholder = function (decorated, placeholder) {
				this.$search.attr('placeholder', placeholder.text);
			};

			Search.prototype.update = function (decorated, data) {
				var searchHadFocus = this.$search[0] == document.activeElement;

				this.$search.attr('placeholder', '');

				decorated.call(this, data);

				this.$selection.find('.select2-selection__rendered')
					.append(this.$searchContainer);

				this.resizeSearch();
				if (searchHadFocus) {
					var isTagInput = this.$element.find('[data-select2-tag]').length;
					if (isTagInput) {
						// fix IE11 bug where tag input lost focus
						this.$element.focus();
					} else {
						this.$search.focus();
					}
				}
			};

			Search.prototype.handleSearch = function () {
				this.resizeSearch();

				if (!this._keyUpPrevented) {
					var input = this.$search.val();

					this.trigger('query', {
						term: input
					});
				}

				this._keyUpPrevented = false;
			};

			Search.prototype.searchRemoveChoice = function (decorated, item) {
				this.trigger('unselect', {
					data: item
				});

				this.$search.val(item.text);
				this.handleSearch();
			};

			Search.prototype.resizeSearch = function () {
				this.$search.css('width', '25px');

				var width = '';

				if (this.$search.attr('placeholder') !== '') {
					width = this.$selection.find('.select2-selection__rendered').innerWidth();
				} else {
					var minimumWidth = this.$search.val().length + 1;

					width = (minimumWidth * 0.75) + 'em';
				}

				this.$search.css('width', width);
			};

			return Search;
		});

		S2.define('select2/selection/eventRelay', [
			'jquery'
		], function ($) {
			function EventRelay() {}

			EventRelay.prototype.bind = function (decorated, container, $container) {
				var self = this;
				var relayEvents = [
					'open', 'opening',
					'close', 'closing',
					'select', 'selecting',
					'unselect', 'unselecting',
					'clear', 'clearing'
				];

				var preventableEvents = [
					'opening', 'closing', 'selecting', 'unselecting', 'clearing'
				];

				decorated.call(this, container, $container);

				container.on('*', function (name, params) {
					// Ignore events that should not be relayed
					if ($.inArray(name, relayEvents) === -1) {
						return;
					}

					// The parameters should always be an object
					params = params || {};

					// Generate the jQuery event for the Select2 event
					var evt = $.Event('select2:' + name, {
						params: params
					});

					self.$element.trigger(evt);

					// Only handle preventable events if it was one
					if ($.inArray(name, preventableEvents) === -1) {
						return;
					}

					params.prevented = evt.isDefaultPrevented();
				});
			};

			return EventRelay;
		});

		S2.define('select2/translation', [
			'jquery',
			'require'
		], function ($, require) {
			function Translation(dict) {
				this.dict = dict || {};
			}

			Translation.prototype.all = function () {
				return this.dict;
			};

			Translation.prototype.get = function (key) {
				return this.dict[key];
			};

			Translation.prototype.extend = function (translation) {
				this.dict = $.extend({}, translation.all(), this.dict);
			};

			// Static functions

			Translation._cache = {};

			Translation.loadPath = function (path) {
				if (!(path in Translation._cache)) {
					var translations = require(path);

					Translation._cache[path] = translations;
				}

				return new Translation(Translation._cache[path]);
			};

			return Translation;
		});

		S2.define('select2/diacritics', [

		], function () {
			var diacritics = {
				'\u24B6': 'A',
				'\uFF21': 'A',
				'\u00C0': 'A',
				'\u00C1': 'A',
				'\u00C2': 'A',
				'\u1EA6': 'A',
				'\u1EA4': 'A',
				'\u1EAA': 'A',
				'\u1EA8': 'A',
				'\u00C3': 'A',
				'\u0100': 'A',
				'\u0102': 'A',
				'\u1EB0': 'A',
				'\u1EAE': 'A',
				'\u1EB4': 'A',
				'\u1EB2': 'A',
				'\u0226': 'A',
				'\u01E0': 'A',
				'\u00C4': 'A',
				'\u01DE': 'A',
				'\u1EA2': 'A',
				'\u00C5': 'A',
				'\u01FA': 'A',
				'\u01CD': 'A',
				'\u0200': 'A',
				'\u0202': 'A',
				'\u1EA0': 'A',
				'\u1EAC': 'A',
				'\u1EB6': 'A',
				'\u1E00': 'A',
				'\u0104': 'A',
				'\u023A': 'A',
				'\u2C6F': 'A',
				'\uA732': 'AA',
				'\u00C6': 'AE',
				'\u01FC': 'AE',
				'\u01E2': 'AE',
				'\uA734': 'AO',
				'\uA736': 'AU',
				'\uA738': 'AV',
				'\uA73A': 'AV',
				'\uA73C': 'AY',
				'\u24B7': 'B',
				'\uFF22': 'B',
				'\u1E02': 'B',
				'\u1E04': 'B',
				'\u1E06': 'B',
				'\u0243': 'B',
				'\u0182': 'B',
				'\u0181': 'B',
				'\u24B8': 'C',
				'\uFF23': 'C',
				'\u0106': 'C',
				'\u0108': 'C',
				'\u010A': 'C',
				'\u010C': 'C',
				'\u00C7': 'C',
				'\u1E08': 'C',
				'\u0187': 'C',
				'\u023B': 'C',
				'\uA73E': 'C',
				'\u24B9': 'D',
				'\uFF24': 'D',
				'\u1E0A': 'D',
				'\u010E': 'D',
				'\u1E0C': 'D',
				'\u1E10': 'D',
				'\u1E12': 'D',
				'\u1E0E': 'D',
				'\u0110': 'D',
				'\u018B': 'D',
				'\u018A': 'D',
				'\u0189': 'D',
				'\uA779': 'D',
				'\u01F1': 'DZ',
				'\u01C4': 'DZ',
				'\u01F2': 'Dz',
				'\u01C5': 'Dz',
				'\u24BA': 'E',
				'\uFF25': 'E',
				'\u00C8': 'E',
				'\u00C9': 'E',
				'\u00CA': 'E',
				'\u1EC0': 'E',
				'\u1EBE': 'E',
				'\u1EC4': 'E',
				'\u1EC2': 'E',
				'\u1EBC': 'E',
				'\u0112': 'E',
				'\u1E14': 'E',
				'\u1E16': 'E',
				'\u0114': 'E',
				'\u0116': 'E',
				'\u00CB': 'E',
				'\u1EBA': 'E',
				'\u011A': 'E',
				'\u0204': 'E',
				'\u0206': 'E',
				'\u1EB8': 'E',
				'\u1EC6': 'E',
				'\u0228': 'E',
				'\u1E1C': 'E',
				'\u0118': 'E',
				'\u1E18': 'E',
				'\u1E1A': 'E',
				'\u0190': 'E',
				'\u018E': 'E',
				'\u24BB': 'F',
				'\uFF26': 'F',
				'\u1E1E': 'F',
				'\u0191': 'F',
				'\uA77B': 'F',
				'\u24BC': 'G',
				'\uFF27': 'G',
				'\u01F4': 'G',
				'\u011C': 'G',
				'\u1E20': 'G',
				'\u011E': 'G',
				'\u0120': 'G',
				'\u01E6': 'G',
				'\u0122': 'G',
				'\u01E4': 'G',
				'\u0193': 'G',
				'\uA7A0': 'G',
				'\uA77D': 'G',
				'\uA77E': 'G',
				'\u24BD': 'H',
				'\uFF28': 'H',
				'\u0124': 'H',
				'\u1E22': 'H',
				'\u1E26': 'H',
				'\u021E': 'H',
				'\u1E24': 'H',
				'\u1E28': 'H',
				'\u1E2A': 'H',
				'\u0126': 'H',
				'\u2C67': 'H',
				'\u2C75': 'H',
				'\uA78D': 'H',
				'\u24BE': 'I',
				'\uFF29': 'I',
				'\u00CC': 'I',
				'\u00CD': 'I',
				'\u00CE': 'I',
				'\u0128': 'I',
				'\u012A': 'I',
				'\u012C': 'I',
				'\u0130': 'I',
				'\u00CF': 'I',
				'\u1E2E': 'I',
				'\u1EC8': 'I',
				'\u01CF': 'I',
				'\u0208': 'I',
				'\u020A': 'I',
				'\u1ECA': 'I',
				'\u012E': 'I',
				'\u1E2C': 'I',
				'\u0197': 'I',
				'\u24BF': 'J',
				'\uFF2A': 'J',
				'\u0134': 'J',
				'\u0248': 'J',
				'\u24C0': 'K',
				'\uFF2B': 'K',
				'\u1E30': 'K',
				'\u01E8': 'K',
				'\u1E32': 'K',
				'\u0136': 'K',
				'\u1E34': 'K',
				'\u0198': 'K',
				'\u2C69': 'K',
				'\uA740': 'K',
				'\uA742': 'K',
				'\uA744': 'K',
				'\uA7A2': 'K',
				'\u24C1': 'L',
				'\uFF2C': 'L',
				'\u013F': 'L',
				'\u0139': 'L',
				'\u013D': 'L',
				'\u1E36': 'L',
				'\u1E38': 'L',
				'\u013B': 'L',
				'\u1E3C': 'L',
				'\u1E3A': 'L',
				'\u0141': 'L',
				'\u023D': 'L',
				'\u2C62': 'L',
				'\u2C60': 'L',
				'\uA748': 'L',
				'\uA746': 'L',
				'\uA780': 'L',
				'\u01C7': 'LJ',
				'\u01C8': 'Lj',
				'\u24C2': 'M',
				'\uFF2D': 'M',
				'\u1E3E': 'M',
				'\u1E40': 'M',
				'\u1E42': 'M',
				'\u2C6E': 'M',
				'\u019C': 'M',
				'\u24C3': 'N',
				'\uFF2E': 'N',
				'\u01F8': 'N',
				'\u0143': 'N',
				'\u00D1': 'N',
				'\u1E44': 'N',
				'\u0147': 'N',
				'\u1E46': 'N',
				'\u0145': 'N',
				'\u1E4A': 'N',
				'\u1E48': 'N',
				'\u0220': 'N',
				'\u019D': 'N',
				'\uA790': 'N',
				'\uA7A4': 'N',
				'\u01CA': 'NJ',
				'\u01CB': 'Nj',
				'\u24C4': 'O',
				'\uFF2F': 'O',
				'\u00D2': 'O',
				'\u00D3': 'O',
				'\u00D4': 'O',
				'\u1ED2': 'O',
				'\u1ED0': 'O',
				'\u1ED6': 'O',
				'\u1ED4': 'O',
				'\u00D5': 'O',
				'\u1E4C': 'O',
				'\u022C': 'O',
				'\u1E4E': 'O',
				'\u014C': 'O',
				'\u1E50': 'O',
				'\u1E52': 'O',
				'\u014E': 'O',
				'\u022E': 'O',
				'\u0230': 'O',
				'\u00D6': 'O',
				'\u022A': 'O',
				'\u1ECE': 'O',
				'\u0150': 'O',
				'\u01D1': 'O',
				'\u020C': 'O',
				'\u020E': 'O',
				'\u01A0': 'O',
				'\u1EDC': 'O',
				'\u1EDA': 'O',
				'\u1EE0': 'O',
				'\u1EDE': 'O',
				'\u1EE2': 'O',
				'\u1ECC': 'O',
				'\u1ED8': 'O',
				'\u01EA': 'O',
				'\u01EC': 'O',
				'\u00D8': 'O',
				'\u01FE': 'O',
				'\u0186': 'O',
				'\u019F': 'O',
				'\uA74A': 'O',
				'\uA74C': 'O',
				'\u01A2': 'OI',
				'\uA74E': 'OO',
				'\u0222': 'OU',
				'\u24C5': 'P',
				'\uFF30': 'P',
				'\u1E54': 'P',
				'\u1E56': 'P',
				'\u01A4': 'P',
				'\u2C63': 'P',
				'\uA750': 'P',
				'\uA752': 'P',
				'\uA754': 'P',
				'\u24C6': 'Q',
				'\uFF31': 'Q',
				'\uA756': 'Q',
				'\uA758': 'Q',
				'\u024A': 'Q',
				'\u24C7': 'R',
				'\uFF32': 'R',
				'\u0154': 'R',
				'\u1E58': 'R',
				'\u0158': 'R',
				'\u0210': 'R',
				'\u0212': 'R',
				'\u1E5A': 'R',
				'\u1E5C': 'R',
				'\u0156': 'R',
				'\u1E5E': 'R',
				'\u024C': 'R',
				'\u2C64': 'R',
				'\uA75A': 'R',
				'\uA7A6': 'R',
				'\uA782': 'R',
				'\u24C8': 'S',
				'\uFF33': 'S',
				'\u1E9E': 'S',
				'\u015A': 'S',
				'\u1E64': 'S',
				'\u015C': 'S',
				'\u1E60': 'S',
				'\u0160': 'S',
				'\u1E66': 'S',
				'\u1E62': 'S',
				'\u1E68': 'S',
				'\u0218': 'S',
				'\u015E': 'S',
				'\u2C7E': 'S',
				'\uA7A8': 'S',
				'\uA784': 'S',
				'\u24C9': 'T',
				'\uFF34': 'T',
				'\u1E6A': 'T',
				'\u0164': 'T',
				'\u1E6C': 'T',
				'\u021A': 'T',
				'\u0162': 'T',
				'\u1E70': 'T',
				'\u1E6E': 'T',
				'\u0166': 'T',
				'\u01AC': 'T',
				'\u01AE': 'T',
				'\u023E': 'T',
				'\uA786': 'T',
				'\uA728': 'TZ',
				'\u24CA': 'U',
				'\uFF35': 'U',
				'\u00D9': 'U',
				'\u00DA': 'U',
				'\u00DB': 'U',
				'\u0168': 'U',
				'\u1E78': 'U',
				'\u016A': 'U',
				'\u1E7A': 'U',
				'\u016C': 'U',
				'\u00DC': 'U',
				'\u01DB': 'U',
				'\u01D7': 'U',
				'\u01D5': 'U',
				'\u01D9': 'U',
				'\u1EE6': 'U',
				'\u016E': 'U',
				'\u0170': 'U',
				'\u01D3': 'U',
				'\u0214': 'U',
				'\u0216': 'U',
				'\u01AF': 'U',
				'\u1EEA': 'U',
				'\u1EE8': 'U',
				'\u1EEE': 'U',
				'\u1EEC': 'U',
				'\u1EF0': 'U',
				'\u1EE4': 'U',
				'\u1E72': 'U',
				'\u0172': 'U',
				'\u1E76': 'U',
				'\u1E74': 'U',
				'\u0244': 'U',
				'\u24CB': 'V',
				'\uFF36': 'V',
				'\u1E7C': 'V',
				'\u1E7E': 'V',
				'\u01B2': 'V',
				'\uA75E': 'V',
				'\u0245': 'V',
				'\uA760': 'VY',
				'\u24CC': 'W',
				'\uFF37': 'W',
				'\u1E80': 'W',
				'\u1E82': 'W',
				'\u0174': 'W',
				'\u1E86': 'W',
				'\u1E84': 'W',
				'\u1E88': 'W',
				'\u2C72': 'W',
				'\u24CD': 'X',
				'\uFF38': 'X',
				'\u1E8A': 'X',
				'\u1E8C': 'X',
				'\u24CE': 'Y',
				'\uFF39': 'Y',
				'\u1EF2': 'Y',
				'\u00DD': 'Y',
				'\u0176': 'Y',
				'\u1EF8': 'Y',
				'\u0232': 'Y',
				'\u1E8E': 'Y',
				'\u0178': 'Y',
				'\u1EF6': 'Y',
				'\u1EF4': 'Y',
				'\u01B3': 'Y',
				'\u024E': 'Y',
				'\u1EFE': 'Y',
				'\u24CF': 'Z',
				'\uFF3A': 'Z',
				'\u0179': 'Z',
				'\u1E90': 'Z',
				'\u017B': 'Z',
				'\u017D': 'Z',
				'\u1E92': 'Z',
				'\u1E94': 'Z',
				'\u01B5': 'Z',
				'\u0224': 'Z',
				'\u2C7F': 'Z',
				'\u2C6B': 'Z',
				'\uA762': 'Z',
				'\u24D0': 'a',
				'\uFF41': 'a',
				'\u1E9A': 'a',
				'\u00E0': 'a',
				'\u00E1': 'a',
				'\u00E2': 'a',
				'\u1EA7': 'a',
				'\u1EA5': 'a',
				'\u1EAB': 'a',
				'\u1EA9': 'a',
				'\u00E3': 'a',
				'\u0101': 'a',
				'\u0103': 'a',
				'\u1EB1': 'a',
				'\u1EAF': 'a',
				'\u1EB5': 'a',
				'\u1EB3': 'a',
				'\u0227': 'a',
				'\u01E1': 'a',
				'\u00E4': 'a',
				'\u01DF': 'a',
				'\u1EA3': 'a',
				'\u00E5': 'a',
				'\u01FB': 'a',
				'\u01CE': 'a',
				'\u0201': 'a',
				'\u0203': 'a',
				'\u1EA1': 'a',
				'\u1EAD': 'a',
				'\u1EB7': 'a',
				'\u1E01': 'a',
				'\u0105': 'a',
				'\u2C65': 'a',
				'\u0250': 'a',
				'\uA733': 'aa',
				'\u00E6': 'ae',
				'\u01FD': 'ae',
				'\u01E3': 'ae',
				'\uA735': 'ao',
				'\uA737': 'au',
				'\uA739': 'av',
				'\uA73B': 'av',
				'\uA73D': 'ay',
				'\u24D1': 'b',
				'\uFF42': 'b',
				'\u1E03': 'b',
				'\u1E05': 'b',
				'\u1E07': 'b',
				'\u0180': 'b',
				'\u0183': 'b',
				'\u0253': 'b',
				'\u24D2': 'c',
				'\uFF43': 'c',
				'\u0107': 'c',
				'\u0109': 'c',
				'\u010B': 'c',
				'\u010D': 'c',
				'\u00E7': 'c',
				'\u1E09': 'c',
				'\u0188': 'c',
				'\u023C': 'c',
				'\uA73F': 'c',
				'\u2184': 'c',
				'\u24D3': 'd',
				'\uFF44': 'd',
				'\u1E0B': 'd',
				'\u010F': 'd',
				'\u1E0D': 'd',
				'\u1E11': 'd',
				'\u1E13': 'd',
				'\u1E0F': 'd',
				'\u0111': 'd',
				'\u018C': 'd',
				'\u0256': 'd',
				'\u0257': 'd',
				'\uA77A': 'd',
				'\u01F3': 'dz',
				'\u01C6': 'dz',
				'\u24D4': 'e',
				'\uFF45': 'e',
				'\u00E8': 'e',
				'\u00E9': 'e',
				'\u00EA': 'e',
				'\u1EC1': 'e',
				'\u1EBF': 'e',
				'\u1EC5': 'e',
				'\u1EC3': 'e',
				'\u1EBD': 'e',
				'\u0113': 'e',
				'\u1E15': 'e',
				'\u1E17': 'e',
				'\u0115': 'e',
				'\u0117': 'e',
				'\u00EB': 'e',
				'\u1EBB': 'e',
				'\u011B': 'e',
				'\u0205': 'e',
				'\u0207': 'e',
				'\u1EB9': 'e',
				'\u1EC7': 'e',
				'\u0229': 'e',
				'\u1E1D': 'e',
				'\u0119': 'e',
				'\u1E19': 'e',
				'\u1E1B': 'e',
				'\u0247': 'e',
				'\u025B': 'e',
				'\u01DD': 'e',
				'\u24D5': 'f',
				'\uFF46': 'f',
				'\u1E1F': 'f',
				'\u0192': 'f',
				'\uA77C': 'f',
				'\u24D6': 'g',
				'\uFF47': 'g',
				'\u01F5': 'g',
				'\u011D': 'g',
				'\u1E21': 'g',
				'\u011F': 'g',
				'\u0121': 'g',
				'\u01E7': 'g',
				'\u0123': 'g',
				'\u01E5': 'g',
				'\u0260': 'g',
				'\uA7A1': 'g',
				'\u1D79': 'g',
				'\uA77F': 'g',
				'\u24D7': 'h',
				'\uFF48': 'h',
				'\u0125': 'h',
				'\u1E23': 'h',
				'\u1E27': 'h',
				'\u021F': 'h',
				'\u1E25': 'h',
				'\u1E29': 'h',
				'\u1E2B': 'h',
				'\u1E96': 'h',
				'\u0127': 'h',
				'\u2C68': 'h',
				'\u2C76': 'h',
				'\u0265': 'h',
				'\u0195': 'hv',
				'\u24D8': 'i',
				'\uFF49': 'i',
				'\u00EC': 'i',
				'\u00ED': 'i',
				'\u00EE': 'i',
				'\u0129': 'i',
				'\u012B': 'i',
				'\u012D': 'i',
				'\u00EF': 'i',
				'\u1E2F': 'i',
				'\u1EC9': 'i',
				'\u01D0': 'i',
				'\u0209': 'i',
				'\u020B': 'i',
				'\u1ECB': 'i',
				'\u012F': 'i',
				'\u1E2D': 'i',
				'\u0268': 'i',
				'\u0131': 'i',
				'\u24D9': 'j',
				'\uFF4A': 'j',
				'\u0135': 'j',
				'\u01F0': 'j',
				'\u0249': 'j',
				'\u24DA': 'k',
				'\uFF4B': 'k',
				'\u1E31': 'k',
				'\u01E9': 'k',
				'\u1E33': 'k',
				'\u0137': 'k',
				'\u1E35': 'k',
				'\u0199': 'k',
				'\u2C6A': 'k',
				'\uA741': 'k',
				'\uA743': 'k',
				'\uA745': 'k',
				'\uA7A3': 'k',
				'\u24DB': 'l',
				'\uFF4C': 'l',
				'\u0140': 'l',
				'\u013A': 'l',
				'\u013E': 'l',
				'\u1E37': 'l',
				'\u1E39': 'l',
				'\u013C': 'l',
				'\u1E3D': 'l',
				'\u1E3B': 'l',
				'\u017F': 'l',
				'\u0142': 'l',
				'\u019A': 'l',
				'\u026B': 'l',
				'\u2C61': 'l',
				'\uA749': 'l',
				'\uA781': 'l',
				'\uA747': 'l',
				'\u01C9': 'lj',
				'\u24DC': 'm',
				'\uFF4D': 'm',
				'\u1E3F': 'm',
				'\u1E41': 'm',
				'\u1E43': 'm',
				'\u0271': 'm',
				'\u026F': 'm',
				'\u24DD': 'n',
				'\uFF4E': 'n',
				'\u01F9': 'n',
				'\u0144': 'n',
				'\u00F1': 'n',
				'\u1E45': 'n',
				'\u0148': 'n',
				'\u1E47': 'n',
				'\u0146': 'n',
				'\u1E4B': 'n',
				'\u1E49': 'n',
				'\u019E': 'n',
				'\u0272': 'n',
				'\u0149': 'n',
				'\uA791': 'n',
				'\uA7A5': 'n',
				'\u01CC': 'nj',
				'\u24DE': 'o',
				'\uFF4F': 'o',
				'\u00F2': 'o',
				'\u00F3': 'o',
				'\u00F4': 'o',
				'\u1ED3': 'o',
				'\u1ED1': 'o',
				'\u1ED7': 'o',
				'\u1ED5': 'o',
				'\u00F5': 'o',
				'\u1E4D': 'o',
				'\u022D': 'o',
				'\u1E4F': 'o',
				'\u014D': 'o',
				'\u1E51': 'o',
				'\u1E53': 'o',
				'\u014F': 'o',
				'\u022F': 'o',
				'\u0231': 'o',
				'\u00F6': 'o',
				'\u022B': 'o',
				'\u1ECF': 'o',
				'\u0151': 'o',
				'\u01D2': 'o',
				'\u020D': 'o',
				'\u020F': 'o',
				'\u01A1': 'o',
				'\u1EDD': 'o',
				'\u1EDB': 'o',
				'\u1EE1': 'o',
				'\u1EDF': 'o',
				'\u1EE3': 'o',
				'\u1ECD': 'o',
				'\u1ED9': 'o',
				'\u01EB': 'o',
				'\u01ED': 'o',
				'\u00F8': 'o',
				'\u01FF': 'o',
				'\u0254': 'o',
				'\uA74B': 'o',
				'\uA74D': 'o',
				'\u0275': 'o',
				'\u01A3': 'oi',
				'\u0223': 'ou',
				'\uA74F': 'oo',
				'\u24DF': 'p',
				'\uFF50': 'p',
				'\u1E55': 'p',
				'\u1E57': 'p',
				'\u01A5': 'p',
				'\u1D7D': 'p',
				'\uA751': 'p',
				'\uA753': 'p',
				'\uA755': 'p',
				'\u24E0': 'q',
				'\uFF51': 'q',
				'\u024B': 'q',
				'\uA757': 'q',
				'\uA759': 'q',
				'\u24E1': 'r',
				'\uFF52': 'r',
				'\u0155': 'r',
				'\u1E59': 'r',
				'\u0159': 'r',
				'\u0211': 'r',
				'\u0213': 'r',
				'\u1E5B': 'r',
				'\u1E5D': 'r',
				'\u0157': 'r',
				'\u1E5F': 'r',
				'\u024D': 'r',
				'\u027D': 'r',
				'\uA75B': 'r',
				'\uA7A7': 'r',
				'\uA783': 'r',
				'\u24E2': 's',
				'\uFF53': 's',
				'\u00DF': 's',
				'\u015B': 's',
				'\u1E65': 's',
				'\u015D': 's',
				'\u1E61': 's',
				'\u0161': 's',
				'\u1E67': 's',
				'\u1E63': 's',
				'\u1E69': 's',
				'\u0219': 's',
				'\u015F': 's',
				'\u023F': 's',
				'\uA7A9': 's',
				'\uA785': 's',
				'\u1E9B': 's',
				'\u24E3': 't',
				'\uFF54': 't',
				'\u1E6B': 't',
				'\u1E97': 't',
				'\u0165': 't',
				'\u1E6D': 't',
				'\u021B': 't',
				'\u0163': 't',
				'\u1E71': 't',
				'\u1E6F': 't',
				'\u0167': 't',
				'\u01AD': 't',
				'\u0288': 't',
				'\u2C66': 't',
				'\uA787': 't',
				'\uA729': 'tz',
				'\u24E4': 'u',
				'\uFF55': 'u',
				'\u00F9': 'u',
				'\u00FA': 'u',
				'\u00FB': 'u',
				'\u0169': 'u',
				'\u1E79': 'u',
				'\u016B': 'u',
				'\u1E7B': 'u',
				'\u016D': 'u',
				'\u00FC': 'u',
				'\u01DC': 'u',
				'\u01D8': 'u',
				'\u01D6': 'u',
				'\u01DA': 'u',
				'\u1EE7': 'u',
				'\u016F': 'u',
				'\u0171': 'u',
				'\u01D4': 'u',
				'\u0215': 'u',
				'\u0217': 'u',
				'\u01B0': 'u',
				'\u1EEB': 'u',
				'\u1EE9': 'u',
				'\u1EEF': 'u',
				'\u1EED': 'u',
				'\u1EF1': 'u',
				'\u1EE5': 'u',
				'\u1E73': 'u',
				'\u0173': 'u',
				'\u1E77': 'u',
				'\u1E75': 'u',
				'\u0289': 'u',
				'\u24E5': 'v',
				'\uFF56': 'v',
				'\u1E7D': 'v',
				'\u1E7F': 'v',
				'\u028B': 'v',
				'\uA75F': 'v',
				'\u028C': 'v',
				'\uA761': 'vy',
				'\u24E6': 'w',
				'\uFF57': 'w',
				'\u1E81': 'w',
				'\u1E83': 'w',
				'\u0175': 'w',
				'\u1E87': 'w',
				'\u1E85': 'w',
				'\u1E98': 'w',
				'\u1E89': 'w',
				'\u2C73': 'w',
				'\u24E7': 'x',
				'\uFF58': 'x',
				'\u1E8B': 'x',
				'\u1E8D': 'x',
				'\u24E8': 'y',
				'\uFF59': 'y',
				'\u1EF3': 'y',
				'\u00FD': 'y',
				'\u0177': 'y',
				'\u1EF9': 'y',
				'\u0233': 'y',
				'\u1E8F': 'y',
				'\u00FF': 'y',
				'\u1EF7': 'y',
				'\u1E99': 'y',
				'\u1EF5': 'y',
				'\u01B4': 'y',
				'\u024F': 'y',
				'\u1EFF': 'y',
				'\u24E9': 'z',
				'\uFF5A': 'z',
				'\u017A': 'z',
				'\u1E91': 'z',
				'\u017C': 'z',
				'\u017E': 'z',
				'\u1E93': 'z',
				'\u1E95': 'z',
				'\u01B6': 'z',
				'\u0225': 'z',
				'\u0240': 'z',
				'\u2C6C': 'z',
				'\uA763': 'z',
				'\u0386': '\u0391',
				'\u0388': '\u0395',
				'\u0389': '\u0397',
				'\u038A': '\u0399',
				'\u03AA': '\u0399',
				'\u038C': '\u039F',
				'\u038E': '\u03A5',
				'\u03AB': '\u03A5',
				'\u038F': '\u03A9',
				'\u03AC': '\u03B1',
				'\u03AD': '\u03B5',
				'\u03AE': '\u03B7',
				'\u03AF': '\u03B9',
				'\u03CA': '\u03B9',
				'\u0390': '\u03B9',
				'\u03CC': '\u03BF',
				'\u03CD': '\u03C5',
				'\u03CB': '\u03C5',
				'\u03B0': '\u03C5',
				'\u03C9': '\u03C9',
				'\u03C2': '\u03C3'
			};

			return diacritics;
		});

		S2.define('select2/data/base', [
			'../utils'
		], function (Utils) {
			function BaseAdapter($element, options) {
				BaseAdapter.__super__.constructor.call(this);
			}

			Utils.Extend(BaseAdapter, Utils.Observable);

			BaseAdapter.prototype.current = function (callback) {
				throw new Error('The `current` method must be defined in child classes.');
			};

			BaseAdapter.prototype.query = function (params, callback) {
				throw new Error('The `query` method must be defined in child classes.');
			};

			BaseAdapter.prototype.bind = function (container, $container) {
				// Can be implemented in subclasses
			};

			BaseAdapter.prototype.destroy = function () {
				// Can be implemented in subclasses
			};

			BaseAdapter.prototype.generateResultId = function (container, data) {
				var id = container.id + '-result-';

				id += Utils.generateChars(4);

				if (data.id != null) {
					id += '-' + data.id.toString();
				} else {
					id += '-' + Utils.generateChars(4);
				}
				return id;
			};

			return BaseAdapter;
		});

		S2.define('select2/data/select', [
			'./base',
			'../utils',
			'jquery'
		], function (BaseAdapter, Utils, $) {
			function SelectAdapter($element, options) {
				this.$element = $element;
				this.options = options;

				SelectAdapter.__super__.constructor.call(this);
			}

			Utils.Extend(SelectAdapter, BaseAdapter);

			SelectAdapter.prototype.current = function (callback) {
				var data = [];
				var self = this;

				this.$element.find(':selected').each(function () {
					var $option = $(this);

					var option = self.item($option);

					data.push(option);
				});

				callback(data);
			};

			SelectAdapter.prototype.select = function (data) {
				var self = this;

				data.selected = true;

				// If data.element is a DOM node, use it instead
				if ($(data.element).is('option')) {
					data.element.selected = true;

					this.$element.trigger('change');

					return;
				}

				if (this.$element.prop('multiple')) {
					this.current(function (currentData) {
						var val = [];

						data = [data];
						data.push.apply(data, currentData);

						for (var d = 0; d < data.length; d++) {
							var id = data[d].id;

							if ($.inArray(id, val) === -1) {
								val.push(id);
							}
						}

						self.$element.val(val);
						self.$element.trigger('change');
					});
				} else {
					var val = data.id;

					this.$element.val(val);
					this.$element.trigger('change');
				}
			};

			SelectAdapter.prototype.unselect = function (data) {
				var self = this;

				if (!this.$element.prop('multiple')) {
					return;
				}

				data.selected = false;

				if ($(data.element).is('option')) {
					data.element.selected = false;

					this.$element.trigger('change');

					return;
				}

				this.current(function (currentData) {
					var val = [];

					for (var d = 0; d < currentData.length; d++) {
						var id = currentData[d].id;

						if (id !== data.id && $.inArray(id, val) === -1) {
							val.push(id);
						}
					}

					self.$element.val(val);

					self.$element.trigger('change');
				});
			};

			SelectAdapter.prototype.bind = function (container, $container) {
				var self = this;

				this.container = container;

				container.on('select', function (params) {
					self.select(params.data);
				});

				container.on('unselect', function (params) {
					self.unselect(params.data);
				});
			};

			SelectAdapter.prototype.destroy = function () {
				// Remove anything added to child elements
				this.$element.find('*').each(function () {
					// Remove any custom data set by Select2
					Utils.RemoveData(this);
				});
			};

			SelectAdapter.prototype.query = function (params, callback) {
				var data = [];
				var self = this;

				var $options = this.$element.children();

				$options.each(function () {
					var $option = $(this);

					if (!$option.is('option') && !$option.is('optgroup')) {
						return;
					}

					var option = self.item($option);

					var matches = self.matches(params, option);

					if (matches !== null) {
						data.push(matches);
					}
				});

				callback({
					results: data
				});
			};

			SelectAdapter.prototype.addOptions = function ($options) {
				Utils.appendMany(this.$element, $options);
			};

			SelectAdapter.prototype.option = function (data) {
				var option;

				if (data.children) {
					option = document.createElement('optgroup');
					option.label = data.text;
				} else {
					option = document.createElement('option');

					if (option.textContent !== undefined) {
						option.textContent = data.text;
					} else {
						option.innerText = data.text;
					}
				}

				if (data.id !== undefined) {
					option.value = data.id;
				}

				if (data.disabled) {
					option.disabled = true;
				}

				if (data.selected) {
					option.selected = true;
				}

				if (data.title) {
					option.title = data.title;
				}

				var $option = $(option);

				var normalizedData = this._normalizeItem(data);
				normalizedData.element = option;

				// Override the option's data with the combined data
				Utils.StoreData(option, 'data', normalizedData);

				return $option;
			};

			SelectAdapter.prototype.item = function ($option) {
				var data = {};

				data = Utils.GetData($option[0], 'data');

				if (data != null) {
					return data;
				}

				if ($option.is('option')) {
					data = {
						id: $option.val(),
						text: $option.text(),
						disabled: $option.prop('disabled'),
						selected: $option.prop('selected'),
						title: $option.prop('title')
					};
				} else if ($option.is('optgroup')) {
					data = {
						text: $option.prop('label'),
						children: [],
						title: $option.prop('title')
					};

					var $children = $option.children('option');
					var children = [];

					for (var c = 0; c < $children.length; c++) {
						var $child = $($children[c]);

						var child = this.item($child);

						children.push(child);
					}

					data.children = children;
				}

				data = this._normalizeItem(data);
				data.element = $option[0];

				Utils.StoreData($option[0], 'data', data);

				return data;
			};

			SelectAdapter.prototype._normalizeItem = function (item) {
				if (item !== Object(item)) {
					item = {
						id: item,
						text: item
					};
				}

				item = $.extend({}, {
					text: ''
				}, item);

				var defaults = {
					selected: false,
					disabled: false
				};

				if (item.id != null) {
					item.id = item.id.toString();
				}

				if (item.text != null) {
					item.text = item.text.toString();
				}

				if (item._resultId == null && item.id && this.container != null) {
					item._resultId = this.generateResultId(this.container, item);
				}

				return $.extend({}, defaults, item);
			};

			SelectAdapter.prototype.matches = function (params, data) {
				var matcher = this.options.get('matcher');

				return matcher(params, data);
			};

			return SelectAdapter;
		});

		S2.define('select2/data/array', [
			'./select',
			'../utils',
			'jquery'
		], function (SelectAdapter, Utils, $) {
			function ArrayAdapter($element, options) {
				var data = options.get('data') || [];

				ArrayAdapter.__super__.constructor.call(this, $element, options);

				this.addOptions(this.convertToOptions(data));
			}

			Utils.Extend(ArrayAdapter, SelectAdapter);

			ArrayAdapter.prototype.select = function (data) {
				var $option = this.$element.find('option').filter(function (i, elm) {
					return elm.value == data.id.toString();
				});

				if ($option.length === 0) {
					$option = this.option(data);

					this.addOptions($option);
				}

				ArrayAdapter.__super__.select.call(this, data);
			};

			ArrayAdapter.prototype.convertToOptions = function (data) {
				var self = this;

				var $existing = this.$element.find('option');
				var existingIds = $existing.map(function () {
					return self.item($(this)).id;
				}).get();

				var $options = [];

				// Filter out all items except for the one passed in the argument
				function onlyItem(item) {
					return function () {
						return $(this).val() == item.id;
					};
				}

				for (var d = 0; d < data.length; d++) {
					var item = this._normalizeItem(data[d]);

					// Skip items which were pre-loaded, only merge the data
					if ($.inArray(item.id, existingIds) >= 0) {
						var $existingOption = $existing.filter(onlyItem(item));

						var existingData = this.item($existingOption);
						var newData = $.extend(true, {}, item, existingData);

						var $newOption = this.option(newData);

						$existingOption.replaceWith($newOption);

						continue;
					}

					var $option = this.option(item);

					if (item.children) {
						var $children = this.convertToOptions(item.children);

						Utils.appendMany($option, $children);
					}

					$options.push($option);
				}

				return $options;
			};

			return ArrayAdapter;
		});

		S2.define('select2/data/ajax', [
			'./array',
			'../utils',
			'jquery'
		], function (ArrayAdapter, Utils, $) {
			function AjaxAdapter($element, options) {
				this.ajaxOptions = this._applyDefaults(options.get('ajax'));

				if (this.ajaxOptions.processResults != null) {
					this.processResults = this.ajaxOptions.processResults;
				}

				AjaxAdapter.__super__.constructor.call(this, $element, options);
			}

			Utils.Extend(AjaxAdapter, ArrayAdapter);

			AjaxAdapter.prototype._applyDefaults = function (options) {
				var defaults = {
					data: function (params) {
						return $.extend({}, params, {
							q: params.term
						});
					},
					transport: function (params, success, failure) {
						var $request = $.ajax(params);

						$request.then(success);
						$request.fail(failure);

						return $request;
					}
				};

				return $.extend({}, defaults, options, true);
			};

			AjaxAdapter.prototype.processResults = function (results) {
				return results;
			};

			AjaxAdapter.prototype.query = function (params, callback) {
				var matches = [];
				var self = this;

				if (this._request != null) {
					// JSONP requests cannot always be aborted
					if ($.isFunction(this._request.abort)) {
						this._request.abort();
					}

					this._request = null;
				}

				var options = $.extend({
					type: 'GET'
				}, this.ajaxOptions);

				if (typeof options.url === 'function') {
					options.url = options.url.call(this.$element, params);
				}

				if (typeof options.data === 'function') {
					options.data = options.data.call(this.$element, params);
				}

				function request() {
					var $request = options.transport(options, function (data) {
						var results = self.processResults(data, params);

						if (self.options.get('debug') && window.console && console.error) {
							// Check to make sure that the response included a `results` key.
							if (!results || !results.results || !$.isArray(results.results)) {
								console.error(
									'Select2: The AJAX results did not return an array in the ' +
									'`results` key of the response.'
								);
							}
						}

						callback(results);
					}, function () {
						// Attempt to detect if a request was aborted
						// Only works if the transport exposes a status property
						if ('status' in $request &&
							($request.status === 0 || $request.status === '0')) {
							return;
						}

						self.trigger('results:message', {
							message: 'errorLoading'
						});
					});

					self._request = $request;
				}

				if (this.ajaxOptions.delay && params.term != null) {
					if (this._queryTimeout) {
						window.clearTimeout(this._queryTimeout);
					}

					this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
				} else {
					request();
				}
			};

			return AjaxAdapter;
		});

		S2.define('select2/data/tags', [
			'jquery'
		], function ($) {
			function Tags(decorated, $element, options) {
				var tags = options.get('tags');

				var createTag = options.get('createTag');

				if (createTag !== undefined) {
					this.createTag = createTag;
				}

				var insertTag = options.get('insertTag');

				if (insertTag !== undefined) {
					this.insertTag = insertTag;
				}

				decorated.call(this, $element, options);

				if ($.isArray(tags)) {
					for (var t = 0; t < tags.length; t++) {
						var tag = tags[t];
						var item = this._normalizeItem(tag);

						var $option = this.option(item);

						this.$element.append($option);
					}
				}
			}

			Tags.prototype.query = function (decorated, params, callback) {
				var self = this;

				this._removeOldTags();

				if (params.term == null || params.page != null) {
					decorated.call(this, params, callback);
					return;
				}

				function wrapper(obj, child) {
					var data = obj.results;

					for (var i = 0; i < data.length; i++) {
						var option = data[i];

						var checkChildren = (
							option.children != null &&
							!wrapper({
								results: option.children
							}, true)
						);

						var optionText = (option.text || '').toUpperCase();
						var paramsTerm = (params.term || '').toUpperCase();

						var checkText = optionText === paramsTerm;

						if (checkText || checkChildren) {
							if (child) {
								return false;
							}

							obj.data = data;
							callback(obj);

							return;
						}
					}

					if (child) {
						return true;
					}

					var tag = self.createTag(params);

					if (tag != null) {
						var $option = self.option(tag);
						$option.attr('data-select2-tag', true);

						self.addOptions([$option]);

						self.insertTag(data, tag);
					}

					obj.results = data;

					callback(obj);
				}

				decorated.call(this, params, wrapper);
			};

			Tags.prototype.createTag = function (decorated, params) {
				var term = $.trim(params.term);

				if (term === '') {
					return null;
				}

				return {
					id: term,
					text: term
				};
			};

			Tags.prototype.insertTag = function (_, data, tag) {
				data.unshift(tag);
			};

			Tags.prototype._removeOldTags = function (_) {
				var tag = this._lastTag;

				var $options = this.$element.find('option[data-select2-tag]');

				$options.each(function () {
					if (this.selected) {
						return;
					}

					$(this).remove();
				});
			};

			return Tags;
		});

		S2.define('select2/data/tokenizer', [
			'jquery'
		], function ($) {
			function Tokenizer(decorated, $element, options) {
				var tokenizer = options.get('tokenizer');

				if (tokenizer !== undefined) {
					this.tokenizer = tokenizer;
				}

				decorated.call(this, $element, options);
			}

			Tokenizer.prototype.bind = function (decorated, container, $container) {
				decorated.call(this, container, $container);

				this.$search = container.dropdown.$search || container.selection.$search ||
					$container.find('.select2-search__field');
			};

			Tokenizer.prototype.query = function (decorated, params, callback) {
				var self = this;

				function createAndSelect(data) {
					// Normalize the data object so we can use it for checks
					var item = self._normalizeItem(data);

					// Check if the data object already exists as a tag
					// Select it if it doesn't
					var $existingOptions = self.$element.find('option').filter(function () {
						return $(this).val() === item.id;
					});

					// If an existing option wasn't found for it, create the option
					if (!$existingOptions.length) {
						var $option = self.option(item);
						$option.attr('data-select2-tag', true);

						self._removeOldTags();
						self.addOptions([$option]);
					}

					// Select the item, now that we know there is an option for it
					select(item);
				}

				function select(data) {
					self.trigger('select', {
						data: data
					});
				}

				params.term = params.term || '';

				var tokenData = this.tokenizer(params, this.options, createAndSelect);

				if (tokenData.term !== params.term) {
					// Replace the search term if we have the search box
					if (this.$search.length) {
						this.$search.val(tokenData.term);
						this.$search.focus();
					}

					params.term = tokenData.term;
				}

				decorated.call(this, params, callback);
			};

			Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
				var separators = options.get('tokenSeparators') || [];
				var term = params.term;
				var i = 0;

				var createTag = this.createTag || function (params) {
					return {
						id: params.term,
						text: params.term
					};
				};

				while (i < term.length) {
					var termChar = term[i];

					if ($.inArray(termChar, separators) === -1) {
						i++;

						continue;
					}

					var part = term.substr(0, i);
					var partParams = $.extend({}, params, {
						term: part
					});

					var data = createTag(partParams);

					if (data == null) {
						i++;
						continue;
					}

					callback(data);

					// Reset the term to not include the tokenized portion
					term = term.substr(i + 1) || '';
					i = 0;
				}

				return {
					term: term
				};
			};

			return Tokenizer;
		});

		S2.define('select2/data/minimumInputLength', [

		], function () {
			function MinimumInputLength(decorated, $e, options) {
				this.minimumInputLength = options.get('minimumInputLength');

				decorated.call(this, $e, options);
			}

			MinimumInputLength.prototype.query = function (decorated, params, callback) {
				params.term = params.term || '';

				if (params.term.length < this.minimumInputLength) {
					this.trigger('results:message', {
						message: 'inputTooShort',
						args: {
							minimum: this.minimumInputLength,
							input: params.term,
							params: params
						}
					});

					return;
				}

				decorated.call(this, params, callback);
			};

			return MinimumInputLength;
		});

		S2.define('select2/data/maximumInputLength', [

		], function () {
			function MaximumInputLength(decorated, $e, options) {
				this.maximumInputLength = options.get('maximumInputLength');

				decorated.call(this, $e, options);
			}

			MaximumInputLength.prototype.query = function (decorated, params, callback) {
				params.term = params.term || '';

				if (this.maximumInputLength > 0 &&
					params.term.length > this.maximumInputLength) {
					this.trigger('results:message', {
						message: 'inputTooLong',
						args: {
							maximum: this.maximumInputLength,
							input: params.term,
							params: params
						}
					});

					return;
				}

				decorated.call(this, params, callback);
			};

			return MaximumInputLength;
		});

		S2.define('select2/data/maximumSelectionLength', [

		], function () {
			function MaximumSelectionLength(decorated, $e, options) {
				this.maximumSelectionLength = options.get('maximumSelectionLength');

				decorated.call(this, $e, options);
			}

			MaximumSelectionLength.prototype.query =
				function (decorated, params, callback) {
					var self = this;

					this.current(function (currentData) {
						var count = currentData != null ? currentData.length : 0;
						if (self.maximumSelectionLength > 0 &&
							count >= self.maximumSelectionLength) {
							self.trigger('results:message', {
								message: 'maximumSelected',
								args: {
									maximum: self.maximumSelectionLength
								}
							});
							return;
						}
						decorated.call(self, params, callback);
					});
				};

			return MaximumSelectionLength;
		});

		S2.define('select2/dropdown', [
			'jquery',
			'./utils'
		], function ($, Utils) {
			function Dropdown($element, options) {
				this.$element = $element;
				this.options = options;

				Dropdown.__super__.constructor.call(this);
			}

			Utils.Extend(Dropdown, Utils.Observable);

			Dropdown.prototype.render = function () {
				var $dropdown = $(
					'<span class="select2-dropdown">' +
					'<span class="select2-results"></span>' +
					'</span>'
				);

				$dropdown.attr('dir', this.options.get('dir'));

				this.$dropdown = $dropdown;

				return $dropdown;
			};

			Dropdown.prototype.bind = function () {
				// Should be implemented in subclasses
			};

			Dropdown.prototype.position = function ($dropdown, $container) {
				// Should be implmented in subclasses
			};

			Dropdown.prototype.destroy = function () {
				// Remove the dropdown from the DOM
				this.$dropdown.remove();
			};

			return Dropdown;
		});

		S2.define('select2/dropdown/search', [
			'jquery',
			'../utils'
		], function ($, Utils) {
			function Search() {}

			Search.prototype.render = function (decorated) {
				var $rendered = decorated.call(this);

				var $search = $(
					'<span class="select2-search select2-search--dropdown">' +
					'<input class="select2-search__field" type="search" tabindex="-1"' +
					' autocomplete="off" autocorrect="off" autocapitalize="none"' +
					' spellcheck="false" role="textbox" />' +
					'</span>'
				);

				this.$searchContainer = $search;
				this.$search = $search.find('input');

				$rendered.prepend($search);

				return $rendered;
			};

			Search.prototype.bind = function (decorated, container, $container) {
				var self = this;

				decorated.call(this, container, $container);

				this.$search.on('keydown', function (evt) {
					self.trigger('keypress', evt);

					self._keyUpPrevented = evt.isDefaultPrevented();
				});

				// Workaround for browsers which do not support the `input` event
				// This will prevent double-triggering of events for browsers which support
				// both the `keyup` and `input` events.
				this.$search.on('input', function (evt) {
					// Unbind the duplicated `keyup` event
					$(this).off('keyup');
				});

				this.$search.on('keyup input', function (evt) {
					self.handleSearch(evt);
				});

				container.on('open', function () {
					self.$search.attr('tabindex', 0);

					self.$search.focus();

					window.setTimeout(function () {
						self.$search.focus();
					}, 0);
				});

				container.on('close', function () {
					self.$search.attr('tabindex', -1);

					self.$search.val('');
					self.$search.blur();
				});

				container.on('focus', function () {
					if (!container.isOpen()) {
						self.$search.focus();
					}
				});

				container.on('results:all', function (params) {
					if (params.query.term == null || params.query.term === '') {
						var showSearch = self.showSearch(params);

						if (showSearch) {
							self.$searchContainer.removeClass('select2-search--hide');
						} else {
							self.$searchContainer.addClass('select2-search--hide');
						}
					}
				});
			};

			Search.prototype.handleSearch = function (evt) {
				if (!this._keyUpPrevented) {
					var input = this.$search.val();

					this.trigger('query', {
						term: input
					});
				}

				this._keyUpPrevented = false;
			};

			Search.prototype.showSearch = function (_, params) {
				return true;
			};

			return Search;
		});

		S2.define('select2/dropdown/hidePlaceholder', [

		], function () {
			function HidePlaceholder(decorated, $element, options, dataAdapter) {
				this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

				decorated.call(this, $element, options, dataAdapter);
			}

			HidePlaceholder.prototype.append = function (decorated, data) {
				data.results = this.removePlaceholder(data.results);

				decorated.call(this, data);
			};

			HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
				if (typeof placeholder === 'string') {
					placeholder = {
						id: '',
						text: placeholder
					};
				}

				return placeholder;
			};

			HidePlaceholder.prototype.removePlaceholder = function (_, data) {
				var modifiedData = data.slice(0);

				for (var d = data.length - 1; d >= 0; d--) {
					var item = data[d];

					if (this.placeholder.id === item.id) {
						modifiedData.splice(d, 1);
					}
				}

				return modifiedData;
			};

			return HidePlaceholder;
		});

		S2.define('select2/dropdown/infiniteScroll', [
			'jquery'
		], function ($) {
			function InfiniteScroll(decorated, $element, options, dataAdapter) {
				this.lastParams = {};

				decorated.call(this, $element, options, dataAdapter);

				this.$loadingMore = this.createLoadingMore();
				this.loading = false;
			}

			InfiniteScroll.prototype.append = function (decorated, data) {
				this.$loadingMore.remove();
				this.loading = false;

				decorated.call(this, data);

				if (this.showLoadingMore(data)) {
					this.$results.append(this.$loadingMore);
				}
			};

			InfiniteScroll.prototype.bind = function (decorated, container, $container) {
				var self = this;

				decorated.call(this, container, $container);

				container.on('query', function (params) {
					self.lastParams = params;
					self.loading = true;
				});

				container.on('query:append', function (params) {
					self.lastParams = params;
					self.loading = true;
				});

				this.$results.on('scroll', function () {
					var isLoadMoreVisible = $.contains(
						document.documentElement,
						self.$loadingMore[0]
					);

					if (self.loading || !isLoadMoreVisible) {
						return;
					}

					var currentOffset = self.$results.offset().top +
						self.$results.outerHeight(false);
					var loadingMoreOffset = self.$loadingMore.offset().top +
						self.$loadingMore.outerHeight(false);

					if (currentOffset + 50 >= loadingMoreOffset) {
						self.loadMore();
					}
				});
			};

			InfiniteScroll.prototype.loadMore = function () {
				this.loading = true;

				var params = $.extend({}, {
					page: 1
				}, this.lastParams);

				params.page++;

				this.trigger('query:append', params);
			};

			InfiniteScroll.prototype.showLoadingMore = function (_, data) {
				return data.pagination && data.pagination.more;
			};

			InfiniteScroll.prototype.createLoadingMore = function () {
				var $option = $(
					'<li ' +
					'class="select2-results__option select2-results__option--load-more"' +
					'role="treeitem" aria-disabled="true"></li>'
				);

				var message = this.options.get('translations').get('loadingMore');

				$option.html(message(this.lastParams));

				return $option;
			};

			return InfiniteScroll;
		});

		S2.define('select2/dropdown/attachBody', [
			'jquery',
			'../utils'
		], function ($, Utils) {
			function AttachBody(decorated, $element, options) {
				this.$dropdownParent = options.get('dropdownParent') || $(document.body);

				decorated.call(this, $element, options);
			}

			AttachBody.prototype.bind = function (decorated, container, $container) {
				var self = this;

				var setupResultsEvents = false;

				decorated.call(this, container, $container);

				container.on('open', function () {
					self._showDropdown();
					self._attachPositioningHandler(container);

					if (!setupResultsEvents) {
						setupResultsEvents = true;

						container.on('results:all', function () {
							self._positionDropdown();
							self._resizeDropdown();
						});

						container.on('results:append', function () {
							self._positionDropdown();
							self._resizeDropdown();
						});
					}
				});

				container.on('close', function () {
					self._hideDropdown();
					self._detachPositioningHandler(container);
				});

				this.$dropdownContainer.on('mousedown', function (evt) {
					evt.stopPropagation();
				});
			};

			AttachBody.prototype.destroy = function (decorated) {
				decorated.call(this);

				this.$dropdownContainer.remove();
			};

			AttachBody.prototype.position = function (decorated, $dropdown, $container) {
				// Clone all of the container classes
				$dropdown.attr('class', $container.attr('class'));

				$dropdown.removeClass('select2');
				$dropdown.addClass('select2-container--open');

				$dropdown.css({
					position: 'absolute',
					top: -999999
				});

				this.$container = $container;
			};

			AttachBody.prototype.render = function (decorated) {
				var $container = $('<span></span>');

				var $dropdown = decorated.call(this);
				$container.append($dropdown);

				this.$dropdownContainer = $container;

				return $container;
			};

			AttachBody.prototype._hideDropdown = function (decorated) {
				this.$dropdownContainer.detach();
			};

			AttachBody.prototype._attachPositioningHandler =
				function (decorated, container) {
					var self = this;

					var scrollEvent = 'scroll.select2.' + container.id;
					var resizeEvent = 'resize.select2.' + container.id;
					var orientationEvent = 'orientationchange.select2.' + container.id;

					var $watchers = this.$container.parents().filter(Utils.hasScroll);
					$watchers.each(function () {
						Utils.StoreData(this, 'select2-scroll-position', {
							x: $(this).scrollLeft(),
							y: $(this).scrollTop()
						});
					});

					$watchers.on(scrollEvent, function (ev) {
						var position = Utils.GetData(this, 'select2-scroll-position');
						$(this).scrollTop(position.y);
					});

					$(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
						function (e) {
							self._positionDropdown();
							self._resizeDropdown();
						});
				};

			AttachBody.prototype._detachPositioningHandler =
				function (decorated, container) {
					var scrollEvent = 'scroll.select2.' + container.id;
					var resizeEvent = 'resize.select2.' + container.id;
					var orientationEvent = 'orientationchange.select2.' + container.id;

					var $watchers = this.$container.parents().filter(Utils.hasScroll);
					$watchers.off(scrollEvent);

					$(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
				};

			AttachBody.prototype._positionDropdown = function () {
				var $window = $(window);

				var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
				var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

				var newDirection = null;

				var offset = this.$container.offset();

				offset.bottom = offset.top + this.$container.outerHeight(false);

				var container = {
					height: this.$container.outerHeight(false)
				};

				container.top = offset.top;
				container.bottom = offset.top + container.height;

				var dropdown = {
					height: this.$dropdown.outerHeight(false)
				};

				var viewport = {
					top: $window.scrollTop(),
					bottom: $window.scrollTop() + $window.height()
				};

				var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
				var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

				var css = {
					left: offset.left,
					top: container.bottom
				};

				// Determine what the parent element is to use for calciulating the offset
				var $offsetParent = this.$dropdownParent;

				// For statically positoned elements, we need to get the element
				// that is determining the offset
				if ($offsetParent.css('position') === 'static') {
					$offsetParent = $offsetParent.offsetParent();
				}

				var parentOffset = $offsetParent.offset();

				css.top -= parentOffset.top;
				css.left -= parentOffset.left;

				if (!isCurrentlyAbove && !isCurrentlyBelow) {
					newDirection = 'below';
				}

				if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
					newDirection = 'above';
				} else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
					newDirection = 'below';
				}

				if (newDirection == 'above' ||
					(isCurrentlyAbove && newDirection !== 'below')) {
					css.top = container.top - parentOffset.top - dropdown.height;
				}

				if (newDirection != null) {
					this.$dropdown
						.removeClass('select2-dropdown--below select2-dropdown--above')
						.addClass('select2-dropdown--' + newDirection);
					this.$container
						.removeClass('select2-container--below select2-container--above')
						.addClass('select2-container--' + newDirection);
				}

				this.$dropdownContainer.css(css);
			};

			AttachBody.prototype._resizeDropdown = function () {
				var css = {
					width: this.$container.outerWidth(false) + 'px'
				};

				if (this.options.get('dropdownAutoWidth')) {
					css.minWidth = css.width;
					css.position = 'relative';
					css.width = 'auto';
				}

				this.$dropdown.css(css);
			};

			AttachBody.prototype._showDropdown = function (decorated) {
				this.$dropdownContainer.appendTo(this.$dropdownParent);

				this._positionDropdown();
				this._resizeDropdown();
			};

			return AttachBody;
		});

		S2.define('select2/dropdown/minimumResultsForSearch', [

		], function () {
			function countResults(data) {
				var count = 0;

				for (var d = 0; d < data.length; d++) {
					var item = data[d];

					if (item.children) {
						count += countResults(item.children);
					} else {
						count++;
					}
				}

				return count;
			}

			function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
				this.minimumResultsForSearch = options.get('minimumResultsForSearch');

				if (this.minimumResultsForSearch < 0) {
					this.minimumResultsForSearch = Infinity;
				}

				decorated.call(this, $element, options, dataAdapter);
			}

			MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
				if (countResults(params.data.results) < this.minimumResultsForSearch) {
					return false;
				}

				return decorated.call(this, params);
			};

			return MinimumResultsForSearch;
		});

		S2.define('select2/dropdown/selectOnClose', [
			'../utils'
		], function (Utils) {
			function SelectOnClose() {}

			SelectOnClose.prototype.bind = function (decorated, container, $container) {
				var self = this;

				decorated.call(this, container, $container);

				container.on('close', function (params) {
					self._handleSelectOnClose(params);
				});
			};

			SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
				if (params && params.originalSelect2Event != null) {
					var event = params.originalSelect2Event;

					// Don't select an item if the close event was triggered from a select or
					// unselect event
					if (event._type === 'select' || event._type === 'unselect') {
						return;
					}
				}

				var $highlightedResults = this.getHighlightedResults();

				// Only select highlighted results
				if ($highlightedResults.length < 1) {
					return;
				}

				var data = Utils.GetData($highlightedResults[0], 'data');

				// Don't re-select already selected resulte
				if (
					(data.element != null && data.element.selected) ||
					(data.element == null && data.selected)
				) {
					return;
				}

				this.trigger('select', {
					data: data
				});
			};

			return SelectOnClose;
		});

		S2.define('select2/dropdown/closeOnSelect', [

		], function () {
			function CloseOnSelect() {}

			CloseOnSelect.prototype.bind = function (decorated, container, $container) {
				var self = this;

				decorated.call(this, container, $container);

				container.on('select', function (evt) {
					self._selectTriggered(evt);
				});

				container.on('unselect', function (evt) {
					self._selectTriggered(evt);
				});
			};

			CloseOnSelect.prototype._selectTriggered = function (_, evt) {
				var originalEvent = evt.originalEvent;

				// Don't close if the control key is being held
				if (originalEvent && originalEvent.ctrlKey) {
					return;
				}

				this.trigger('close', {
					originalEvent: originalEvent,
					originalSelect2Event: evt
				});
			};

			return CloseOnSelect;
		});

		S2.define('select2/i18n/en', [], function () {
			// English
			return {
				errorLoading: function () {
					return 'The results could not be loaded.';
				},
				inputTooLong: function (args) {
					var overChars = args.input.length - args.maximum;

					var message = 'Please delete ' + overChars + ' character';

					if (overChars != 1) {
						message += 's';
					}

					return message;
				},
				inputTooShort: function (args) {
					var remainingChars = args.minimum - args.input.length;

					var message = 'Please enter ' + remainingChars + ' or more characters';

					return message;
				},
				loadingMore: function () {
					return 'Loading more resultsâ€¦';
				},
				maximumSelected: function (args) {
					var message = 'You can only select ' + args.maximum + ' item';

					if (args.maximum != 1) {
						message += 's';
					}

					return message;
				},
				noResults: function () {
					return 'No results found';
				},
				searching: function () {
					return 'Searchingâ€¦';
				}
			};
		});

		S2.define('select2/defaults', [
			'jquery',
			'require',

			'./results',

			'./selection/single',
			'./selection/multiple',
			'./selection/placeholder',
			'./selection/allowClear',
			'./selection/search',
			'./selection/eventRelay',

			'./utils',
			'./translation',
			'./diacritics',

			'./data/select',
			'./data/array',
			'./data/ajax',
			'./data/tags',
			'./data/tokenizer',
			'./data/minimumInputLength',
			'./data/maximumInputLength',
			'./data/maximumSelectionLength',

			'./dropdown',
			'./dropdown/search',
			'./dropdown/hidePlaceholder',
			'./dropdown/infiniteScroll',
			'./dropdown/attachBody',
			'./dropdown/minimumResultsForSearch',
			'./dropdown/selectOnClose',
			'./dropdown/closeOnSelect',

			'./i18n/en'
		], function ($, require,

			ResultsList,

			SingleSelection, MultipleSelection, Placeholder, AllowClear,
			SelectionSearch, EventRelay,

			Utils, Translation, DIACRITICS,

			SelectData, ArrayData, AjaxData, Tags, Tokenizer,
			MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

			Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
			AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

			EnglishTranslation) {
			function Defaults() {
				this.reset();
			}

			Defaults.prototype.apply = function (options) {
				options = $.extend(true, {}, this.defaults, options);

				if (options.dataAdapter == null) {
					if (options.ajax != null) {
						options.dataAdapter = AjaxData;
					} else if (options.data != null) {
						options.dataAdapter = ArrayData;
					} else {
						options.dataAdapter = SelectData;
					}

					if (options.minimumInputLength > 0) {
						options.dataAdapter = Utils.Decorate(
							options.dataAdapter,
							MinimumInputLength
						);
					}

					if (options.maximumInputLength > 0) {
						options.dataAdapter = Utils.Decorate(
							options.dataAdapter,
							MaximumInputLength
						);
					}

					if (options.maximumSelectionLength > 0) {
						options.dataAdapter = Utils.Decorate(
							options.dataAdapter,
							MaximumSelectionLength
						);
					}

					if (options.tags) {
						options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
					}

					if (options.tokenSeparators != null || options.tokenizer != null) {
						options.dataAdapter = Utils.Decorate(
							options.dataAdapter,
							Tokenizer
						);
					}

					if (options.query != null) {
						var Query = require(options.amdBase + 'compat/query');

						options.dataAdapter = Utils.Decorate(
							options.dataAdapter,
							Query
						);
					}

					if (options.initSelection != null) {
						var InitSelection = require(options.amdBase + 'compat/initSelection');

						options.dataAdapter = Utils.Decorate(
							options.dataAdapter,
							InitSelection
						);
					}
				}

				if (options.resultsAdapter == null) {
					options.resultsAdapter = ResultsList;

					if (options.ajax != null) {
						options.resultsAdapter = Utils.Decorate(
							options.resultsAdapter,
							InfiniteScroll
						);
					}

					if (options.placeholder != null) {
						options.resultsAdapter = Utils.Decorate(
							options.resultsAdapter,
							HidePlaceholder
						);
					}

					if (options.selectOnClose) {
						options.resultsAdapter = Utils.Decorate(
							options.resultsAdapter,
							SelectOnClose
						);
					}
				}

				if (options.dropdownAdapter == null) {
					if (options.multiple) {
						options.dropdownAdapter = Dropdown;
					} else {
						var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

						options.dropdownAdapter = SearchableDropdown;
					}

					if (options.minimumResultsForSearch !== 0) {
						options.dropdownAdapter = Utils.Decorate(
							options.dropdownAdapter,
							MinimumResultsForSearch
						);
					}

					if (options.closeOnSelect) {
						options.dropdownAdapter = Utils.Decorate(
							options.dropdownAdapter,
							CloseOnSelect
						);
					}

					if (
						options.dropdownCssClass != null ||
						options.dropdownCss != null ||
						options.adaptDropdownCssClass != null
					) {
						var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

						options.dropdownAdapter = Utils.Decorate(
							options.dropdownAdapter,
							DropdownCSS
						);
					}

					options.dropdownAdapter = Utils.Decorate(
						options.dropdownAdapter,
						AttachBody
					);
				}

				if (options.selectionAdapter == null) {
					if (options.multiple) {
						options.selectionAdapter = MultipleSelection;
					} else {
						options.selectionAdapter = SingleSelection;
					}

					// Add the placeholder mixin if a placeholder was specified
					if (options.placeholder != null) {
						options.selectionAdapter = Utils.Decorate(
							options.selectionAdapter,
							Placeholder
						);
					}

					if (options.allowClear) {
						options.selectionAdapter = Utils.Decorate(
							options.selectionAdapter,
							AllowClear
						);
					}

					if (options.multiple) {
						options.selectionAdapter = Utils.Decorate(
							options.selectionAdapter,
							SelectionSearch
						);
					}

					if (
						options.containerCssClass != null ||
						options.containerCss != null ||
						options.adaptContainerCssClass != null
					) {
						var ContainerCSS = require(options.amdBase + 'compat/containerCss');

						options.selectionAdapter = Utils.Decorate(
							options.selectionAdapter,
							ContainerCSS
						);
					}

					options.selectionAdapter = Utils.Decorate(
						options.selectionAdapter,
						EventRelay
					);
				}

				if (typeof options.language === 'string') {
					// Check if the language is specified with a region
					if (options.language.indexOf('-') > 0) {
						// Extract the region information if it is included
						var languageParts = options.language.split('-');
						var baseLanguage = languageParts[0];

						options.language = [options.language, baseLanguage];
					} else {
						options.language = [options.language];
					}
				}

				if ($.isArray(options.language)) {
					var languages = new Translation();
					options.language.push('en');

					var languageNames = options.language;

					for (var l = 0; l < languageNames.length; l++) {
						var name = languageNames[l];
						var language = {};

						try {
							// Try to load it with the original name
							language = Translation.loadPath(name);
						} catch (e) {
							try {
								// If we couldn't load it, check if it wasn't the full path
								name = this.defaults.amdLanguageBase + name;
								language = Translation.loadPath(name);
							} catch (ex) {
								// The translation could not be loaded at all. Sometimes this is
								// because of a configuration problem, other times this can be
								// because of how Select2 helps load all possible translation files.
								if (options.debug && window.console && console.warn) {
									console.warn(
										'Select2: The language file for "' + name + '" could not be ' +
										'automatically loaded. A fallback will be used instead.'
									);
								}

								continue;
							}
						}

						languages.extend(language);
					}

					options.translations = languages;
				} else {
					var baseTranslation = Translation.loadPath(
						this.defaults.amdLanguageBase + 'en'
					);
					var customTranslation = new Translation(options.language);

					customTranslation.extend(baseTranslation);

					options.translations = customTranslation;
				}

				return options;
			};

			Defaults.prototype.reset = function () {
				function stripDiacritics(text) {
					// Used 'uni range + named function' from http://jsperf.com/diacritics/18
					function match(a) {
						return DIACRITICS[a] || a;
					}

					return text.replace(/[^\u0000-\u007E]/g, match);
				}

				function matcher(params, data) {
					// Always return the object if there is nothing to compare
					if ($.trim(params.term) === '') {
						return data;
					}

					// Do a recursive check for options with children
					if (data.children && data.children.length > 0) {
						// Clone the data object if there are children
						// This is required as we modify the object to remove any non-matches
						var match = $.extend(true, {}, data);

						// Check each child of the option
						for (var c = data.children.length - 1; c >= 0; c--) {
							var child = data.children[c];

							var matches = matcher(params, child);

							// If there wasn't a match, remove the object in the array
							if (matches == null) {
								match.children.splice(c, 1);
							}
						}

						// If any children matched, return the new object
						if (match.children.length > 0) {
							return match;
						}

						// If there were no matching children, check just the plain object
						return matcher(params, match);
					}

					var original = stripDiacritics(data.text).toUpperCase();
					var term = stripDiacritics(params.term).toUpperCase();

					// Check if the text contains the term
					if (original.indexOf(term) > -1) {
						return data;
					}

					// If it doesn't contain the term, don't return anything
					return null;
				}

				this.defaults = {
					amdBase: './',
					amdLanguageBase: './i18n/',
					closeOnSelect: true,
					debug: false,
					dropdownAutoWidth: false,
					escapeMarkup: Utils.escapeMarkup,
					language: EnglishTranslation,
					matcher: matcher,
					minimumInputLength: 0,
					maximumInputLength: 0,
					maximumSelectionLength: 0,
					minimumResultsForSearch: 0,
					selectOnClose: false,
					sorter: function (data) {
						return data;
					},
					templateResult: function (result) {
						return result.text;
					},
					templateSelection: function (selection) {
						return selection.text;
					},
					theme: 'default',
					width: 'resolve'
				};
			};

			Defaults.prototype.set = function (key, value) {
				var camelKey = $.camelCase(key);

				var data = {};
				data[camelKey] = value;

				var convertedData = Utils._convertData(data);

				$.extend(true, this.defaults, convertedData);
			};

			var defaults = new Defaults();

			return defaults;
		});

		S2.define('select2/options', [
			'require',
			'jquery',
			'./defaults',
			'./utils'
		], function (require, $, Defaults, Utils) {
			function Options(options, $element) {
				this.options = options;

				if ($element != null) {
					this.fromElement($element);
				}

				this.options = Defaults.apply(this.options);

				if ($element && $element.is('input')) {
					var InputCompat = require(this.get('amdBase') + 'compat/inputData');

					this.options.dataAdapter = Utils.Decorate(
						this.options.dataAdapter,
						InputCompat
					);
				}
			}

			Options.prototype.fromElement = function ($e) {
				var excludedData = ['select2'];

				if (this.options.multiple == null) {
					this.options.multiple = $e.prop('multiple');
				}

				if (this.options.disabled == null) {
					this.options.disabled = $e.prop('disabled');
				}

				if (this.options.language == null) {
					if ($e.prop('lang')) {
						this.options.language = $e.prop('lang').toLowerCase();
					} else if ($e.closest('[lang]').prop('lang')) {
						this.options.language = $e.closest('[lang]').prop('lang');
					}
				}

				if (this.options.dir == null) {
					if ($e.prop('dir')) {
						this.options.dir = $e.prop('dir');
					} else if ($e.closest('[dir]').prop('dir')) {
						this.options.dir = $e.closest('[dir]').prop('dir');
					} else {
						this.options.dir = 'ltr';
					}
				}

				$e.prop('disabled', this.options.disabled);
				$e.prop('multiple', this.options.multiple);

				if (Utils.GetData($e[0], 'select2Tags')) {
					if (this.options.debug && window.console && console.warn) {
						console.warn(
							'Select2: The `data-select2-tags` attribute has been changed to ' +
							'use the `data-data` and `data-tags="true"` attributes and will be ' +
							'removed in future versions of Select2.'
						);
					}

					Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
					Utils.StoreData($e[0], 'tags', true);
				}

				if (Utils.GetData($e[0], 'ajaxUrl')) {
					if (this.options.debug && window.console && console.warn) {
						console.warn(
							'Select2: The `data-ajax-url` attribute has been changed to ' +
							'`data-ajax--url` and support for the old attribute will be removed' +
							' in future versions of Select2.'
						);
					}

					$e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
					Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));

				}

				var dataset = {};

				// Prefer the element's `dataset` attribute if it exists
				// jQuery 1.x does not correctly handle data attributes with multiple dashes
				if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
					dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
				} else {
					dataset = Utils.GetData($e[0]);
				}

				var data = $.extend(true, {}, dataset);

				data = Utils._convertData(data);

				for (var key in data) {
					if ($.inArray(key, excludedData) > -1) {
						continue;
					}

					if ($.isPlainObject(this.options[key])) {
						$.extend(this.options[key], data[key]);
					} else {
						this.options[key] = data[key];
					}
				}

				return this;
			};

			Options.prototype.get = function (key) {
				return this.options[key];
			};

			Options.prototype.set = function (key, val) {
				this.options[key] = val;
			};

			return Options;
		});

		S2.define('select2/core', [
			'jquery',
			'./options',
			'./utils',
			'./keys'
		], function ($, Options, Utils, KEYS) {
			var Select2 = function ($element, options) {
				if (Utils.GetData($element[0], 'select2') != null) {
					Utils.GetData($element[0], 'select2').destroy();
				}

				this.$element = $element;

				this.id = this._generateId($element);

				options = options || {};

				this.options = new Options(options, $element);

				Select2.__super__.constructor.call(this);

				// Set up the tabindex

				var tabindex = $element.attr('tabindex') || 0;
				Utils.StoreData($element[0], 'old-tabindex', tabindex);
				$element.attr('tabindex', '-1');

				// Set up containers and adapters

				var DataAdapter = this.options.get('dataAdapter');
				this.dataAdapter = new DataAdapter($element, this.options);

				var $container = this.render();

				this._placeContainer($container);

				var SelectionAdapter = this.options.get('selectionAdapter');
				this.selection = new SelectionAdapter($element, this.options);
				this.$selection = this.selection.render();

				this.selection.position(this.$selection, $container);

				var DropdownAdapter = this.options.get('dropdownAdapter');
				this.dropdown = new DropdownAdapter($element, this.options);
				this.$dropdown = this.dropdown.render();

				this.dropdown.position(this.$dropdown, $container);

				var ResultsAdapter = this.options.get('resultsAdapter');
				this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
				this.$results = this.results.render();

				this.results.position(this.$results, this.$dropdown);

				// Bind events

				var self = this;

				// Bind the container to all of the adapters
				this._bindAdapters();

				// Register any DOM event handlers
				this._registerDomEvents();

				// Register any internal event handlers
				this._registerDataEvents();
				this._registerSelectionEvents();
				this._registerDropdownEvents();
				this._registerResultsEvents();
				this._registerEvents();

				// Set the initial state
				this.dataAdapter.current(function (initialData) {
					self.trigger('selection:update', {
						data: initialData
					});
				});

				// Hide the original select
				$element.addClass('select2-hidden-accessible');
				$element.attr('aria-hidden', 'true');

				// Synchronize any monitored attributes
				this._syncAttributes();

				Utils.StoreData($element[0], 'select2', this);

				// Ensure backwards compatibility with $element.data('select2').
				$element.data('select2', this);
			};

			Utils.Extend(Select2, Utils.Observable);

			Select2.prototype._generateId = function ($element) {
				var id = '';

				if ($element.attr('id') != null) {
					id = $element.attr('id');
				} else if ($element.attr('name') != null) {
					id = $element.attr('name') + '-' + Utils.generateChars(2);
				} else {
					id = Utils.generateChars(4);
				}

				id = id.replace(/(:|\.|\[|\]|,)/g, '');
				id = 'select2-' + id;

				return id;
			};

			Select2.prototype._placeContainer = function ($container) {
				$container.insertAfter(this.$element);

				var width = this._resolveWidth(this.$element, this.options.get('width'));

				if (width != null) {
					$container.css('width', width);
				}
			};

			Select2.prototype._resolveWidth = function ($element, method) {
				var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

				if (method == 'resolve') {
					var styleWidth = this._resolveWidth($element, 'style');

					if (styleWidth != null) {
						return styleWidth;
					}

					return this._resolveWidth($element, 'element');
				}

				if (method == 'element') {
					var elementWidth = $element.outerWidth(false);

					if (elementWidth <= 0) {
						return 'auto';
					}

					return elementWidth + 'px';
				}

				if (method == 'style') {
					var style = $element.attr('style');

					if (typeof (style) !== 'string') {
						return null;
					}

					var attrs = style.split(';');

					for (var i = 0, l = attrs.length; i < l; i = i + 1) {
						var attr = attrs[i].replace(/\s/g, '');
						var matches = attr.match(WIDTH);

						if (matches !== null && matches.length >= 1) {
							return matches[1];
						}
					}

					return null;
				}

				return method;
			};

			Select2.prototype._bindAdapters = function () {
				this.dataAdapter.bind(this, this.$container);
				this.selection.bind(this, this.$container);

				this.dropdown.bind(this, this.$container);
				this.results.bind(this, this.$container);
			};

			Select2.prototype._registerDomEvents = function () {
				var self = this;

				this.$element.on('change.select2', function () {
					self.dataAdapter.current(function (data) {
						self.trigger('selection:update', {
							data: data
						});
					});
				});

				this.$element.on('focus.select2', function (evt) {
					self.trigger('focus', evt);
				});

				this._syncA = Utils.bind(this._syncAttributes, this);
				this._syncS = Utils.bind(this._syncSubtree, this);

				if (this.$element[0].attachEvent) {
					this.$element[0].attachEvent('onpropertychange', this._syncA);
				}

				var observer = window.MutationObserver ||
					window.WebKitMutationObserver ||
					window.MozMutationObserver;

				if (observer != null) {
					this._observer = new observer(function (mutations) {
						$.each(mutations, self._syncA);
						$.each(mutations, self._syncS);
					});
					this._observer.observe(this.$element[0], {
						attributes: true,
						childList: true,
						subtree: false
					});
				} else if (this.$element[0].addEventListener) {
					this.$element[0].addEventListener(
						'DOMAttrModified',
						self._syncA,
						false
					);
					this.$element[0].addEventListener(
						'DOMNodeInserted',
						self._syncS,
						false
					);
					this.$element[0].addEventListener(
						'DOMNodeRemoved',
						self._syncS,
						false
					);
				}
			};

			Select2.prototype._registerDataEvents = function () {
				var self = this;

				this.dataAdapter.on('*', function (name, params) {
					self.trigger(name, params);
				});
			};

			Select2.prototype._registerSelectionEvents = function () {
				var self = this;
				var nonRelayEvents = ['toggle', 'focus'];

				this.selection.on('toggle', function () {
					self.toggleDropdown();
				});

				this.selection.on('focus', function (params) {
					self.focus(params);
				});

				this.selection.on('*', function (name, params) {
					if ($.inArray(name, nonRelayEvents) !== -1) {
						return;
					}

					self.trigger(name, params);
				});
			};

			Select2.prototype._registerDropdownEvents = function () {
				var self = this;

				this.dropdown.on('*', function (name, params) {
					self.trigger(name, params);
				});
			};

			Select2.prototype._registerResultsEvents = function () {
				var self = this;

				this.results.on('*', function (name, params) {
					self.trigger(name, params);
				});
			};

			Select2.prototype._registerEvents = function () {
				var self = this;

				this.on('open', function () {
					self.$container.addClass('select2-container--open');
				});

				this.on('close', function () {
					self.$container.removeClass('select2-container--open');
				});

				this.on('enable', function () {
					self.$container.removeClass('select2-container--disabled');
				});

				this.on('disable', function () {
					self.$container.addClass('select2-container--disabled');
				});

				this.on('blur', function () {
					self.$container.removeClass('select2-container--focus');
				});

				this.on('query', function (params) {
					if (!self.isOpen()) {
						self.trigger('open', {});
					}

					this.dataAdapter.query(params, function (data) {
						self.trigger('results:all', {
							data: data,
							query: params
						});
					});
				});

				this.on('query:append', function (params) {
					this.dataAdapter.query(params, function (data) {
						self.trigger('results:append', {
							data: data,
							query: params
						});
					});
				});

				this.on('keypress', function (evt) {
					var key = evt.which;

					if (self.isOpen()) {
						if (key === KEYS.ESC || key === KEYS.TAB ||
							(key === KEYS.UP && evt.altKey)) {
							self.close();

							evt.preventDefault();
						} else if (key === KEYS.ENTER) {
							self.trigger('results:select', {});

							evt.preventDefault();
						} else if ((key === KEYS.SPACE && evt.ctrlKey)) {
							self.trigger('results:toggle', {});

							evt.preventDefault();
						} else if (key === KEYS.UP) {
							self.trigger('results:previous', {});

							evt.preventDefault();
						} else if (key === KEYS.DOWN) {
							self.trigger('results:next', {});

							evt.preventDefault();
						}
					} else {
						if (key === KEYS.ENTER || key === KEYS.SPACE ||
							(key === KEYS.DOWN && evt.altKey)) {
							self.open();

							evt.preventDefault();
						}
					}
				});
			};

			Select2.prototype._syncAttributes = function () {
				this.options.set('disabled', this.$element.prop('disabled'));

				if (this.options.get('disabled')) {
					if (this.isOpen()) {
						this.close();
					}

					this.trigger('disable', {});
				} else {
					this.trigger('enable', {});
				}
			};

			Select2.prototype._syncSubtree = function (evt, mutations) {
				var changed = false;
				var self = this;

				// Ignore any mutation events raised for elements that aren't options or
				// optgroups. This handles the case when the select element is destroyed
				if (
					evt && evt.target && (
						evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
					)
				) {
					return;
				}

				if (!mutations) {
					// If mutation events aren't supported, then we can only assume that the
					// change affected the selections
					changed = true;
				} else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
					for (var n = 0; n < mutations.addedNodes.length; n++) {
						var node = mutations.addedNodes[n];

						if (node.selected) {
							changed = true;
						}
					}
				} else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
					changed = true;
				}

				// Only re-pull the data if we think there is a change
				if (changed) {
					this.dataAdapter.current(function (currentData) {
						self.trigger('selection:update', {
							data: currentData
						});
					});
				}
			};

			/**
			 * Override the trigger method to automatically trigger pre-events when
			 * there are events that can be prevented.
			 */
			Select2.prototype.trigger = function (name, args) {
				var actualTrigger = Select2.__super__.trigger;
				var preTriggerMap = {
					'open': 'opening',
					'close': 'closing',
					'select': 'selecting',
					'unselect': 'unselecting',
					'clear': 'clearing'
				};

				if (args === undefined) {
					args = {};
				}

				if (name in preTriggerMap) {
					var preTriggerName = preTriggerMap[name];
					var preTriggerArgs = {
						prevented: false,
						name: name,
						args: args
					};

					actualTrigger.call(this, preTriggerName, preTriggerArgs);

					if (preTriggerArgs.prevented) {
						args.prevented = true;

						return;
					}
				}

				actualTrigger.call(this, name, args);
			};

			Select2.prototype.toggleDropdown = function () {
				if (this.options.get('disabled')) {
					return;
				}

				if (this.isOpen()) {
					this.close();
				} else {
					this.open();
				}
			};

			Select2.prototype.open = function () {
				if (this.isOpen()) {
					return;
				}

				this.trigger('query', {});
			};

			Select2.prototype.close = function () {
				if (!this.isOpen()) {
					return;
				}

				this.trigger('close', {});
			};

			Select2.prototype.isOpen = function () {
				return this.$container.hasClass('select2-container--open');
			};

			Select2.prototype.hasFocus = function () {
				return this.$container.hasClass('select2-container--focus');
			};

			Select2.prototype.focus = function (data) {
				// No need to re-trigger focus events if we are already focused
				if (this.hasFocus()) {
					return;
				}

				this.$container.addClass('select2-container--focus');
				this.trigger('focus', {});
			};

			Select2.prototype.enable = function (args) {
				if (this.options.get('debug') && window.console && console.warn) {
					console.warn(
						'Select2: The `select2("enable")` method has been deprecated and will' +
						' be removed in later Select2 versions. Use $element.prop("disabled")' +
						' instead.'
					);
				}

				if (args == null || args.length === 0) {
					args = [true];
				}

				var disabled = !args[0];

				this.$element.prop('disabled', disabled);
			};

			Select2.prototype.data = function () {
				if (this.options.get('debug') &&
					arguments.length > 0 && window.console && console.warn) {
					console.warn(
						'Select2: Data can no longer be set using `select2("data")`. You ' +
						'should consider setting the value instead using `$element.val()`.'
					);
				}

				var data = [];

				this.dataAdapter.current(function (currentData) {
					data = currentData;
				});

				return data;
			};

			Select2.prototype.val = function (args) {
				if (this.options.get('debug') && window.console && console.warn) {
					console.warn(
						'Select2: The `select2("val")` method has been deprecated and will be' +
						' removed in later Select2 versions. Use $element.val() instead.'
					);
				}

				if (args == null || args.length === 0) {
					return this.$element.val();
				}

				var newVal = args[0];

				if ($.isArray(newVal)) {
					newVal = $.map(newVal, function (obj) {
						return obj.toString();
					});
				}

				this.$element.val(newVal).trigger('change');
			};

			Select2.prototype.destroy = function () {
				this.$container.remove();

				if (this.$element[0].detachEvent) {
					this.$element[0].detachEvent('onpropertychange', this._syncA);
				}

				if (this._observer != null) {
					this._observer.disconnect();
					this._observer = null;
				} else if (this.$element[0].removeEventListener) {
					this.$element[0]
						.removeEventListener('DOMAttrModified', this._syncA, false);
					this.$element[0]
						.removeEventListener('DOMNodeInserted', this._syncS, false);
					this.$element[0]
						.removeEventListener('DOMNodeRemoved', this._syncS, false);
				}

				this._syncA = null;
				this._syncS = null;

				this.$element.off('.select2');
				this.$element.attr('tabindex',
					Utils.GetData(this.$element[0], 'old-tabindex'));

				this.$element.removeClass('select2-hidden-accessible');
				this.$element.attr('aria-hidden', 'false');
				Utils.RemoveData(this.$element[0]);
				this.$element.removeData('select2');

				this.dataAdapter.destroy();
				this.selection.destroy();
				this.dropdown.destroy();
				this.results.destroy();

				this.dataAdapter = null;
				this.selection = null;
				this.dropdown = null;
				this.results = null;
			};

			Select2.prototype.render = function () {
				var $container = $(
					'<span class="select2 select2-container">' +
					'<span class="selection"></span>' +
					'<span class="dropdown-wrapper" aria-hidden="true"></span>' +
					'</span>'
				);

				$container.attr('dir', this.options.get('dir'));

				this.$container = $container;

				this.$container.addClass('select2-container--' + this.options.get('theme'));

				Utils.StoreData($container[0], 'element', this.$element);

				return $container;
			};

			return Select2;
		});

		S2.define('select2/compat/utils', [
			'jquery'
		], function ($) {
			function syncCssClasses($dest, $src, adapter) {
				var classes, replacements = [],
					adapted;

				classes = $.trim($dest.attr('class'));

				if (classes) {
					classes = '' + classes; // for IE which returns object

					$(classes.split(/\s+/)).each(function () {
						// Save all Select2 classes
						if (this.indexOf('select2-') === 0) {
							replacements.push(this);
						}
					});
				}

				classes = $.trim($src.attr('class'));

				if (classes) {
					classes = '' + classes; // for IE which returns object

					$(classes.split(/\s+/)).each(function () {
						// Only adapt non-Select2 classes
						if (this.indexOf('select2-') !== 0) {
							adapted = adapter(this);

							if (adapted != null) {
								replacements.push(adapted);
							}
						}
					});
				}

				$dest.attr('class', replacements.join(' '));
			}

			return {
				syncCssClasses: syncCssClasses
			};
		});

		S2.define('select2/compat/containerCss', [
			'jquery',
			'./utils'
		], function ($, CompatUtils) {
			// No-op CSS adapter that discards all classes by default
			function _containerAdapter(clazz) {
				return null;
			}

			function ContainerCSS() {}

			ContainerCSS.prototype.render = function (decorated) {
				var $container = decorated.call(this);

				var containerCssClass = this.options.get('containerCssClass') || '';

				if ($.isFunction(containerCssClass)) {
					containerCssClass = containerCssClass(this.$element);
				}

				var containerCssAdapter = this.options.get('adaptContainerCssClass');
				containerCssAdapter = containerCssAdapter || _containerAdapter;

				if (containerCssClass.indexOf(':all:') !== -1) {
					containerCssClass = containerCssClass.replace(':all:', '');

					var _cssAdapter = containerCssAdapter;

					containerCssAdapter = function (clazz) {
						var adapted = _cssAdapter(clazz);

						if (adapted != null) {
							// Append the old one along with the adapted one
							return adapted + ' ' + clazz;
						}

						return clazz;
					};
				}

				var containerCss = this.options.get('containerCss') || {};

				if ($.isFunction(containerCss)) {
					containerCss = containerCss(this.$element);
				}

				CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

				$container.css(containerCss);
				$container.addClass(containerCssClass);

				return $container;
			};

			return ContainerCSS;
		});

		S2.define('select2/compat/dropdownCss', [
			'jquery',
			'./utils'
		], function ($, CompatUtils) {
			// No-op CSS adapter that discards all classes by default
			function _dropdownAdapter(clazz) {
				return null;
			}

			function DropdownCSS() {}

			DropdownCSS.prototype.render = function (decorated) {
				var $dropdown = decorated.call(this);

				var dropdownCssClass = this.options.get('dropdownCssClass') || '';

				if ($.isFunction(dropdownCssClass)) {
					dropdownCssClass = dropdownCssClass(this.$element);
				}

				var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
				dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

				if (dropdownCssClass.indexOf(':all:') !== -1) {
					dropdownCssClass = dropdownCssClass.replace(':all:', '');

					var _cssAdapter = dropdownCssAdapter;

					dropdownCssAdapter = function (clazz) {
						var adapted = _cssAdapter(clazz);

						if (adapted != null) {
							// Append the old one along with the adapted one
							return adapted + ' ' + clazz;
						}

						return clazz;
					};
				}

				var dropdownCss = this.options.get('dropdownCss') || {};

				if ($.isFunction(dropdownCss)) {
					dropdownCss = dropdownCss(this.$element);
				}

				CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

				$dropdown.css(dropdownCss);
				$dropdown.addClass(dropdownCssClass);

				return $dropdown;
			};

			return DropdownCSS;
		});

		S2.define('select2/compat/initSelection', [
			'jquery'
		], function ($) {
			function InitSelection(decorated, $element, options) {
				if (options.get('debug') && window.console && console.warn) {
					console.warn(
						'Select2: The `initSelection` option has been deprecated in favor' +
						' of a custom data adapter that overrides the `current` method. ' +
						'This method is now called multiple times instead of a single ' +
						'time when the instance is initialized. Support will be removed ' +
						'for the `initSelection` option in future versions of Select2'
					);
				}

				this.initSelection = options.get('initSelection');
				this._isInitialized = false;

				decorated.call(this, $element, options);
			}

			InitSelection.prototype.current = function (decorated, callback) {
				var self = this;

				if (this._isInitialized) {
					decorated.call(this, callback);

					return;
				}

				this.initSelection.call(null, this.$element, function (data) {
					self._isInitialized = true;

					if (!$.isArray(data)) {
						data = [data];
					}

					callback(data);
				});
			};

			return InitSelection;
		});

		S2.define('select2/compat/inputData', [
			'jquery',
			'../utils'
		], function ($, Utils) {
			function InputData(decorated, $element, options) {
				this._currentData = [];
				this._valueSeparator = options.get('valueSeparator') || ',';

				if ($element.prop('type') === 'hidden') {
					if (options.get('debug') && console && console.warn) {
						console.warn(
							'Select2: Using a hidden input with Select2 is no longer ' +
							'supported and may stop working in the future. It is recommended ' +
							'to use a `<select>` element instead.'
						);
					}
				}

				decorated.call(this, $element, options);
			}

			InputData.prototype.current = function (_, callback) {
				function getSelected(data, selectedIds) {
					var selected = [];

					if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
						data.selected = true;
						selected.push(data);
					} else {
						data.selected = false;
					}

					if (data.children) {
						selected.push.apply(selected, getSelected(data.children, selectedIds));
					}

					return selected;
				}

				var selected = [];

				for (var d = 0; d < this._currentData.length; d++) {
					var data = this._currentData[d];

					selected.push.apply(
						selected,
						getSelected(
							data,
							this.$element.val().split(
								this._valueSeparator
							)
						)
					);
				}

				callback(selected);
			};

			InputData.prototype.select = function (_, data) {
				if (!this.options.get('multiple')) {
					this.current(function (allData) {
						$.map(allData, function (data) {
							data.selected = false;
						});
					});

					this.$element.val(data.id);
					this.$element.trigger('change');
				} else {
					var value = this.$element.val();
					value += this._valueSeparator + data.id;

					this.$element.val(value);
					this.$element.trigger('change');
				}
			};

			InputData.prototype.unselect = function (_, data) {
				var self = this;

				data.selected = false;

				this.current(function (allData) {
					var values = [];

					for (var d = 0; d < allData.length; d++) {
						var item = allData[d];

						if (data.id == item.id) {
							continue;
						}

						values.push(item.id);
					}

					self.$element.val(values.join(self._valueSeparator));
					self.$element.trigger('change');
				});
			};

			InputData.prototype.query = function (_, params, callback) {
				var results = [];

				for (var d = 0; d < this._currentData.length; d++) {
					var data = this._currentData[d];

					var matches = this.matches(params, data);

					if (matches !== null) {
						results.push(matches);
					}
				}

				callback({
					results: results
				});
			};

			InputData.prototype.addOptions = function (_, $options) {
				var options = $.map($options, function ($option) {
					return Utils.GetData($option[0], 'data');
				});

				this._currentData.push.apply(this._currentData, options);
			};

			return InputData;
		});

		S2.define('select2/compat/matcher', [
			'jquery'
		], function ($) {
			function oldMatcher(matcher) {
				function wrappedMatcher(params, data) {
					var match = $.extend(true, {}, data);

					if (params.term == null || $.trim(params.term) === '') {
						return match;
					}

					if (data.children) {
						for (var c = data.children.length - 1; c >= 0; c--) {
							var child = data.children[c];

							// Check if the child object matches
							// The old matcher returned a boolean true or false
							var doesMatch = matcher(params.term, child.text, child);

							// If the child didn't match, pop it off
							if (!doesMatch) {
								match.children.splice(c, 1);
							}
						}

						if (match.children.length > 0) {
							return match;
						}
					}

					if (matcher(params.term, data.text, data)) {
						return match;
					}

					return null;
				}

				return wrappedMatcher;
			}

			return oldMatcher;
		});

		S2.define('select2/compat/query', [

		], function () {
			function Query(decorated, $element, options) {
				if (options.get('debug') && window.console && console.warn) {
					console.warn(
						'Select2: The `query` option has been deprecated in favor of a ' +
						'custom data adapter that overrides the `query` method. Support ' +
						'will be removed for the `query` option in future versions of ' +
						'Select2.'
					);
				}

				decorated.call(this, $element, options);
			}

			Query.prototype.query = function (_, params, callback) {
				params.callback = callback;

				var query = this.options.get('query');

				query.call(null, params);
			};

			return Query;
		});

		S2.define('select2/dropdown/attachContainer', [

		], function () {
			function AttachContainer(decorated, $element, options) {
				decorated.call(this, $element, options);
			}

			AttachContainer.prototype.position =
				function (decorated, $dropdown, $container) {
					var $dropdownContainer = $container.find('.dropdown-wrapper');
					$dropdownContainer.append($dropdown);

					$dropdown.addClass('select2-dropdown--below');
					$container.addClass('select2-container--below');
				};

			return AttachContainer;
		});

		S2.define('select2/dropdown/stopPropagation', [

		], function () {
			function StopPropagation() {}

			StopPropagation.prototype.bind = function (decorated, container, $container) {
				decorated.call(this, container, $container);

				var stoppedEvents = [
					'blur',
					'change',
					'click',
					'dblclick',
					'focus',
					'focusin',
					'focusout',
					'input',
					'keydown',
					'keyup',
					'keypress',
					'mousedown',
					'mouseenter',
					'mouseleave',
					'mousemove',
					'mouseover',
					'mouseup',
					'search',
					'touchend',
					'touchstart'
				];

				this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
					evt.stopPropagation();
				});
			};

			return StopPropagation;
		});

		S2.define('select2/selection/stopPropagation', [

		], function () {
			function StopPropagation() {}

			StopPropagation.prototype.bind = function (decorated, container, $container) {
				decorated.call(this, container, $container);

				var stoppedEvents = [
					'blur',
					'change',
					'click',
					'dblclick',
					'focus',
					'focusin',
					'focusout',
					'input',
					'keydown',
					'keyup',
					'keypress',
					'mousedown',
					'mouseenter',
					'mouseleave',
					'mousemove',
					'mouseover',
					'mouseup',
					'search',
					'touchend',
					'touchstart'
				];

				this.$selection.on(stoppedEvents.join(' '), function (evt) {
					evt.stopPropagation();
				});
			};

			return StopPropagation;
		});

		/*!
		 * jQuery Mousewheel 3.1.13
		 *
		 * Copyright jQuery Foundation and other contributors
		 * Released under the MIT license
		 * http://jquery.org/license
		 */

		(function (factory) {
			if (typeof S2.define === 'function' && S2.define.amd) {
				// AMD. Register as an anonymous module.
				S2.define('jquery-mousewheel', ['jquery'], factory);
			} else if (typeof exports === 'object') {
				// Node/CommonJS style for Browserify
				module.exports = factory;
			} else {
				// Browser globals
				factory(jQuery);
			}
		}(function ($) {

			var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
				toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
				slice = Array.prototype.slice,
				nullLowestDeltaTimeout, lowestDelta;

			if ($.event.fixHooks) {
				for (var i = toFix.length; i;) {
					$.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
				}
			}

			var special = $.event.special.mousewheel = {
				version: '3.1.12',

				setup: function () {
					if (this.addEventListener) {
						for (var i = toBind.length; i;) {
							this.addEventListener(toBind[--i], handler, false);
						}
					} else {
						this.onmousewheel = handler;
					}
					// Store the line height and page height for this particular element
					$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
					$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
				},

				teardown: function () {
					if (this.removeEventListener) {
						for (var i = toBind.length; i;) {
							this.removeEventListener(toBind[--i], handler, false);
						}
					} else {
						this.onmousewheel = null;
					}
					// Clean up the data we added to the element
					$.removeData(this, 'mousewheel-line-height');
					$.removeData(this, 'mousewheel-page-height');
				},

				getLineHeight: function (elem) {
					var $elem = $(elem),
						$parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
					if (!$parent.length) {
						$parent = $('body');
					}
					return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
				},

				getPageHeight: function (elem) {
					return $(elem).height();
				},

				settings: {
					adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
					normalizeOffset: true // calls getBoundingClientRect for each event
				}
			};

			$.fn.extend({
				mousewheel: function (fn) {
					return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
				},

				unmousewheel: function (fn) {
					return this.unbind('mousewheel', fn);
				}
			});


			function handler(event) {
				var orgEvent = event || window.event,
					args = slice.call(arguments, 1),
					delta = 0,
					deltaX = 0,
					deltaY = 0,
					absDelta = 0,
					offsetX = 0,
					offsetY = 0;
				event = $.event.fix(orgEvent);
				event.type = 'mousewheel';

				// Old school scrollwheel delta
				if ('detail' in orgEvent) {
					deltaY = orgEvent.detail * -1;
				}
				if ('wheelDelta' in orgEvent) {
					deltaY = orgEvent.wheelDelta;
				}
				if ('wheelDeltaY' in orgEvent) {
					deltaY = orgEvent.wheelDeltaY;
				}
				if ('wheelDeltaX' in orgEvent) {
					deltaX = orgEvent.wheelDeltaX * -1;
				}

				// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
				if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
					deltaX = deltaY * -1;
					deltaY = 0;
				}

				// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
				delta = deltaY === 0 ? deltaX : deltaY;

				// New school wheel delta (wheel event)
				if ('deltaY' in orgEvent) {
					deltaY = orgEvent.deltaY * -1;
					delta = deltaY;
				}
				if ('deltaX' in orgEvent) {
					deltaX = orgEvent.deltaX;
					if (deltaY === 0) {
						delta = deltaX * -1;
					}
				}

				// No change actually happened, no reason to go any further
				if (deltaY === 0 && deltaX === 0) {
					return;
				}

				// Need to convert lines and pages to pixels if we aren't already in pixels
				// There are three delta modes:
				//   * deltaMode 0 is by pixels, nothing to do
				//   * deltaMode 1 is by lines
				//   * deltaMode 2 is by pages
				if (orgEvent.deltaMode === 1) {
					var lineHeight = $.data(this, 'mousewheel-line-height');
					delta *= lineHeight;
					deltaY *= lineHeight;
					deltaX *= lineHeight;
				} else if (orgEvent.deltaMode === 2) {
					var pageHeight = $.data(this, 'mousewheel-page-height');
					delta *= pageHeight;
					deltaY *= pageHeight;
					deltaX *= pageHeight;
				}

				// Store lowest absolute delta to normalize the delta values
				absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

				if (!lowestDelta || absDelta < lowestDelta) {
					lowestDelta = absDelta;

					// Adjust older deltas if necessary
					if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
						lowestDelta /= 40;
					}
				}

				// Adjust older deltas if necessary
				if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
					// Divide all the things by 40!
					delta /= 40;
					deltaX /= 40;
					deltaY /= 40;
				}

				// Get a whole, normalized value for the deltas
				delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
				deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
				deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

				// Normalise offsetX and offsetY properties
				if (special.settings.normalizeOffset && this.getBoundingClientRect) {
					var boundingRect = this.getBoundingClientRect();
					offsetX = event.clientX - boundingRect.left;
					offsetY = event.clientY - boundingRect.top;
				}

				// Add information to the event object
				event.deltaX = deltaX;
				event.deltaY = deltaY;
				event.deltaFactor = lowestDelta;
				event.offsetX = offsetX;
				event.offsetY = offsetY;
				// Go ahead and set deltaMode to 0 since we converted to pixels
				// Although this is a little odd since we overwrite the deltaX/Y
				// properties with normalized deltas.
				event.deltaMode = 0;

				// Add event and delta to the front of the arguments
				args.unshift(event, delta, deltaX, deltaY);

				// Clearout lowestDelta after sometime to better
				// handle multiple device types that give different
				// a different lowestDelta
				// Ex: trackpad = 3 and mouse wheel = 120
				if (nullLowestDeltaTimeout) {
					clearTimeout(nullLowestDeltaTimeout);
				}
				nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

				return ($.event.dispatch || $.event.handle).apply(this, args);
			}

			function nullLowestDelta() {
				lowestDelta = null;
			}

			function shouldAdjustOldDeltas(orgEvent, absDelta) {
				// If this is an older event and the delta is divisable by 120,
				// then we are assuming that the browser is treating this as an
				// older mouse wheel event and that we should divide the deltas
				// by 40 to try and get a more usable deltaFactor.
				// Side note, this actually impacts the reported scroll distance
				// in older browsers and can cause scrolling to be slower than native.
				// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
				return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
			}

		}));

		S2.define('jquery.select2', [
			'jquery',
			'jquery-mousewheel',

			'./select2/core',
			'./select2/defaults',
			'./select2/utils'
		], function ($, _, Select2, Defaults, Utils) {
			if ($.fn.select2 == null) {
				// All methods that should return the element
				var thisMethods = ['open', 'close', 'destroy'];

				$.fn.select2 = function (options) {
					options = options || {};

					if (typeof options === 'object') {
						this.each(function () {
							var instanceOptions = $.extend(true, {}, options);

							var instance = new Select2($(this), instanceOptions);
						});

						return this;
					} else if (typeof options === 'string') {
						var ret;
						var args = Array.prototype.slice.call(arguments, 1);

						this.each(function () {
							var instance = Utils.GetData(this, 'select2');

							if (instance == null && window.console && console.error) {
								console.error(
									'The select2(\'' + options + '\') method was called on an ' +
									'element that is not using Select2.'
								);
							}

							ret = instance[options].apply(instance, args);
						});

						// Check if we should be returning `this`
						if ($.inArray(options, thisMethods) > -1) {
							return this;
						}

						return ret;
					} else {
						throw new Error('Invalid arguments for Select2: ' + options);
					}
				};
			}

			if ($.fn.select2.defaults == null) {
				$.fn.select2.defaults = Defaults;
			}

			return Select2;
		});

		// Return the AMD loader configuration so it can be used outside of this file
		return {
			define: S2.define,
			require: S2.require
		};
	}());

	// Autoload the jQuery bindings
	// We know that all of the modules exist above this, so we're safe
	var select2 = S2.require('jquery.select2');

	// Hold the AMD module references on the jQuery function that was just loaded
	// This allows Select2 to use the internal loader outside of this file, such
	// as in the language files.
	jQuery.fn.select2.amd = S2;

	// Return the Select2 instance for anyone who is importing it.
	return select2;
}));

/*!
 * Bootstrap-select v1.12.4 (https://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2017 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module unless amdModuleId is set
		define(["jquery"], function (a0) {
			return (factory(a0));
		});
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require("jquery"));
	} else {
		factory(root["jQuery"]);
	}
}(this, function (jQuery) {

	(function ($) {
		'use strict';

		//<editor-fold desc="Shims">
		if (!String.prototype.includes) {
			(function () {
				'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
				var toString = {}.toString;
				var defineProperty = (function () {
					// IE 8 only supports `Object.defineProperty` on DOM elements
					try {
						var object = {};
						var $defineProperty = Object.defineProperty;
						var result = $defineProperty(object, object, object) && $defineProperty;
					} catch (error) {}
					return result;
				}());
				var indexOf = ''.indexOf;
				var includes = function (search) {
					if (this == null) {
						throw new TypeError();
					}
					var string = String(this);
					if (search && toString.call(search) == '[object RegExp]') {
						throw new TypeError();
					}
					var stringLength = string.length;
					var searchString = String(search);
					var searchLength = searchString.length;
					var position = arguments.length > 1 ? arguments[1] : undefined;
					// `ToInteger`
					var pos = position ? Number(position) : 0;
					if (pos != pos) { // better `isNaN`
						pos = 0;
					}
					var start = Math.min(Math.max(pos, 0), stringLength);
					// Avoid the `indexOf` call if no match is possible
					if (searchLength + start > stringLength) {
						return false;
					}
					return indexOf.call(string, searchString, pos) != -1;
				};
				if (defineProperty) {
					defineProperty(String.prototype, 'includes', {
						'value': includes,
						'configurable': true,
						'writable': true
					});
				} else {
					String.prototype.includes = includes;
				}
			}());
		}

		if (!String.prototype.startsWith) {
			(function () {
				'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
				var defineProperty = (function () {
					// IE 8 only supports `Object.defineProperty` on DOM elements
					try {
						var object = {};
						var $defineProperty = Object.defineProperty;
						var result = $defineProperty(object, object, object) && $defineProperty;
					} catch (error) {}
					return result;
				}());
				var toString = {}.toString;
				var startsWith = function (search) {
					if (this == null) {
						throw new TypeError();
					}
					var string = String(this);
					if (search && toString.call(search) == '[object RegExp]') {
						throw new TypeError();
					}
					var stringLength = string.length;
					var searchString = String(search);
					var searchLength = searchString.length;
					var position = arguments.length > 1 ? arguments[1] : undefined;
					// `ToInteger`
					var pos = position ? Number(position) : 0;
					if (pos != pos) { // better `isNaN`
						pos = 0;
					}
					var start = Math.min(Math.max(pos, 0), stringLength);
					// Avoid the `indexOf` call if no match is possible
					if (searchLength + start > stringLength) {
						return false;
					}
					var index = -1;
					while (++index < searchLength) {
						if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
							return false;
						}
					}
					return true;
				};
				if (defineProperty) {
					defineProperty(String.prototype, 'startsWith', {
						'value': startsWith,
						'configurable': true,
						'writable': true
					});
				} else {
					String.prototype.startsWith = startsWith;
				}
			}());
		}

		if (!Object.keys) {
			Object.keys = function (
				o, // object
				k, // key
				r // result array
			) {
				// initialize object and result
				r = [];
				// iterate over object keys
				for (k in o)
					// fill result array with non-prototypical keys
					r.hasOwnProperty.call(o, k) && r.push(k);
				// return result
				return r;
			};
		}

		// set data-selected on select element if the value has been programmatically selected
		// prior to initialization of bootstrap-select
		// * consider removing or replacing an alternative method *
		var valHooks = {
			useDefault: false,
			_set: $.valHooks.select.set
		};

		$.valHooks.select.set = function (elem, value) {
			if (value && !valHooks.useDefault) $(elem).data('selected', true);

			return valHooks._set.apply(this, arguments);
		};

		var changed_arguments = null;

		var EventIsSupported = (function () {
			try {
				new Event('change');
				return true;
			} catch (e) {
				return false;
			}
		})();

		$.fn.triggerNative = function (eventName) {
			var el = this[0],
				event;

			if (el.dispatchEvent) { // for modern browsers & IE9+
				if (EventIsSupported) {
					// For modern browsers
					event = new Event(eventName, {
						bubbles: true
					});
				} else {
					// For IE since it doesn't support Event constructor
					event = document.createEvent('Event');
					event.initEvent(eventName, true, false);
				}

				el.dispatchEvent(event);
			} else if (el.fireEvent) { // for IE8
				event = document.createEventObject();
				event.eventType = eventName;
				el.fireEvent('on' + eventName, event);
			} else {
				// fall back to jQuery.trigger
				this.trigger(eventName);
			}
		};
		//</editor-fold>

		// Case insensitive contains search
		$.expr.pseudos.icontains = function (obj, index, meta) {
			var $obj = $(obj).find('a');
			var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
			return haystack.includes(meta[3].toUpperCase());
		};

		// Case insensitive begins search
		$.expr.pseudos.ibegins = function (obj, index, meta) {
			var $obj = $(obj).find('a');
			var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
			return haystack.startsWith(meta[3].toUpperCase());
		};

		// Case and accent insensitive contains search
		$.expr.pseudos.aicontains = function (obj, index, meta) {
			var $obj = $(obj).find('a');
			var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
			return haystack.includes(meta[3].toUpperCase());
		};

		// Case and accent insensitive begins search
		$.expr.pseudos.aibegins = function (obj, index, meta) {
			var $obj = $(obj).find('a');
			var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
			return haystack.startsWith(meta[3].toUpperCase());
		};

		/**
		 * Remove all diatrics from the given text.
		 * @access private
		 * @param {String} text
		 * @returns {String}
		 */
		function normalizeToBase(text) {
			var rExps = [{
					re: /[\xC0-\xC6]/g,
					ch: "A"
				},
				{
					re: /[\xE0-\xE6]/g,
					ch: "a"
				},
				{
					re: /[\xC8-\xCB]/g,
					ch: "E"
				},
				{
					re: /[\xE8-\xEB]/g,
					ch: "e"
				},
				{
					re: /[\xCC-\xCF]/g,
					ch: "I"
				},
				{
					re: /[\xEC-\xEF]/g,
					ch: "i"
				},
				{
					re: /[\xD2-\xD6]/g,
					ch: "O"
				},
				{
					re: /[\xF2-\xF6]/g,
					ch: "o"
				},
				{
					re: /[\xD9-\xDC]/g,
					ch: "U"
				},
				{
					re: /[\xF9-\xFC]/g,
					ch: "u"
				},
				{
					re: /[\xC7-\xE7]/g,
					ch: "c"
				},
				{
					re: /[\xD1]/g,
					ch: "N"
				},
				{
					re: /[\xF1]/g,
					ch: "n"
				}
			];
			$.each(rExps, function () {
				text = text ? text.replace(this.re, this.ch) : '';
			});
			return text;
		}


		// List of HTML entities for escaping.
		var escapeMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'`': '&#x60;'
		};

		var unescapeMap = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#x27;': "'",
			'&#x60;': '`'
		};

		// Functions for escaping and unescaping strings to/from HTML interpolation.
		var createEscaper = function (map) {
			var escaper = function (match) {
				return map[match];
			};
			// Regexes for identifying a key that needs to be escaped.
			var source = '(?:' + Object.keys(map).join('|') + ')';
			var testRegexp = RegExp(source);
			var replaceRegexp = RegExp(source, 'g');
			return function (string) {
				string = string == null ? '' : '' + string;
				return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
			};
		};

		var htmlEscape = createEscaper(escapeMap);
		var htmlUnescape = createEscaper(unescapeMap);

		var Selectpicker = function (element, options) {
			// bootstrap-select has been initialized - revert valHooks.select.set back to its original function
			if (!valHooks.useDefault) {
				$.valHooks.select.set = valHooks._set;
				valHooks.useDefault = true;
			}

			this.$element = $(element);
			this.$newElement = null;
			this.$button = null;
			this.$menu = null;
			this.$lis = null;
			this.options = options;

			// If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
			// data-attribute)
			if (this.options.title === null) {
				this.options.title = this.$element.attr('title');
			}

			// Format window padding
			var winPad = this.options.windowPadding;
			if (typeof winPad === 'number') {
				this.options.windowPadding = [winPad, winPad, winPad, winPad];
			}

			//Expose public methods
			this.val = Selectpicker.prototype.val;
			this.render = Selectpicker.prototype.render;
			this.refresh = Selectpicker.prototype.refresh;
			this.setStyle = Selectpicker.prototype.setStyle;
			this.selectAll = Selectpicker.prototype.selectAll;
			this.deselectAll = Selectpicker.prototype.deselectAll;
			this.destroy = Selectpicker.prototype.destroy;
			this.remove = Selectpicker.prototype.remove;
			this.show = Selectpicker.prototype.show;
			this.hide = Selectpicker.prototype.hide;

			this.init();
		};

		Selectpicker.VERSION = '1.12.4';

		// part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
		Selectpicker.DEFAULTS = {
			noneSelectedText: 'Nothing selected',
			noneResultsText: 'No results matched {0}',
			countSelectedText: function (numSelected, numTotal) {
				return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
			},
			maxOptionsText: function (numAll, numGroup) {
				return [
					(numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
					(numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
				];
			},
			selectAllText: 'Select All',
			deselectAllText: 'Deselect All',
			doneButton: false,
			doneButtonText: 'Close',
			multipleSeparator: ', ',
			styleBase: 'btn',
			style: 'btn-default',
			size: 'auto',
			title: null,
			selectedTextFormat: 'values',
			width: false,
			container: false,
			hideDisabled: false,
			showSubtext: false,
			showIcon: true,
			showContent: true,
			dropupAuto: true,
			header: false,
			liveSearch: false,
			liveSearchPlaceholder: null,
			liveSearchNormalize: false,
			liveSearchStyle: 'contains',
			actionsBox: false,
			iconBase: 'glyphicon',
			tickIcon: 'glyphicon-ok',
			showTick: false,
			template: {
				caret: '<span class="caret"></span>'
			},
			maxOptions: false,
			mobile: false,
			selectOnTab: false,
			dropdownAlignRight: false,
			windowPadding: 0
		};

		Selectpicker.prototype = {

			constructor: Selectpicker,

			init: function () {
				var that = this,
					id = this.$element.attr('id');

				this.$element.addClass('bs-select-hidden');

				// store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
				// allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
				this.liObj = {};
				this.multiple = this.$element.prop('multiple');
				this.autofocus = this.$element.prop('autofocus');
				this.$newElement = this.createView();
				this.$element
					.after(this.$newElement)
					.appendTo(this.$newElement);
				this.$button = this.$newElement.children('button');
				this.$menu = this.$newElement.children('.dropdown-menu');
				this.$menuInner = this.$menu.children('.inner');
				this.$searchbox = this.$menu.find('input');

				this.$element.removeClass('bs-select-hidden');

				if (this.options.dropdownAlignRight === true) this.$menu.addClass('dropdown-menu-right');

				if (typeof id !== 'undefined') {
					this.$button.attr('data-id', id);
					$('label[for="' + id + '"]').click(function (e) {
						e.preventDefault();
						that.$button.focus();
					});
				}

				this.checkDisabled();
				this.clickListener();
				if (this.options.liveSearch) this.liveSearchListener();
				this.render();
				this.setStyle();
				this.setWidth();
				if (this.options.container) this.selectPosition();
				this.$menu.data('this', this);
				this.$newElement.data('this', this);
				if (this.options.mobile) this.mobile();

				this.$newElement.on({
					'hide.bs.dropdown': function (e) {
						that.$menuInner.attr('aria-expanded', false);
						that.$element.trigger('hide.bs.select', e);
					},
					'hidden.bs.dropdown': function (e) {
						that.$element.trigger('hidden.bs.select', e);
					},
					'show.bs.dropdown': function (e) {
						that.$menuInner.attr('aria-expanded', true);
						that.$element.trigger('show.bs.select', e);
					},
					'shown.bs.dropdown': function (e) {
						that.$element.trigger('shown.bs.select', e);
					}
				});

				if (that.$element[0].hasAttribute('required')) {
					this.$element.on('invalid', function () {
						that.$button.addClass('bs-invalid');

						that.$element.on({
							'focus.bs.select': function () {
								that.$button.focus();
								that.$element.off('focus.bs.select');
							},
							'shown.bs.select': function () {
								that.$element
									.val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
									.off('shown.bs.select');
							},
							'rendered.bs.select': function () {
								// if select is no longer invalid, remove the bs-invalid class
								if (this.validity.valid) that.$button.removeClass('bs-invalid');
								that.$element.off('rendered.bs.select');
							}
						});

						that.$button.on('blur.bs.select', function () {
							that.$element.focus().blur();
							that.$button.off('blur.bs.select');
						});
					});
				}

				setTimeout(function () {
					that.$element.trigger('loaded.bs.select');
				});
			},

			createDropdown: function () {
				// Options
				// If we are multiple or showTick option is set, then add the show-tick class
				var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
					inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
					autofocus = this.autofocus ? ' autofocus' : '';
				// Elements
				var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
				var searchbox = this.options.liveSearch ?
					'<div class="bs-searchbox">' +
					'<input type="text" class="form-control" autocomplete="off"' +
					(null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search">' +
					'</div>' :
					'';
				var actionsbox = this.multiple && this.options.actionsBox ?
					'<div class="bs-actionsbox">' +
					'<div class="btn-group btn-group-sm btn-block">' +
					'<button type="button" class="actions-btn bs-select-all btn btn-default">' +
					this.options.selectAllText +
					'</button>' +
					'<button type="button" class="actions-btn bs-deselect-all btn btn-default">' +
					this.options.deselectAllText +
					'</button>' +
					'</div>' +
					'</div>' :
					'';
				var donebutton = this.multiple && this.options.doneButton ?
					'<div class="bs-donebutton">' +
					'<div class="btn-group btn-block">' +
					'<button type="button" class="btn btn-sm btn-default">' +
					this.options.doneButtonText +
					'</button>' +
					'</div>' +
					'</div>' :
					'';
				var drop =
					'<div class="btn-group bootstrap-select' + showTick + inputGroup + '">' +
					'<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button">' +
					'<span class="filter-option pull-left"></span>&nbsp;' +
					'<span class="bs-caret">' +
					this.options.template.caret +
					'</span>' +
					'</button>' +
					'<div class="dropdown-menu open" role="combobox">' +
					header +
					searchbox +
					actionsbox +
					'<ul class="dropdown-menu inner" role="listbox" aria-expanded="false">' +
					'</ul>' +
					donebutton +
					'</div>' +
					'</div>';

				return $(drop);
			},

			createView: function () {
				var $drop = this.createDropdown(),
					li = this.createLi();

				$drop.find('ul')[0].innerHTML = li;
				return $drop;
			},

			reloadLi: function () {
				// rebuild
				var li = this.createLi();
				this.$menuInner[0].innerHTML = li;
			},

			createLi: function () {
				var that = this,
					_li = [],
					optID = 0,
					titleOption = document.createElement('option'),
					liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

				// Helper functions
				/**
				 * @param content
				 * @param [index]
				 * @param [classes]
				 * @param [optgroup]
				 * @returns {string}
				 */
				var generateLI = function (content, index, classes, optgroup) {
					return '<li' +
						((typeof classes !== 'undefined' && '' !== classes) ? ' class="' + classes + '"' : '') +
						((typeof index !== 'undefined' && null !== index) ? ' data-original-index="' + index + '"' : '') +
						((typeof optgroup !== 'undefined' && null !== optgroup) ? 'data-optgroup="' + optgroup + '"' : '') +
						'>' + content + '</li>';
				};

				/**
				 * @param text
				 * @param [classes]
				 * @param [inline]
				 * @param [tokens]
				 * @returns {string}
				 */
				var generateA = function (text, classes, inline, tokens) {
					return '<a tabindex="0"' +
						(typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
						(inline ? ' style="' + inline + '"' : '') +
						(that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape($(text).html())) + '"' : '') +
						(typeof tokens !== 'undefined' || tokens !== null ? ' data-tokens="' + tokens + '"' : '') +
						' role="option">' + text +
						'<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' +
						'</a>';
				};

				if (this.options.title && !this.multiple) {
					// this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
					// since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
					liIndex--;

					if (!this.$element.find('.bs-title-option').length) {
						// Use native JS to prepend option (faster)
						var element = this.$element[0];
						titleOption.className = 'bs-title-option';
						titleOption.innerHTML = this.options.title;
						titleOption.value = '';
						element.insertBefore(titleOption, element.firstChild);
						// Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
						// the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
						// if so, the select will have the data-selected attribute
						var $opt = $(element.options[element.selectedIndex]);
						if ($opt.attr('selected') === undefined && this.$element.data('selected') === undefined) {
							titleOption.selected = true;
						}
					}
				}

				var $selectOptions = this.$element.find('option');

				$selectOptions.each(function (index) {
					var $this = $(this);

					liIndex++;

					if ($this.hasClass('bs-title-option')) return;

					// Get the class and text for the option
					var optionClass = this.className || '',
						inline = htmlEscape(this.style.cssText),
						text = $this.data('content') ? $this.data('content') : $this.html(),
						tokens = $this.data('tokens') ? $this.data('tokens') : null,
						subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.data('subtext') + '</small>' : '',
						icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
						$parent = $this.parent(),
						isOptgroup = $parent[0].tagName === 'OPTGROUP',
						isOptgroupDisabled = isOptgroup && $parent[0].disabled,
						isDisabled = this.disabled || isOptgroupDisabled,
						prevHiddenIndex;

					if (icon !== '' && isDisabled) {
						icon = '<span>' + icon + '</span>';
					}

					if (that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) {
						// set prevHiddenIndex - the index of the first hidden option in a group of hidden options
						// used to determine whether or not a divider should be placed after an optgroup if there are
						// hidden options between the optgroup and the first visible option
						prevHiddenIndex = $this.data('prevHiddenIndex');
						$this.next().data('prevHiddenIndex', (prevHiddenIndex !== undefined ? prevHiddenIndex : index));

						liIndex--;
						return;
					}

					if (!$this.data('content')) {
						// Prepend any icon and append any subtext to the main text.
						text = icon + '<span class="text">' + text + subtext + '</span>';
					}

					if (isOptgroup && $this.data('divider') !== true) {
						if (that.options.hideDisabled && isDisabled) {
							if ($parent.data('allOptionsDisabled') === undefined) {
								var $options = $parent.children();
								$parent.data('allOptionsDisabled', $options.filter(':disabled').length === $options.length);
							}

							if ($parent.data('allOptionsDisabled')) {
								liIndex--;
								return;
							}
						}

						var optGroupClass = ' ' + $parent[0].className || '';

						if ($this.index() === 0) { // Is it the first option of the optgroup?
							optID += 1;

							// Get the opt group label
							var label = $parent[0].label,
								labelSubtext = typeof $parent.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $parent.data('subtext') + '</small>' : '',
								labelIcon = $parent.data('icon') ? '<span class="' + that.options.iconBase + ' ' + $parent.data('icon') + '"></span> ' : '';

							label = labelIcon + '<span class="text">' + htmlEscape(label) + labelSubtext + '</span>';

							if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
								liIndex++;
								_li.push(generateLI('', null, 'divider', optID + 'div'));
							}
							liIndex++;
							_li.push(generateLI(label, null, 'dropdown-header' + optGroupClass, optID));
						}

						if (that.options.hideDisabled && isDisabled) {
							liIndex--;
							return;
						}

						_li.push(generateLI(generateA(text, 'opt ' + optionClass + optGroupClass, inline, tokens), index, '', optID));
					} else if ($this.data('divider') === true) {
						_li.push(generateLI('', index, 'divider'));
					} else if ($this.data('hidden') === true) {
						// set prevHiddenIndex - the index of the first hidden option in a group of hidden options
						// used to determine whether or not a divider should be placed after an optgroup if there are
						// hidden options between the optgroup and the first visible option
						prevHiddenIndex = $this.data('prevHiddenIndex');
						$this.next().data('prevHiddenIndex', (prevHiddenIndex !== undefined ? prevHiddenIndex : index));

						_li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
					} else {
						var showDivider = this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP';

						// if previous element is not an optgroup and hideDisabled is true
						if (!showDivider && that.options.hideDisabled) {
							prevHiddenIndex = $this.data('prevHiddenIndex');

							if (prevHiddenIndex !== undefined) {
								// select the element **before** the first hidden element in the group
								var prevHidden = $selectOptions.eq(prevHiddenIndex)[0].previousElementSibling;

								if (prevHidden && prevHidden.tagName === 'OPTGROUP' && !prevHidden.disabled) {
									showDivider = true;
								}
							}
						}

						if (showDivider) {
							liIndex++;
							_li.push(generateLI('', null, 'divider', optID + 'div'));
						}
						_li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
					}

					that.liObj[index] = liIndex;
				});

				//If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
				if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
					this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
				}

				return _li.join('');
			},

			findLis: function () {
				if (this.$lis == null) this.$lis = this.$menu.find('li');
				return this.$lis;
			},

			/**
			 * @param [updateLi] defaults to true
			 */
			render: function (updateLi) {
				var that = this,
					notDisabled,
					$selectOptions = this.$element.find('option');

				//Update the LI to match the SELECT
				if (updateLi !== false) {
					$selectOptions.each(function (index) {
						var $lis = that.findLis().eq(that.liObj[index]);

						that.setDisabled(index, this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled, $lis);
						that.setSelected(index, this.selected, $lis);
					});
				}

				this.togglePlaceholder();

				this.tabIndex();

				var selectedItems = $selectOptions.map(function () {
					if (this.selected) {
						if (that.options.hideDisabled && (this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled)) return;

						var $this = $(this),
							icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '',
							subtext;

						if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
							subtext = ' <small class="text-muted">' + $this.data('subtext') + '</small>';
						} else {
							subtext = '';
						}
						if (typeof $this.attr('title') !== 'undefined') {
							return $this.attr('title');
						} else if ($this.data('content') && that.options.showContent) {
							return $this.data('content').toString();
						} else {
							return icon + $this.html() + subtext;
						}
					}
				}).toArray();

				//Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
				//Convert all the values into a comma delimited string
				var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

				//If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
				if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
					var max = this.options.selectedTextFormat.split('>');
					if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
						notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
						var totalCount = $selectOptions.not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
							tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
						title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
					}
				}

				if (this.options.title == undefined) {
					this.options.title = this.$element.attr('title');
				}

				if (this.options.selectedTextFormat == 'static') {
					title = this.options.title;
				}

				//If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
				if (!title) {
					title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
				}

				//strip all HTML tags and trim the result, then unescape any escaped tags
				this.$button.attr('title', htmlUnescape($.trim(title.replace(/<[^>]*>?/g, ''))));
				this.$button.children('.filter-option').html(title);

				this.$element.trigger('rendered.bs.select');
			},

			/**
			 * @param [style]
			 * @param [status]
			 */
			setStyle: function (style, status) {
				if (this.$element.attr('class')) {
					this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
				}

				var buttonClass = style ? style : this.options.style;

				if (status == 'add') {
					this.$button.addClass(buttonClass);
				} else if (status == 'remove') {
					this.$button.removeClass(buttonClass);
				} else {
					this.$button.removeClass(this.options.style);
					this.$button.addClass(buttonClass);
				}
			},

			liHeight: function (refresh) {
				if (!refresh && (this.options.size === false || this.sizeInfo)) return;

				var newElement = document.createElement('div'),
					menu = document.createElement('div'),
					menuInner = document.createElement('ul'),
					divider = document.createElement('li'),
					li = document.createElement('li'),
					a = document.createElement('a'),
					text = document.createElement('span'),
					header = this.options.header && this.$menu.find('.popover-title').length > 0 ? this.$menu.find('.popover-title')[0].cloneNode(true) : null,
					search = this.options.liveSearch ? document.createElement('div') : null,
					actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
					doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

				text.className = 'text';
				newElement.className = this.$menu[0].parentNode.className + ' open';
				menu.className = 'dropdown-menu open';
				menuInner.className = 'dropdown-menu inner';
				divider.className = 'divider';

				text.appendChild(document.createTextNode('Inner text'));
				a.appendChild(text);
				li.appendChild(a);
				menuInner.appendChild(li);
				menuInner.appendChild(divider);
				if (header) menu.appendChild(header);
				if (search) {
					var input = document.createElement('input');
					search.className = 'bs-searchbox';
					input.className = 'form-control';
					search.appendChild(input);
					menu.appendChild(search);
				}
				if (actions) menu.appendChild(actions);
				menu.appendChild(menuInner);
				if (doneButton) menu.appendChild(doneButton);
				newElement.appendChild(menu);

				document.body.appendChild(newElement);

				var liHeight = a.offsetHeight,
					headerHeight = header ? header.offsetHeight : 0,
					searchHeight = search ? search.offsetHeight : 0,
					actionsHeight = actions ? actions.offsetHeight : 0,
					doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
					dividerHeight = $(divider).outerHeight(true),
					// fall back to jQuery if getComputedStyle is not supported
					menuStyle = typeof getComputedStyle === 'function' ? getComputedStyle(menu) : false,
					$menu = menuStyle ? null : $(menu),
					menuPadding = {
						vert: parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
							parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
							parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
							parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
						horiz: parseInt(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) +
							parseInt(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) +
							parseInt(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) +
							parseInt(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
					},
					menuExtras = {
						vert: menuPadding.vert +
							parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
							parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
						horiz: menuPadding.horiz +
							parseInt(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) +
							parseInt(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
					}

				document.body.removeChild(newElement);

				this.sizeInfo = {
					liHeight: liHeight,
					headerHeight: headerHeight,
					searchHeight: searchHeight,
					actionsHeight: actionsHeight,
					doneButtonHeight: doneButtonHeight,
					dividerHeight: dividerHeight,
					menuPadding: menuPadding,
					menuExtras: menuExtras
				};
			},

			setSize: function () {
				this.findLis();
				this.liHeight();

				if (this.options.header) this.$menu.css('padding-top', 0);
				if (this.options.size === false) return;

				var that = this,
					$menu = this.$menu,
					$menuInner = this.$menuInner,
					$window = $(window),
					selectHeight = this.$newElement[0].offsetHeight,
					selectWidth = this.$newElement[0].offsetWidth,
					liHeight = this.sizeInfo['liHeight'],
					headerHeight = this.sizeInfo['headerHeight'],
					searchHeight = this.sizeInfo['searchHeight'],
					actionsHeight = this.sizeInfo['actionsHeight'],
					doneButtonHeight = this.sizeInfo['doneButtonHeight'],
					divHeight = this.sizeInfo['dividerHeight'],
					menuPadding = this.sizeInfo['menuPadding'],
					menuExtras = this.sizeInfo['menuExtras'],
					notDisabled = this.options.hideDisabled ? '.disabled' : '',
					menuHeight,
					menuWidth,
					getHeight,
					getWidth,
					selectOffsetTop,
					selectOffsetBot,
					selectOffsetLeft,
					selectOffsetRight,
					getPos = function () {
						var pos = that.$newElement.offset(),
							$container = $(that.options.container),
							containerPos;

						if (that.options.container && !$container.is('body')) {
							containerPos = $container.offset();
							containerPos.top += parseInt($container.css('borderTopWidth'));
							containerPos.left += parseInt($container.css('borderLeftWidth'));
						} else {
							containerPos = {
								top: 0,
								left: 0
							};
						}

						var winPad = that.options.windowPadding;
						selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
						selectOffsetBot = $window.height() - selectOffsetTop - selectHeight - containerPos.top - winPad[2];
						selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
						selectOffsetRight = $window.width() - selectOffsetLeft - selectWidth - containerPos.left - winPad[1];
						selectOffsetTop -= winPad[0];
						selectOffsetLeft -= winPad[3];
					};

				getPos();

				if (this.options.size === 'auto') {
					var getSize = function () {
						var minHeight,
							hasClass = function (className, include) {
								return function (element) {
									if (include) {
										return (element.classList ? element.classList.contains(className) : $(element).hasClass(className));
									} else {
										return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
									}
								};
							},
							lis = that.$menuInner[0].getElementsByTagName('li'),
							lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden'),
							optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

						getPos();
						menuHeight = selectOffsetBot - menuExtras.vert;
						menuWidth = selectOffsetRight - menuExtras.horiz;

						if (that.options.container) {
							if (!$menu.data('height')) $menu.data('height', $menu.height());
							getHeight = $menu.data('height');

							if (!$menu.data('width')) $menu.data('width', $menu.width());
							getWidth = $menu.data('width');
						} else {
							getHeight = $menu.height();
							getWidth = $menu.width();
						}

						if (that.options.dropupAuto) {
							that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras.vert) < getHeight);
						}

						if (that.$newElement.hasClass('dropup')) {
							menuHeight = selectOffsetTop - menuExtras.vert;
						}

						if (that.options.dropdownAlignRight === 'auto') {
							$menu.toggleClass('dropdown-menu-right', selectOffsetLeft > selectOffsetRight && (menuWidth - menuExtras.horiz) < (getWidth - selectWidth));
						}

						if ((lisVisible.length + optGroup.length) > 3) {
							minHeight = liHeight * 3 + menuExtras.vert - 2;
						} else {
							minHeight = 0;
						}

						$menu.css({
							'max-height': menuHeight + 'px',
							'overflow': 'hidden',
							'min-height': minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px'
						});
						$menuInner.css({
							'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert + 'px',
							'overflow-y': 'auto',
							'min-height': Math.max(minHeight - menuPadding.vert, 0) + 'px'
						});
					};
					getSize();
					this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
					$window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
				} else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
					var optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
						divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
					menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;

					if (that.options.container) {
						if (!$menu.data('height')) $menu.data('height', $menu.height());
						getHeight = $menu.data('height');
					} else {
						getHeight = $menu.height();
					}

					if (that.options.dropupAuto) {
						//noinspection JSUnusedAssignment
						this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras.vert) < getHeight);
					}
					$menu.css({
						'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px',
						'overflow': 'hidden',
						'min-height': ''
					});
					$menuInner.css({
						'max-height': menuHeight - menuPadding.vert + 'px',
						'overflow-y': 'auto',
						'min-height': ''
					});
				}
			},

			setWidth: function () {
				if (this.options.width === 'auto') {
					this.$menu.css('min-width', '0');

					// Get correct width if element is hidden
					var $selectClone = this.$menu.parent().clone().appendTo('body'),
						$selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone,
						ulWidth = $selectClone.children('.dropdown-menu').outerWidth(),
						btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

					$selectClone.remove();
					$selectClone2.remove();

					// Set width to whatever's larger, button title or longest option
					this.$newElement.css('width', Math.max(ulWidth, btnWidth) + 'px');
				} else if (this.options.width === 'fit') {
					// Remove inline min-width so width can be changed from 'auto'
					this.$menu.css('min-width', '');
					this.$newElement.css('width', '').addClass('fit-width');
				} else if (this.options.width) {
					// Remove inline min-width so width can be changed from 'auto'
					this.$menu.css('min-width', '');
					this.$newElement.css('width', this.options.width);
				} else {
					// Remove inline min-width/width so width can be changed
					this.$menu.css('min-width', '');
					this.$newElement.css('width', '');
				}
				// Remove fit-width class if width is changed programmatically
				if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
					this.$newElement.removeClass('fit-width');
				}
			},

			selectPosition: function () {
				this.$bsContainer = $('<div class="bs-container" />');

				var that = this,
					$container = $(this.options.container),
					pos,
					containerPos,
					actualHeight,
					getPlacement = function ($element) {
						that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
						pos = $element.offset();

						if (!$container.is('body')) {
							containerPos = $container.offset();
							containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
							containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
						} else {
							containerPos = {
								top: 0,
								left: 0
							};
						}

						actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;

						that.$bsContainer.css({
							'top': pos.top - containerPos.top + actualHeight,
							'left': pos.left - containerPos.left,
							'width': $element[0].offsetWidth
						});
					};

				this.$button.on('click', function () {
					var $this = $(this);

					if (that.isDisabled()) {
						return;
					}

					getPlacement(that.$newElement);

					that.$bsContainer
						.appendTo(that.options.container)
						.toggleClass('open', !$this.hasClass('open'))
						.append(that.$menu);
				});

				$(window).on('resize scroll', function () {
					getPlacement(that.$newElement);
				});

				this.$element.on('hide.bs.select', function () {
					that.$menu.data('height', that.$menu.height());
					that.$bsContainer.detach();
				});
			},

			/**
			 * @param {number} index - the index of the option that is being changed
			 * @param {boolean} selected - true if the option is being selected, false if being deselected
			 * @param {JQuery} $lis - the 'li' element that is being modified
			 */
			setSelected: function (index, selected, $lis) {
				if (!$lis) {
					this.togglePlaceholder(); // check if setSelected is being called by changing the value of the select
					$lis = this.findLis().eq(this.liObj[index]);
				}

				$lis.toggleClass('selected', selected).find('a').attr('aria-selected', selected);
			},

			/**
			 * @param {number} index - the index of the option that is being disabled
			 * @param {boolean} disabled - true if the option is being disabled, false if being enabled
			 * @param {JQuery} $lis - the 'li' element that is being modified
			 */
			setDisabled: function (index, disabled, $lis) {
				if (!$lis) {
					$lis = this.findLis().eq(this.liObj[index]);
				}

				if (disabled) {
					$lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1).attr('aria-disabled', true);
				} else {
					$lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0).attr('aria-disabled', false);
				}
			},

			isDisabled: function () {
				return this.$element[0].disabled;
			},

			checkDisabled: function () {
				var that = this;

				if (this.isDisabled()) {
					this.$newElement.addClass('disabled');
					this.$button.addClass('disabled').attr('tabindex', -1).attr('aria-disabled', true);
				} else {
					if (this.$button.hasClass('disabled')) {
						this.$newElement.removeClass('disabled');
						this.$button.removeClass('disabled').attr('aria-disabled', false);
					}

					if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
						this.$button.removeAttr('tabindex');
					}
				}

				this.$button.click(function () {
					return !that.isDisabled();
				});
			},

			togglePlaceholder: function () {
				var value = this.$element.val();
				this.$button.toggleClass('bs-placeholder', value === null || value === '' || (value.constructor === Array && value.length === 0));
			},

			tabIndex: function () {
				if (this.$element.data('tabindex') !== this.$element.attr('tabindex') &&
					(this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
					this.$element.data('tabindex', this.$element.attr('tabindex'));
					this.$button.attr('tabindex', this.$element.data('tabindex'));
				}

				this.$element.attr('tabindex', -98);
			},

			clickListener: function () {
				var that = this,
					$document = $(document);

				$document.data('spaceSelect', false);

				this.$button.on('keyup', function (e) {
					if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
						e.preventDefault();
						$document.data('spaceSelect', false);
					}
				});

				this.$button.on('click', function () {
					that.setSize();
				});

				this.$element.on('shown.bs.select', function () {
					if (!that.options.liveSearch && !that.multiple) {
						that.$menuInner.find('.selected a').focus();
					} else if (!that.multiple) {
						var selectedIndex = that.liObj[that.$element[0].selectedIndex];

						if (typeof selectedIndex !== 'number' || that.options.size === false) return;

						// scroll to selected option
						var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
						offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
						that.$menuInner[0].scrollTop = offset;
					}
				});

				this.$menuInner.on('click', 'li a', function (e) {
					var $this = $(this),
						clickedIndex = $this.parent().data('originalIndex'),
						prevValue = that.$element.val(),
						prevIndex = that.$element.prop('selectedIndex'),
						triggerChange = true;

					// Don't close on multi choice menu
					if (that.multiple && that.options.maxOptions !== 1) {
						e.stopPropagation();
					}

					e.preventDefault();

					//Don't run if we have been disabled
					if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
						var $options = that.$element.find('option'),
							$option = $options.eq(clickedIndex),
							state = $option.prop('selected'),
							$optgroup = $option.parent('optgroup'),
							maxOptions = that.options.maxOptions,
							maxOptionsGrp = $optgroup.data('maxOptions') || false;

						if (!that.multiple) { // Deselect all others if not multi select box
							$options.prop('selected', false);
							$option.prop('selected', true);
							that.$menuInner.find('.selected').removeClass('selected').find('a').attr('aria-selected', false);
							that.setSelected(clickedIndex, true);
						} else { // Toggle the one we have chosen if we are multi select.
							$option.prop('selected', !state);
							that.setSelected(clickedIndex, !state);
							$this.blur();

							if (maxOptions !== false || maxOptionsGrp !== false) {
								var maxReached = maxOptions < $options.filter(':selected').length,
									maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

								if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
									if (maxOptions && maxOptions == 1) {
										$options.prop('selected', false);
										$option.prop('selected', true);
										that.$menuInner.find('.selected').removeClass('selected');
										that.setSelected(clickedIndex, true);
									} else if (maxOptionsGrp && maxOptionsGrp == 1) {
										$optgroup.find('option:selected').prop('selected', false);
										$option.prop('selected', true);
										var optgroupID = $this.parent().data('optgroup');
										that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass('selected');
										that.setSelected(clickedIndex, true);
									} else {
										var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
											maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
											maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
											maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
											$notify = $('<div class="notify"></div>');
										// If {var} is set in array, replace it
										/** @deprecated */
										if (maxOptionsArr[2]) {
											maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
											maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
										}

										$option.prop('selected', false);

										that.$menu.append($notify);

										if (maxOptions && maxReached) {
											$notify.append($('<div>' + maxTxt + '</div>'));
											triggerChange = false;
											that.$element.trigger('maxReached.bs.select');
										}

										if (maxOptionsGrp && maxReachedGrp) {
											$notify.append($('<div>' + maxTxtGrp + '</div>'));
											triggerChange = false;
											that.$element.trigger('maxReachedGrp.bs.select');
										}

										setTimeout(function () {
											that.setSelected(clickedIndex, false);
										}, 10);

										$notify.delay(750).fadeOut(300, function () {
											$(this).remove();
										});
									}
								}
							}
						}

						if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
							that.$button.focus();
						} else if (that.options.liveSearch) {
							that.$searchbox.focus();
						}

						// Trigger select 'change'
						if (triggerChange) {
							if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
								// $option.prop('selected') is current option state (selected/unselected). state is previous option state.
								changed_arguments = [clickedIndex, $option.prop('selected'), state];
								that.$element
									.triggerNative('change');
							}
						}
					}
				});

				this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
					if (e.currentTarget == this) {
						e.preventDefault();
						e.stopPropagation();
						if (that.options.liveSearch && !$(e.target).hasClass('close')) {
							that.$searchbox.focus();
						} else {
							that.$button.focus();
						}
					}
				});

				this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
					e.preventDefault();
					e.stopPropagation();
					if (that.options.liveSearch) {
						that.$searchbox.focus();
					} else {
						that.$button.focus();
					}
				});

				this.$menu.on('click', '.popover-title .close', function () {
					that.$button.click();
				});

				this.$searchbox.on('click', function (e) {
					e.stopPropagation();
				});

				this.$menu.on('click', '.actions-btn', function (e) {
					if (that.options.liveSearch) {
						that.$searchbox.focus();
					} else {
						that.$button.focus();
					}

					e.preventDefault();
					e.stopPropagation();

					if ($(this).hasClass('bs-select-all')) {
						that.selectAll();
					} else {
						that.deselectAll();
					}
				});

				this.$element.change(function () {
					that.render(false);
					that.$element.trigger('changed.bs.select', changed_arguments);
					changed_arguments = null;
				});
			},

			liveSearchListener: function () {
				var that = this,
					$no_results = $('<li class="no-results"></li>');

				this.$button.on('click.dropdown.data-api', function () {
					that.$menuInner.find('.active').removeClass('active');
					if (!!that.$searchbox.val()) {
						that.$searchbox.val('');
						that.$lis.not('.is-hidden').removeClass('hidden');
						if (!!$no_results.parent().length) $no_results.remove();
					}
					if (!that.multiple) that.$menuInner.find('.selected').addClass('active');
					setTimeout(function () {
						that.$searchbox.focus();
					}, 10);
				});

				this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
					e.stopPropagation();
				});

				this.$searchbox.on('input propertychange', function () {
					that.$lis.not('.is-hidden').removeClass('hidden');
					that.$lis.filter('.active').removeClass('active');
					$no_results.remove();

					if (that.$searchbox.val()) {
						var $searchBase = that.$lis.not('.is-hidden, .divider, .dropdown-header'),
							$hideItems;
						if (that.options.liveSearchNormalize) {
							$hideItems = $searchBase.not(':a' + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")');
						} else {
							$hideItems = $searchBase.not(':' + that._searchStyle() + '("' + that.$searchbox.val() + '")');
						}

						if ($hideItems.length === $searchBase.length) {
							$no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"'));
							that.$menuInner.append($no_results);
							that.$lis.addClass('hidden');
						} else {
							$hideItems.addClass('hidden');

							var $lisVisible = that.$lis.not('.hidden'),
								$foundDiv;

							// hide divider if first or last visible, or if followed by another divider
							$lisVisible.each(function (index) {
								var $this = $(this);

								if ($this.hasClass('divider')) {
									if ($foundDiv === undefined) {
										$this.addClass('hidden');
									} else {
										if ($foundDiv) $foundDiv.addClass('hidden');
										$foundDiv = $this;
									}
								} else if ($this.hasClass('dropdown-header') && $lisVisible.eq(index + 1).data('optgroup') !== $this.data('optgroup')) {
									$this.addClass('hidden');
								} else {
									$foundDiv = null;
								}
							});
							if ($foundDiv) $foundDiv.addClass('hidden');

							$searchBase.not('.hidden').first().addClass('active');
							that.$menuInner.scrollTop(0);
						}
					}
				});
			},

			_searchStyle: function () {
				var styles = {
					begins: 'ibegins',
					startsWith: 'ibegins'
				};

				return styles[this.options.liveSearchStyle] || 'icontains';
			},

			val: function (value) {
				if (typeof value !== 'undefined') {
					this.$element.val(value);
					this.render();

					return this.$element;
				} else {
					return this.$element.val();
				}
			},

			changeAll: function (status) {
				if (!this.multiple) return;
				if (typeof status === 'undefined') status = true;

				this.findLis();

				var $options = this.$element.find('option'),
					$lisVisible = this.$lis.not('.divider, .dropdown-header, .disabled, .hidden'),
					lisVisLen = $lisVisible.length,
					selectedOptions = [];

				if (status) {
					if ($lisVisible.filter('.selected').length === $lisVisible.length) return;
				} else {
					if ($lisVisible.filter('.selected').length === 0) return;
				}

				$lisVisible.toggleClass('selected', status);

				for (var i = 0; i < lisVisLen; i++) {
					var origIndex = $lisVisible[i].getAttribute('data-original-index');
					selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
				}

				$(selectedOptions).prop('selected', status);

				this.render(false);

				this.togglePlaceholder();

				this.$element
					.triggerNative('change');
			},

			selectAll: function () {
				return this.changeAll(true);
			},

			deselectAll: function () {
				return this.changeAll(false);
			},

			toggle: function (e) {
				e = e || window.event;

				if (e) e.stopPropagation();

				this.$button.trigger('click');
			},

			keydown: function (e) {
				var $this = $(this),
					$parent = $this.is('input') ? $this.parent().parent() : $this.parent(),
					$items,
					that = $parent.data('this'),
					index,
					prevIndex,
					isActive,
					selector = ':not(.disabled, .hidden, .dropdown-header, .divider)',
					keyCodeMap = {
						32: ' ',
						48: '0',
						49: '1',
						50: '2',
						51: '3',
						52: '4',
						53: '5',
						54: '6',
						55: '7',
						56: '8',
						57: '9',
						59: ';',
						65: 'a',
						66: 'b',
						67: 'c',
						68: 'd',
						69: 'e',
						70: 'f',
						71: 'g',
						72: 'h',
						73: 'i',
						74: 'j',
						75: 'k',
						76: 'l',
						77: 'm',
						78: 'n',
						79: 'o',
						80: 'p',
						81: 'q',
						82: 'r',
						83: 's',
						84: 't',
						85: 'u',
						86: 'v',
						87: 'w',
						88: 'x',
						89: 'y',
						90: 'z',
						96: '0',
						97: '1',
						98: '2',
						99: '3',
						100: '4',
						101: '5',
						102: '6',
						103: '7',
						104: '8',
						105: '9'
					};


				isActive = that.$newElement.hasClass('open');

				if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
					if (!that.options.container) {
						that.setSize();
						that.$menu.parent().addClass('open');
						isActive = true;
					} else {
						that.$button.trigger('click');
					}
					that.$searchbox.focus();
					return;
				}

				if (that.options.liveSearch) {
					if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive) {
						e.preventDefault();
						e.stopPropagation();
						that.$menuInner.click();
						that.$button.focus();
					}
				}

				if (/(38|40)/.test(e.keyCode.toString(10))) {
					$items = that.$lis.filter(selector);
					if (!$items.length) return;

					if (!that.options.liveSearch) {
						index = $items.index($items.find('a').filter(':focus').parent());
					} else {
						index = $items.index($items.filter('.active'));
					}

					prevIndex = that.$menuInner.data('prevIndex');

					if (e.keyCode == 38) {
						if ((that.options.liveSearch || index == prevIndex) && index != -1) index--;
						if (index < 0) index += $items.length;
					} else if (e.keyCode == 40) {
						if (that.options.liveSearch || index == prevIndex) index++;
						index = index % $items.length;
					}

					that.$menuInner.data('prevIndex', index);

					if (!that.options.liveSearch) {
						$items.eq(index).children('a').focus();
					} else {
						e.preventDefault();
						if (!$this.hasClass('dropdown-toggle')) {
							$items.removeClass('active').eq(index).addClass('active').children('a').focus();
							$this.focus();
						}
					}

				} else if (!$this.is('input')) {
					var keyIndex = [],
						count,
						prevKey;

					$items = that.$lis.filter(selector);
					$items.each(function (i) {
						if ($.trim($(this).children('a').text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
							keyIndex.push(i);
						}
					});

					count = $(document).data('keycount');
					count++;
					$(document).data('keycount', count);

					prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

					if (prevKey != keyCodeMap[e.keyCode]) {
						count = 1;
						$(document).data('keycount', count);
					} else if (count >= keyIndex.length) {
						$(document).data('keycount', 0);
						if (count > keyIndex.length) count = 1;
					}

					$items.eq(keyIndex[count - 1]).children('a').focus();
				}

				// Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
				if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
					if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
					if (!that.options.liveSearch) {
						var elem = $(':focus');
						elem.click();
						// Bring back focus for multiselects
						elem.focus();
						// Prevent screen from scrolling if the user hit the spacebar
						e.preventDefault();
						// Fixes spacebar selection of dropdown items in FF & IE
						$(document).data('spaceSelect', true);
					} else if (!/(32)/.test(e.keyCode.toString(10))) {
						that.$menuInner.find('.active a').click();
						$this.focus();
					}
					$(document).data('keycount', 0);
				}

				if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
					that.$menu.parent().removeClass('open');
					if (that.options.container) that.$newElement.removeClass('open');
					that.$button.focus();
				}
			},

			mobile: function () {
				this.$element.addClass('mobile-device');
			},

			refresh: function () {
				this.$lis = null;
				this.liObj = {};
				this.reloadLi();
				this.render();
				this.checkDisabled();
				this.liHeight(true);
				this.setStyle();
				this.setWidth();
				if (this.$lis) this.$searchbox.trigger('propertychange');

				this.$element.trigger('refreshed.bs.select');
			},

			hide: function () {
				this.$newElement.hide();
			},

			show: function () {
				this.$newElement.show();
			},

			remove: function () {
				this.$newElement.remove();
				this.$element.remove();
			},

			destroy: function () {
				this.$newElement.before(this.$element).remove();

				if (this.$bsContainer) {
					this.$bsContainer.remove();
				} else {
					this.$menu.remove();
				}

				this.$element
					.off('.bs.select')
					.removeData('selectpicker')
					.removeClass('bs-select-hidden selectpicker');
			}
		};

		// SELECTPICKER PLUGIN DEFINITION
		// ==============================
		function Plugin(option) {
			// get the args of the outer function..
			var args = arguments;
			// The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
			// to get lost/corrupted in android 2.3 and IE9 #715 #775
			var _option = option;

			[].shift.apply(args);

			var value;
			var chain = this.each(function () {
				var $this = $(this);
				if ($this.is('select')) {
					var data = $this.data('selectpicker'),
						options = typeof _option == 'object' && _option;

					if (!data) {
						var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
						config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), $this.data().template, options.template);
						$this.data('selectpicker', (data = new Selectpicker(this, config)));
					} else if (options) {
						for (var i in options) {
							if (options.hasOwnProperty(i)) {
								data.options[i] = options[i];
							}
						}
					}

					if (typeof _option == 'string') {
						if (data[_option] instanceof Function) {
							value = data[_option].apply(data, args);
						} else {
							value = data.options[_option];
						}
					}
				}
			});

			if (typeof value !== 'undefined') {
				//noinspection JSUnusedAssignment
				return value;
			} else {
				return chain;
			}
		}

		var old = $.fn.selectpicker;
		$.fn.selectpicker = Plugin;
		$.fn.selectpicker.Constructor = Selectpicker;

		// SELECTPICKER NO CONFLICT
		// ========================
		$.fn.selectpicker.noConflict = function () {
			$.fn.selectpicker = old;
			return this;
		};

		$(document)
			.data('keycount', 0)
			.on('keydown.bs.select', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown)
			.on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (e) {
				e.stopPropagation();
			});

		// SELECTPICKER DATA-API
		// =====================
		$(window).on('load.bs.select.data-api', function () {
			$('.selectpicker').each(function () {
				var $selectpicker = $(this);
				Plugin.call($selectpicker, $selectpicker.data());
			})
		});
	})(jQuery);


}));

/*!
 * clipboard.js v2.0.0
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT Â© Zeno Rocha
 */
! function (t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ClipboardJS = e() : t.ClipboardJS = e()
}(this, function () {
	return function (t) {
		function e(o) {
			if (n[o]) return n[o].exports;
			var r = n[o] = {
				i: o,
				l: !1,
				exports: {}
			};
			return t[o].call(r.exports, r, r.exports, e), r.l = !0, r.exports
		}
		var n = {};
		return e.m = t, e.c = n, e.i = function (t) {
			return t
		}, e.d = function (t, n, o) {
			e.o(t, n) || Object.defineProperty(t, n, {
				configurable: !1,
				enumerable: !0,
				get: o
			})
		}, e.n = function (t) {
			var n = t && t.__esModule ? function () {
				return t.default
			} : function () {
				return t
			};
			return e.d(n, "a", n), n
		}, e.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		}, e.p = "", e(e.s = 3)
	}([function (t, e, n) {
		var o, r, i;
		! function (a, c) {
			r = [t, n(7)], o = c, void 0 !== (i = "function" == typeof o ? o.apply(e, r) : o) && (t.exports = i)
		}(0, function (t, e) {
			"use strict";

			function n(t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}
			var o = function (t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}(e),
				r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				},
				i = function () {
					function t(t, e) {
						for (var n = 0; n < e.length; n++) {
							var o = e[n];
							o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
						}
					}
					return function (e, n, o) {
						return n && t(e.prototype, n), o && t(e, o), e
					}
				}(),
				a = function () {
					function t(e) {
						n(this, t), this.resolveOptions(e), this.initSelection()
					}
					return i(t, [{
						key: "resolveOptions",
						value: function () {
							var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
							this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
						}
					}, {
						key: "initSelection",
						value: function () {
							this.text ? this.selectFake() : this.target && this.selectTarget()
						}
					}, {
						key: "selectFake",
						value: function () {
							var t = this,
								e = "rtl" == document.documentElement.getAttribute("dir");
							this.removeFake(), this.fakeHandlerCallback = function () {
								return t.removeFake()
							}, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";
							var n = window.pageYOffset || document.documentElement.scrollTop;
							this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, o.default)(this.fakeElem), this.copyText()
						}
					}, {
						key: "removeFake",
						value: function () {
							this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
						}
					}, {
						key: "selectTarget",
						value: function () {
							this.selectedText = (0, o.default)(this.target), this.copyText()
						}
					}, {
						key: "copyText",
						value: function () {
							var t = void 0;
							try {
								t = document.execCommand(this.action)
							} catch (e) {
								t = !1
							}
							this.handleResult(t)
						}
					}, {
						key: "handleResult",
						value: function (t) {
							this.emitter.emit(t ? "success" : "error", {
								action: this.action,
								text: this.selectedText,
								trigger: this.trigger,
								clearSelection: this.clearSelection.bind(this)
							})
						}
					}, {
						key: "clearSelection",
						value: function () {
							this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
						}
					}, {
						key: "destroy",
						value: function () {
							this.removeFake()
						}
					}, {
						key: "action",
						set: function () {
							var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
							if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
						},
						get: function () {
							return this._action
						}
					}, {
						key: "target",
						set: function (t) {
							if (void 0 !== t) {
								if (!t || "object" !== (void 0 === t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
								if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
								if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
								this._target = t
							}
						},
						get: function () {
							return this._target
						}
					}]), t
				}();
			t.exports = a
		})
	}, function (t, e, n) {
		function o(t, e, n) {
			if (!t && !e && !n) throw new Error("Missing required arguments");
			if (!c.string(e)) throw new TypeError("Second argument must be a String");
			if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
			if (c.node(t)) return r(t, e, n);
			if (c.nodeList(t)) return i(t, e, n);
			if (c.string(t)) return a(t, e, n);
			throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
		}

		function r(t, e, n) {
			return t.addEventListener(e, n), {
				destroy: function () {
					t.removeEventListener(e, n)
				}
			}
		}

		function i(t, e, n) {
			return Array.prototype.forEach.call(t, function (t) {
				t.addEventListener(e, n)
			}), {
				destroy: function () {
					Array.prototype.forEach.call(t, function (t) {
						t.removeEventListener(e, n)
					})
				}
			}
		}

		function a(t, e, n) {
			return u(document.body, t, e, n)
		}
		var c = n(6),
			u = n(5);
		t.exports = o
	}, function (t, e) {
		function n() {}
		n.prototype = {
			on: function (t, e, n) {
				var o = this.e || (this.e = {});
				return (o[t] || (o[t] = [])).push({
					fn: e,
					ctx: n
				}), this
			},
			once: function (t, e, n) {
				function o() {
					r.off(t, o), e.apply(n, arguments)
				}
				var r = this;
				return o._ = e, this.on(t, o, n)
			},
			emit: function (t) {
				var e = [].slice.call(arguments, 1),
					n = ((this.e || (this.e = {}))[t] || []).slice(),
					o = 0,
					r = n.length;
				for (o; o < r; o++) n[o].fn.apply(n[o].ctx, e);
				return this
			},
			off: function (t, e) {
				var n = this.e || (this.e = {}),
					o = n[t],
					r = [];
				if (o && e)
					for (var i = 0, a = o.length; i < a; i++) o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);
				return r.length ? n[t] = r : delete n[t], this
			}
		}, t.exports = n
	}, function (t, e, n) {
		var o, r, i;
		! function (a, c) {
			r = [t, n(0), n(2), n(1)], o = c, void 0 !== (i = "function" == typeof o ? o.apply(e, r) : o) && (t.exports = i)
		}(0, function (t, e, n, o) {
			"use strict";

			function r(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			}

			function i(t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}

			function a(t, e) {
				if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return !e || "object" != typeof e && "function" != typeof e ? t : e
			}

			function c(t, e) {
				if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						enumerable: !1,
						writable: !0,
						configurable: !0
					}
				}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
			}

			function u(t, e) {
				var n = "data-clipboard-" + t;
				if (e.hasAttribute(n)) return e.getAttribute(n)
			}
			var l = r(e),
				s = r(n),
				f = r(o),
				d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				},
				h = function () {
					function t(t, e) {
						for (var n = 0; n < e.length; n++) {
							var o = e[n];
							o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
						}
					}
					return function (e, n, o) {
						return n && t(e.prototype, n), o && t(e, o), e
					}
				}(),
				p = function (t) {
					function e(t, n) {
						i(this, e);
						var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
						return o.resolveOptions(n), o.listenClick(t), o
					}
					return c(e, t), h(e, [{
						key: "resolveOptions",
						value: function () {
							var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
							this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === d(t.container) ? t.container : document.body
						}
					}, {
						key: "listenClick",
						value: function (t) {
							var e = this;
							this.listener = (0, f.default)(t, "click", function (t) {
								return e.onClick(t)
							})
						}
					}, {
						key: "onClick",
						value: function (t) {
							var e = t.delegateTarget || t.currentTarget;
							this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({
								action: this.action(e),
								target: this.target(e),
								text: this.text(e),
								container: this.container,
								trigger: e,
								emitter: this
							})
						}
					}, {
						key: "defaultAction",
						value: function (t) {
							return u("action", t)
						}
					}, {
						key: "defaultTarget",
						value: function (t) {
							var e = u("target", t);
							if (e) return document.querySelector(e)
						}
					}, {
						key: "defaultText",
						value: function (t) {
							return u("text", t)
						}
					}, {
						key: "destroy",
						value: function () {
							this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
						}
					}], [{
						key: "isSupported",
						value: function () {
							var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
								e = "string" == typeof t ? [t] : t,
								n = !!document.queryCommandSupported;
							return e.forEach(function (t) {
								n = n && !!document.queryCommandSupported(t)
							}), n
						}
					}]), e
				}(s.default);
			t.exports = p
		})
	}, function (t, e) {
		function n(t, e) {
			for (; t && t.nodeType !== o;) {
				if ("function" == typeof t.matches && t.matches(e)) return t;
				t = t.parentNode
			}
		}
		var o = 9;
		if ("undefined" != typeof Element && !Element.prototype.matches) {
			var r = Element.prototype;
			r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
		}
		t.exports = n
	}, function (t, e, n) {
		function o(t, e, n, o, r) {
			var a = i.apply(this, arguments);
			return t.addEventListener(n, a, r), {
				destroy: function () {
					t.removeEventListener(n, a, r)
				}
			}
		}

		function r(t, e, n, r, i) {
			return "function" == typeof t.addEventListener ? o.apply(null, arguments) : "function" == typeof n ? o.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, function (t) {
				return o(t, e, n, r, i)
			}))
		}

		function i(t, e, n, o) {
			return function (n) {
				n.delegateTarget = a(n.target, e), n.delegateTarget && o.call(t, n)
			}
		}
		var a = n(4);
		t.exports = r
	}, function (t, e) {
		e.node = function (t) {
			return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
		}, e.nodeList = function (t) {
			var n = Object.prototype.toString.call(t);
			return void 0 !== t && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in t && (0 === t.length || e.node(t[0]))
		}, e.string = function (t) {
			return "string" == typeof t || t instanceof String
		}, e.fn = function (t) {
			return "[object Function]" === Object.prototype.toString.call(t)
		}
	}, function (t, e) {
		function n(t) {
			var e;
			if ("SELECT" === t.nodeName) t.focus(), e = t.value;
			else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
				var n = t.hasAttribute("readonly");
				n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
			} else {
				t.hasAttribute("contenteditable") && t.focus();
				var o = window.getSelection(),
					r = document.createRange();
				r.selectNodeContents(t), o.removeAllRanges(), o.addRange(r), e = o.toString()
			}
			return e
		}
		t.exports = n
	}])
});
jQuery(window).on("load", function () {
	"use strict";
	jQuery(".pre-loader").fadeToggle("medium");
	// bootstrap wysihtml5
	$('.textarea_editor').wysihtml5({
		html: true
	});
});
jQuery(window).on("load resize", function () {
	$(".customscroll").mCustomScrollbar({
		theme: "minimal-dark",
		advanced: {
			autoScrollOnFocus: false,
		},
	});
});
jQuery(document).ready(function () {
	"use strict";
	// Background Image
	jQuery(".bg_img").each(function (i, elem) {
		var img = jQuery(elem);
		jQuery(this).hide();
		jQuery(this).parent().css({
			background: "url(" + img.attr("src") + ") no-repeat center center",
		});
	});

	// click to scroll
	$('.collapse-box').on('shown.bs.collapse', function () {
		$(".customscroll").mCustomScrollbar("scrollTo", $(this));
	});

	// code split
	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
	};

	function escapeHtml(string) {
		return String(string).replace(/[&<>"'\/]/g, function (s) {
			return entityMap[s];
		});
	}
	//document.addEventListener("DOMContentLoaded", init, false);
	window.onload = function init() {
		var codeblock = document.querySelectorAll("pre code");
		if (codeblock.length) {
			for (var i = 0, len = codeblock.length; i < len; i++) {
				var dom = codeblock[i];
				var html = dom.innerHTML;
				html = escapeHtml(html);
				dom.innerHTML = html;
			}
			$('pre code').each(function (i, block) {
				hljs.highlightBlock(block);
			});
		}
	}
	// custom select 2 init
	$('.custom-select2').select2();

	// Bootstrap Select
	$('.selectpicker').selectpicker();

	// tooltip init
	$('[data-toggle="tooltip"]').tooltip()

	// popover init
	$('[data-toggle="popover"]').popover()

	// form-control on focus add class
	$(".form-control").on('focus', function () {
		$(this).parent().addClass("focus");
	})
	$(".form-control").on('focusout', function () {
		$(this).parent().removeClass("focus");
	})

	// Dropdown Slide Animation
	$('.dropdown').on('show.bs.dropdown', function (e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
	});
	$('.dropdown').on('hide.bs.dropdown', function (e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
	});

	// sidebar menu icon
	$('.menu-icon').on('click', function () {
		$(this).toggleClass('open');
		$('.left-side-bar').toggleClass('open');
	});

	var w = $(window).width();
	$(document).on('touchstart click', function (e) {
		if ($(e.target).parents('.left-side-bar').length == 0 && !$(e.target).is('.menu-icon, .menu-icon span')) {
			$('.left-side-bar').removeClass('open');
			$('.menu-icon').removeClass('open');
		};
	});
	$(window).on('resize', function () {
		var w = $(window).width();
		if ($(window).width() > 1200) {
			$('.left-side-bar').removeClass('open');
			$('.menu-icon').removeClass('open');
		}
	});


	// sidebar menu Active Class
	$('#accordion-menu').each(function () {
		var vars = window.location.href.split("/").pop();
		$(this).find('a[href="' + vars + '"]').addClass('active');
	});


	// click to copy icon
	$(".fa-hover").click(function (event) {
		event.preventDefault();
		var $html = $(this).find('.icon-copy').first();
		var str = $html.prop('outerHTML');
		CopyToClipboard(str, true, "Copied");
	});
	var clipboard = new ClipboardJS('.code-copy');
	clipboard.on('success', function (e) {
		CopyToClipboard('', true, "Copied");
		e.clearSelection();
	});

	// date picker
	$('.date-picker').datepicker({
		language: 'en',
		autoClose: true,
		dateFormat: 'dd MM yyyy',
	});
	$('.datetimepicker').datepicker({
		timepicker: true,
		language: 'en',
		autoClose: true,
		dateFormat: 'dd MM yyyy',
	});
	$('.datetimepicker-range').datepicker({
		language: 'en',
		range: true,
		multipleDates: true,
		multipleDatesSeparator: " - "
	});
	$('.month-picker').datepicker({
		language: 'en',
		minView: 'months',
		view: 'months',
		autoClose: true,
		dateFormat: 'MM yyyy',
	});

	// only time picker
	$(".time-picker").timeDropper({
		mousewheel: true,
		meridians: true,
		init_animation: 'dropdown',
		setCurrentTime: false
	});
	$('.time-picker-default').timeDropper();

	// var color = $('.btn').data('color');
	// console.log(color);
	// $('.btn').style('color'+color);
	$("[data-color]").each(function () {
		$(this).css('color', $(this).attr('data-color'));
	});
	$("[data-bgcolor]").each(function () {
		$(this).css('background-color', $(this).attr('data-bgcolor'));
	});
	$("[data-border]").each(function () {
		$(this).css('border', $(this).attr('data-border'));
	});

	$("#accordion-menu").vmenuModule({
		Speed: 400,
		autostart: false,
		autohide: true
	});

});

// sidebar menu accordion
(function ($) {
	$.fn.vmenuModule = function (option) {
		var obj,
			item;
		var options = $.extend({
				Speed: 220,
				autostart: true,
				autohide: 1
			},
			option);
		obj = $(this);

		item = obj.find("ul").parent("li").children("a");
		item.attr("data-option", "off");

		item.unbind('click').on("click", function () {
			var a = $(this);
			if (options.autohide) {
				a.parent().parent().find("a[data-option='on']").parent("li").children("ul").slideUp(options.Speed / 1.2,
					function () {
						$(this).parent("li").children("a").attr("data-option", "off");
						$(this).parent("li").removeClass("show");
					})
			}
			if (a.attr("data-option") == "off") {
				a.parent("li").children("ul").slideDown(options.Speed,
					function () {
						a.attr("data-option", "on");
						a.parent('li').addClass("show");
					});
			}
			if (a.attr("data-option") == "on") {
				a.attr("data-option", "off");
				a.parent("li").children("ul").slideUp(options.Speed)
				a.parent('li').removeClass("show");
			}
		});
		if (options.autostart) {
			obj.find("a").each(function () {

				$(this).parent("li").parent("ul").slideDown(options.Speed,
					function () {
						$(this).parent("li").children("a").attr("data-option", "on");
					})
			})
		} else {
			obj.find("a.active").each(function () {

				$(this).parent("li").parent("ul").slideDown(options.Speed,
					function () {
						$(this).parent("li").children("a").attr("data-option", "on");
						$(this).parent('li').addClass("show");
					})
			})
		}

	}
})(window.jQuery || window.Zepto);

var visibleButton = true;

function maximumLoan() {
	document.getElementById('submit').style.visibility = 'hidden';
	var maxValue = parseInt(document.getElementById('maximum_loan_amount').value);
	var minValue = parseInt(document.getElementById('minimum_loan_amount').value);

	if (minValue >= maxValue) {
		alert('Minimum Loan Amount should not Be greater than or equal to Maximum Loan Amount');
		document.getElementById('submit').style.visibility = 'hidden';
		document.getElementById('maximum_loan_amount').setAttribute('style', 'border: 1px solid rgba(81, 203, 238, 1); box-shadow: 0 0 5px rgba(81, 203, 238, 1);');
		document.getElementById('minimum_loan_amount').setAttribute('style', 'border: 1px solid rgba(81, 203, 238, 1); box-shadow: 0 0 5px rgba(81, 203, 238, 1);');
		visibleButton = false;
	} else {
		document.getElementById('submit').style.visibility = 'visible';
		document.getElementById('maximum_loan_amount').setAttribute('style', 'border: default; box-shadow: default;');
		document.getElementById('minimum_loan_amount').setAttribute('style', 'border: default; box-shadow: default;');
		visibleButton = true;
	}
}

function maximumInstall() {
	document.getElementById('submit').style.visibility = 'hidden';
	var maxValue = parseInt(document.getElementById('maximum_number_of_installments').value);
	var minValue = parseInt(document.getElementById('minimum_number_of_installments').value);
	if (minValue >= maxValue) {
		alert('Minimum number of Installments should not Be greater than or equal to Maximum number of installments');
		document.getElementById('submit').style.visibility = 'hidden';
		document.getElementById('maximum_number_of_installments').setAttribute('style', 'border: 1px solid rgba(81, 203, 238, 1); box-shadow: 0 0 5px rgba(81, 203, 238, 1);');
		document.getElementById('minimum_number_of_installments').setAttribute('style', 'border: 1px solid rgba(81, 203, 238, 1); box-shadow: 0 0 5px rgba(81, 203, 238, 1);');
		visibleButton = false;
	} else {
		document.getElementById('submit').style.visibility = 'visible';
		document.getElementById('maximum_number_of_installments').setAttribute('style', 'border: default; box-shadow: default;');
		document.getElementById('minimum_number_of_installments').setAttribute('style', 'border: default; box-shadow: default;');
		visibleButton = true;
	}

}

function maximumGuarnt() {
	document.getElementById('submit').style.visibility = 'hidden';
	var maxValue = parseInt(document.getElementById('maximum_number_of_guarantors').value);
	var minValue = parseInt(document.getElementById('minimum_number_of_guarantors').value);
	if (maxValue <= 4) {
		if (minValue >= maxValue) {
			alert('Minimum number of Guarantors should not Be greater than or equal toMaximum number of Guarantors');
			document.getElementById('submit').style.visibility = 'hidden';
			document.getElementById('maximum_number_of_guarantors').setAttribute('style', 'border: 1px solid rgba(81, 203, 238, 1); box-shadow: 0 0 5px rgba(81, 203, 238, 1);');
			document.getElementById('minimum_number_of_guarantors').setAttribute('style', 'border: 1px solid rgba(81, 203, 238, 1); box-shadow: 0 0 5px rgba(81, 203, 238, 1);');
			visibleButton = false;
		} else {
			document.getElementById('submit').style.visibility = 'visible';
			document.getElementById('maximum_number_of_guarantors').setAttribute('style', 'border: default; box-shadow: default;');
			document.getElementById('minimum_number_of_guarantors').setAttribute('style', 'border: default; box-shadow: default;');
		}
	} else {
		alert('Maximum Guarantors should not Be greater than or equal to 4');
		document.getElementById('submit').style.visibility = 'hidden';
		visibleButton = false;
	}
}

function changeFunc() {
	var selectBox = document.getElementById("selectBox");
	var selected = document.getElementById("display");

	var selectedValue = selectBox.options[selectBox.selectedIndex].value;

	if (selected.style.display == "none") {
		selected.style.display = "block";
	} else {
		selected.style.display = "none";
	}

	var block_to_insert;
	var container_block;

	block_to_insert = document.createElement('div');
	block_to_insert.innerHTML = selectedValue;

	container_block = document.getElementById('loan_type_details');
	container_block.appendChild(block_to_insert);
}
