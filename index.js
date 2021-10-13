'use strict';

var _Array$from = require('@babel/runtime-corejs3/core-js-stable/array/from');
var _Symbol = require('@babel/runtime-corejs3/core-js-stable/symbol');
var _getIteratorMethod = require('@babel/runtime-corejs3/core-js/get-iterator-method');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var _asyncToGenerator = require('@babel/runtime-corejs3/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime-corejs3/regenerator');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
var _reduceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/reduce');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/map');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _trimInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/trim');
var _includesInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/includes');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var prompts = require('prompts');
var kolorist = require('kolorist');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var _Array$from__default = /*#__PURE__*/ _interopDefaultLegacy(_Array$from);
var _Symbol__default = /*#__PURE__*/ _interopDefaultLegacy(_Symbol);
var _getIteratorMethod__default = /*#__PURE__*/ _interopDefaultLegacy(_getIteratorMethod);
var _Array$isArray__default = /*#__PURE__*/ _interopDefaultLegacy(_Array$isArray);
var _asyncToGenerator__default = /*#__PURE__*/ _interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/ _interopDefaultLegacy(_regeneratorRuntime);
var _sliceInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_sliceInstanceProperty);
var _reduceInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_reduceInstanceProperty);
var _mapInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_mapInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_concatInstanceProperty);
var _trimInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_trimInstanceProperty);
var _includesInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_includesInstanceProperty);
var _JSON$stringify__default = /*#__PURE__*/ _interopDefaultLegacy(_JSON$stringify);
var _filterInstanceProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_filterInstanceProperty);
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/ _interopDefaultLegacy(path);
var minimist__default = /*#__PURE__*/ _interopDefaultLegacy(minimist);
var prompts__default = /*#__PURE__*/ _interopDefaultLegacy(prompts);

var _context, _context2;

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof _Symbol__default['default'] !== 'undefined' && _getIteratorMethod__default['default'](o)) ||
    o['@@iterator'];
  if (!it) {
    if (
      _Array$isArray__default['default'](o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  var _context6;
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = _sliceInstanceProperty__default['default']((_context6 = Object.prototype.toString.call(o))).call(
    _context6,
    8,
    -1,
  );
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return _Array$from__default['default'](o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var argv = minimist__default['default'](
  _sliceInstanceProperty__default['default']((_context = process.argv)).call(_context, 2),
  {
    string: ['_'],
  },
);
var cwd = process.cwd();
/**
 * 初始化的框架们
 */

var FRAMEWORKS = [
  {
    name: 'vanilla',
    color: kolorist.yellow,
    variants: [
      {
        name: 'vanilla',
        display: 'JavaScript',
        color: kolorist.yellow,
      },
      {
        name: 'vanilla-ts',
        display: 'TypeScript',
        color: kolorist.blue,
      },
    ],
  },
  {
    name: 'vue',
    color: kolorist.green,
    variants: [
      {
        name: 'vue',
        display: 'JavaScript',
        color: kolorist.yellow,
      },
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: kolorist.blue,
      },
    ],
  },
  {
    name: 'react',
    color: kolorist.cyan,
    variants: [
      {
        name: 'react',
        display: 'JavaScript',
        color: kolorist.yellow,
      },
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: kolorist.blue,
      },
    ],
  },
];
/**
 * 模板名称数组
 */

var TEMPLATES = _reduceInstanceProperty__default['default'](
  (_context2 = _mapInstanceProperty__default['default'](FRAMEWORKS).call(FRAMEWORKS, function (f) {
    var _f$variants;

    return (
      (f === null || f === void 0
        ? void 0
        : (_f$variants = f.variants) === null || _f$variants === void 0
        ? void 0
        : _mapInstanceProperty__default['default'](_f$variants).call(_f$variants, function (v) {
            return v.name;
          })) || [f.name]
    );
  })),
).call(
  _context2,
  function (a, b) {
    return _concatInstanceProperty__default['default'](a).call(a, b);
  },
  [],
);
/**
 * 防止 .gitignore 干扰
 */

var renameFiles = {
  _gitignore: '.gitignore',
};

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator__default['default'](
    /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee() {
      var _targetDir;

      var targetDir,
        template,
        defaultProjectName,
        result,
        _result,
        framework,
        overwrite,
        packageName,
        variant,
        root,
        templateDir,
        write,
        files,
        _iterator3,
        _step3,
        file,
        pkg,
        pkgInfo,
        pkgManager;

      return _regeneratorRuntime__default['default'].wrap(
        function _callee$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                // argv._ contains all the arguments that didn't have an option associated with them.
                // npm init app 项目名
                // targetDir 就是上边的项目名
                targetDir = argv._[0]; // yarn create vite my-vue-app --template vue

                template = argv.template || argv.t;
                defaultProjectName =
                  (_targetDir = targetDir) !== null && _targetDir !== void 0 ? _targetDir : 'initial-project';
                result = {};
                _context5.prev = 4;
                _context5.next = 7;
                return prompts__default['default'](
                  [
                    {
                      type: targetDir ? null : 'text',
                      name: 'projectName',
                      message: '项目名:',
                      initial: defaultProjectName,
                      // eslint-disable-next-line no-return-assign
                      onState: function onState(state) {
                        var _context3;

                        return (targetDir =
                          _trimInstanceProperty__default['default']((_context3 = state.value)).call(_context3) ||
                          defaultProjectName);
                      },
                    },
                    {
                      // type 路径不存在 或 路径存在且为空目录时 跳过进入下个选项
                      type: function type() {
                        return !fs__default['default'].existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm';
                      },
                      name: 'overwrite',
                      message: function message() {
                        return (
                          (targetDir === '.' ? '当前目录' : '\u76EE\u6807\u76EE\u5F55 "'.concat(targetDir, '"')) +
                          ' \u4E0D\u662F\u7A7A\u76EE\u5F55\u3002\u79FB\u9664\u73B0\u6709\u6587\u4EF6\u5E76\u7EE7\u7EED\uFF1F'
                        );
                      },
                    },
                    {
                      type: function type(_) {
                        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                          overwrite = _ref.overwrite;

                        if (overwrite === false) {
                          throw new Error(kolorist.red('✖') + ' 操作取消');
                        }

                        return null;
                      },
                      name: 'overwriteChecker',
                    },
                    {
                      type: function type() {
                        return isValidPackageName(targetDir) ? null : 'text';
                      },
                      name: 'packageName',
                      message: '项目包名:',
                      initial: function initial() {
                        return toValidPackageName(targetDir);
                      },
                      validate: function validate(dir) {
                        return isValidPackageName(dir) || '不合适的 package.json name';
                      },
                    },
                    {
                      type:
                        template && _includesInstanceProperty__default['default'](TEMPLATES).call(TEMPLATES, template)
                          ? null
                          : 'select',
                      name: 'framework',
                      message:
                        typeof template === 'string' &&
                        !_includesInstanceProperty__default['default'](TEMPLATES).call(TEMPLATES, template)
                          ? '"'.concat(
                              template,
                              '" \u4E0D\u5305\u542B\u5728\u4ED3\u5E93\u6A21\u677F\u4E2D\u3002\u8BF7\u4ECE\u4E0B\u8FB9\u9009\u62E9\u4E00\u4E2A\uFF1A',
                            )
                          : '选择一个框架：',
                      initial: 0,
                      choices: _mapInstanceProperty__default['default'](FRAMEWORKS).call(
                        FRAMEWORKS,
                        function (framework) {
                          var frameworkColor = framework.color;
                          return {
                            title: frameworkColor(framework.name),
                            value: framework,
                          };
                        },
                      ),
                    },
                    {
                      type: function type(framework) {
                        return framework !== null && framework !== void 0 && framework.variants ? 'select' : null;
                      },
                      name: 'variant',
                      message: '选择一个类型：',
                      choices: function choices(framework) {
                        var _context4;

                        return _mapInstanceProperty__default['default']((_context4 = framework.variants)).call(
                          _context4,
                          function (variant) {
                            var variantColor = variant.color;
                            return {
                              title: variantColor(variant.name),
                              value: variant.name,
                            };
                          },
                        );
                      },
                    },
                  ],
                  {
                    onCancel: function onCancel() {
                      throw new Error(kolorist.red('✖') + ' 操作取消');
                    },
                  },
                );

              case 7:
                result = _context5.sent;
                _context5.next = 14;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5['catch'](4);
                console.log(_context5.t0.message);
                return _context5.abrupt('return');

              case 14:
                // user choice associated with prompts
                (_result = result),
                  (framework = _result.framework),
                  (overwrite = _result.overwrite),
                  (packageName = _result.packageName),
                  (variant = _result.variant);
                root = path__default['default'].join(cwd, targetDir);

                if (overwrite) {
                  emptyDir(root);
                } else if (!fs__default['default'].existsSync(root)) {
                  fs__default['default'].mkdirSync(root);
                } // determine template

                template = variant || framework || template;
                console.log('\n\u6B63\u5728 '.concat(root, ' \u521B\u5EFA\u811A\u624B\u67B6\u9879\u76EE\u4E2D...'));
                templateDir = path__default['default'].join(__dirname, '../../packages/template-'.concat(template));

                write = function write(file, content) {
                  var targetPath = renameFiles[file]
                    ? path__default['default'].join(root, renameFiles[file])
                    : path__default['default'].join(root, file);

                  if (content) {
                    fs__default['default'].writeFileSync(targetPath, content);
                  } else {
                    copy(path__default['default'].join(templateDir, file), targetPath);
                  }
                };

                files = fs__default['default'].readdirSync(templateDir);
                _iterator3 = _createForOfIteratorHelper(
                  _filterInstanceProperty__default['default'](files).call(files, function (f) {
                    return f !== 'package.json';
                  }),
                );

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                    file = _step3.value;
                    write(file);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                pkg = (function (t) {
                  return Promise.resolve().then(function () {
                    return /*#__PURE__*/ _interopNamespace(require(t));
                  });
                })(path__default['default'].join(templateDir, 'package.json'));
                pkg.name = packageName || targetDir;
                write('package.json', _JSON$stringify__default['default'](pkg, null, 2));
                pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
                pkgManager = pkgInfo ? pkgInfo.name : 'npm';
                console.log('\u5B8C\u6210\uFF01 \u73B0\u5728\u8FD0\u884C\uFF1A\n');

                if (root !== cwd) {
                  console.log('  cd '.concat(path__default['default'].relative(cwd, root)));
                }

                _context5.t1 = pkgManager;
                _context5.next = _context5.t1 === 'yarn' ? 34 : 37;
                break;

              case 34:
                console.log('  yarn');
                console.log('  yarn dev');
                return _context5.abrupt('break', 40);

              case 37:
                console.log('  '.concat(pkgManager, ' install'));
                console.log('  '.concat(pkgManager, ' run dev'));
                return _context5.abrupt('break', 40);

              case 40:
                console.log();

              case 41:
              case 'end':
                return _context5.stop();
            }
          }
        },
        _callee,
        null,
        [[4, 10]],
      );
    }),
  );
  return _init.apply(this, arguments);
}

function isEmpty(path) {
  return fs__default['default'].readdirSync(path).length === 0;
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function toValidPackageName(projectName) {
  return _trimInstanceProperty__default['default'](projectName)
    .call(projectName)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

function emptyDir(dir) {
  if (!fs__default['default'].existsSync(dir)) {
    return;
  }

  var _iterator = _createForOfIteratorHelper(fs__default['default'].readdirSync(dir)),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var file = _step.value;
      var abs = path__default['default'].resolve(dir, file); // baseline is Node 12 so can't use rmSync :(

      if (fs__default['default'].lstatSync(abs).isDirectory()) {
        emptyDir(abs);
        fs__default['default'].rmdirSync(abs);
      } else {
        fs__default['default'].unlinkSync(abs);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function copy(src, dest) {
  var stat = fs__default['default'].statSync(src);

  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs__default['default'].copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  fs__default['default'].mkdirSync(destDir, {
    recursive: true,
  });

  var _iterator2 = _createForOfIteratorHelper(fs__default['default'].readdirSync(srcDir)),
    _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var file = _step2.value;
      var srcFile = path__default['default'].resolve(srcDir, file);
      var destFile = path__default['default'].resolve(destDir, file);
      copy(srcFile, destFile);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined;
  var pkgSpec = userAgent.split(' ')[0];
  var pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

init()['catch'](function (e) {
  console.error(e);
});
//# sourceMappingURL=index.js.map
