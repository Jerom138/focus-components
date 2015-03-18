//Dependencies.
var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: 'text',
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type('string'),
    value: type(['string', 'number']),
    name: type('string'),
    style: type('object')
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateInputText() {
    return {
      value: this.props.value
    };
  },
  /**
   * Update the component.
   * @param {object} newProps - The new props to update.
   */
  componentWillReceiveProps: function inputWillReceiveProps(newProps){
    this.setState({value: newProps.value});
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validate: function validateInputText() {
    var value = this.getValue();
    if (this.props.isRequired && (value === undefined || value === "")) {
      return `Le champ ${this.props.name} est requis`;
    }
    if (this.props.validator) {
      return this.props.validator(value);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getInputTextValue() {
    return this.getDOMNode().value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function inputOnChange(event){
    //On change handler.
    if(this.props.onChange){
      return this.props.onChange(event);
    }else {
      //Set the state then call the change handler.
      this.setState({value: event.target.value});      
    }

  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return (
      <input
        id={this.props.name}
        name={this.props.name}
        value={this.state.value}
        type={this.props.type}
        className={this.props.style.class}
        onChange={this._handleOnChange}
      />
    );
  }
};


module.exports = builder(inputTextMixin);