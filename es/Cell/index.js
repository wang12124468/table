function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import * as React from 'react';
import classNames from 'classnames';
import { supportRef } from "rc-util/es/ref";
import { getPathValue } from '../utils/valueUtil';

function isRenderCell(data) {
  return data && _typeof(data) === 'object' && !Array.isArray(data) && !React.isValidElement(data);
}

function isRefComponent(component) {
  // String tag component also support ref
  if (typeof component === 'string') {
    return true;
  }

  return supportRef(component);
}

function Cell(_ref, ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      record = _ref.record,
      index = _ref.index,
      dataIndex = _ref.dataIndex,
      render = _ref.render,
      children = _ref.children,
      _ref$component = _ref.component,
      Component = _ref$component === void 0 ? 'td' : _ref$component,
      colSpan = _ref.colSpan,
      rowSpan = _ref.rowSpan,
      fixLeft = _ref.fixLeft,
      fixRight = _ref.fixRight,
      firstFixLeft = _ref.firstFixLeft,
      lastFixLeft = _ref.lastFixLeft,
      firstFixRight = _ref.firstFixRight,
      lastFixRight = _ref.lastFixRight,
      appendNode = _ref.appendNode,
      _ref$additionalProps = _ref.additionalProps,
      additionalProps = _ref$additionalProps === void 0 ? {} : _ref$additionalProps,
      ellipsis = _ref.ellipsis,
      align = _ref.align;
  var cellPrefixCls = "".concat(prefixCls, "-cell"); // ==================== Child Node ====================

  var cellProps;
  var childNode;

  if (children) {
    childNode = children;
  } else {
    var value = getPathValue(record, dataIndex); // Customize render node

    childNode = value;

    if (render) {
      var renderData = render(value, record, index);

      if (isRenderCell(renderData)) {
        childNode = renderData.children;
        cellProps = renderData.props;
      } else {
        childNode = renderData;
      }
    }
  } // Not crash if final `childNode` is not validate ReactNode


  if (_typeof(childNode) === 'object' && !Array.isArray(childNode) && !React.isValidElement(childNode)) {
    childNode = null;
  }

  if (ellipsis && (lastFixLeft || firstFixRight)) {
    childNode = React.createElement("span", {
      className: "".concat(cellPrefixCls, "-content")
    }, childNode);
  }

  var _ref2 = cellProps || {},
      cellColSpan = _ref2.colSpan,
      cellRowSpan = _ref2.rowSpan,
      cellStyle = _ref2.style,
      cellClassName = _ref2.className;

  var mergedColSpan = cellColSpan !== undefined ? cellColSpan : colSpan;
  var mergedRowSpan = cellRowSpan !== undefined ? cellRowSpan : rowSpan;

  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  } // ====================== Fixed =======================


  var fixedStyle = {};
  var isFixLeft = typeof fixLeft === 'number';
  var isFixRight = typeof fixRight === 'number';

  if (isFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft;
  }

  if (isFixRight) {
    fixedStyle.position = 'sticky';
    fixedStyle.right = fixRight;
  } // ====================== Align =======================


  var alignStyle = {};

  if (align) {
    alignStyle.textAlign = align;
  } // ====================== Render ======================


  var title;

  if (ellipsis) {
    if (typeof childNode === 'string') {
      title = childNode;
    } else if (React.isValidElement(childNode) && typeof childNode.props.children === 'string') {
      title = childNode.props.children;
    }
  }

  var componentProps = _objectSpread({
    title: title
  }, additionalProps, {
    colSpan: mergedColSpan && mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan && mergedRowSpan !== 1 ? mergedRowSpan : null,
    className: classNames(cellPrefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left"), isFixLeft), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left-first"), firstFixLeft), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left-last"), lastFixLeft), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right"), isFixRight), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right-first"), firstFixRight), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right-last"), lastFixRight), _defineProperty(_classNames, "".concat(cellPrefixCls, "-ellipsis"), ellipsis), _defineProperty(_classNames, "".concat(cellPrefixCls, "-with-append"), appendNode), _classNames), additionalProps.className, cellClassName),
    style: _objectSpread({}, additionalProps.style, {}, alignStyle, {}, fixedStyle, {}, cellStyle),
    ref: isRefComponent(Component) ? ref : null
  });

  return React.createElement(Component, Object.assign({}, componentProps), appendNode, childNode);
}

var RefCell = React.forwardRef(Cell);
RefCell.displayName = 'Cell';
export default RefCell;