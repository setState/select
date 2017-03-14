import React from 'react';

export default class Option extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  };

  static isSelectOption = true;
}
