'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toArray = require('rc-util/lib/Children/toArray');

var _toArray2 = _interopRequireDefault(_toArray);

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenu = function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropdownMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.scrollActiveItemToView = function () {
      // scroll into view
      var itemComponent = (0, _reactDom.findDOMNode)(_this.firstActiveItem);
      if (itemComponent) {
        (0, _domScrollIntoView2['default'])(itemComponent, (0, _reactDom.findDOMNode)(_this.refs.menu), {
          onlyScrollIfNeeded: true
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropdownMenu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.lastInputValue = this.props.inputValue;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollActiveItemToView();
      this.lastVisible = this.props.visible;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (!nextProps.visible) {
        this.lastVisible = false;
      }
      // freeze when hide
      return nextProps.visible;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var props = this.props;
      if (!prevProps.visible && props.visible) {
        this.scrollActiveItemToView();
      }
      this.lastVisible = props.visible;
      this.lastInputValue = props.inputValue;
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this2 = this;

      var props = this.props;
      var menuItems = props.menuItems,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          value = props.value,
          prefixCls = props.prefixCls,
          multiple = props.multiple,
          onMenuSelect = props.onMenuSelect,
          inputValue = props.inputValue;

      if (menuItems && menuItems.length) {
        var menuProps = {};
        if (multiple) {
          menuProps.onDeselect = props.onMenuDeselect;
          menuProps.onSelect = onMenuSelect;
        } else {
          menuProps.onClick = onMenuSelect;
        }

        var selectedKeys = (0, _util.getSelectKeys)(menuItems, value);
        var activeKeyProps = {};

        var clonedMenuItems = menuItems;
        if (selectedKeys.length) {
          if (props.visible && !this.lastVisible) {
            activeKeyProps.activeKey = selectedKeys[0];
          }
          var foundFirst = false;
          // set firstActiveItem via cloning menus
          // for scroll into view
          var clone = function clone(item) {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
              foundFirst = true;
              return (0, _react.cloneElement)(item, {
                ref: function ref(_ref2) {
                  _this2.firstActiveItem = _ref2;
                }
              });
            }
            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (item.type.isMenuItemGroup) {
              var children = (0, _toArray2['default'])(item.props.children).map(clone);
              return (0, _react.cloneElement)(item, {}, children);
            }
            return clone(item);
          });
        }

        // clear activeKey when inputValue change
        if (inputValue !== this.lastInputValue) {
          activeKeyProps.activeKey = '';
        }

        return _react2['default'].createElement(
          _rcMenu2['default'],
          _extends({
            ref: 'menu',
            style: this.props.dropdownMenuStyle,
            defaultActiveFirst: defaultActiveFirstOption
          }, activeKeyProps, {
            multiple: multiple,
            focusable: false
          }, menuProps, {
            selectedKeys: selectedKeys,
            prefixCls: prefixCls + '-menu'
          }),
          clonedMenuItems
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var renderMenu = this.renderMenu();
      return renderMenu ? _react2['default'].createElement(
        'div',
        {
          style: { overflow: 'auto' },
          onFocus: this.props.onPopupFocus,
          onMouseDown: _util.preventDefaultEvent
        },
        renderMenu
      ) : null;
    }
  }]);

  return DropdownMenu;
}(_react2['default'].Component);

DropdownMenu.propTypes = {
  defaultActiveFirstOption: _propTypes2['default'].bool,
  value: _propTypes2['default'].any,
  dropdownMenuStyle: _propTypes2['default'].object,
  multiple: _propTypes2['default'].bool,
  onPopupFocus: _propTypes2['default'].func,
  onMenuDeSelect: _propTypes2['default'].func,
  onMenuSelect: _propTypes2['default'].func,
  prefixCls: _propTypes2['default'].string,
  menuItems: _propTypes2['default'].any,
  inputValue: _propTypes2['default'].string,
  visible: _propTypes2['default'].bool
};
exports['default'] = DropdownMenu;


DropdownMenu.displayName = 'DropdownMenu';
module.exports = exports['default'];