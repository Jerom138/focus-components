//Target
//http://codepen.io/Sambego/pen/zDLxe
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');
var jQuery = require('jquery');

var checkBoxMixin = {
  mixins: [fieldGridBehaviourMixin],
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type('bool'),
    label: type('string'),
    style: type('object')
  },
  getInitialState: function() {
    return {
      isChecked: this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in  the DOM.
   * @returns The DOM node value.
   */
  getValue: function getValue() {
    return this.state.isChecked;
  },
  /**
   * Build the label class name.
   * @returns The label classame with the grid informations.
   */
  _labelClassName: function labelClassName(){
    return `paper-cb-label ${this._getContentOffsetClassName()} ${this._getContentGridClassName()}`;
  },
/*  componentDidMount: function(){
    if(jQuery.material && jQuery.material.init){
      jQuery.material.init();
    }
  },
  componentDidUpdate: function(){
    if(jQuery.material && jQuery.material.init){
      jQuery.material.init();
    }
  },*/
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderCheckBox() {
      return (

          <div className="paper-cb">
              <label className={this._labelClassName()}>
                  <input ref='checkbox'checked={this.state.isChecked} onChange={this._onChange} type='checkbox' className='paper-cbx' />
                  {this.props.label ? this.props.label : ''}
              </label>
          </div>
      );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
    if(nextProps.value !== undefined){
      this.setState({isChecked : nextProps.value});
    }
  }
};

module.exports = builder(checkBoxMixin);
