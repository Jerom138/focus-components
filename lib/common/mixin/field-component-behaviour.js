'use strict';

var assign = require('object-assign');
/**
 * Identity function
 * @param  {object} d - data to treat.
 * @return {object}  - The same object.
 */
function identity(d) {
    return d;
}

var fieldBehaviourMixin = {
    /**
    * Build the field properties.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field
    * @param {object} context - Function context, this by default.
    * @returns {object} - The constructed props for the field.
    */
    _buildFieldProps: function _buildFieldProps(name, options, context) {
        if (options === undefined) options = {};

        context = context || this;
        //Properties.
        var isEdit = options.isEdit !== undefined ? options.isEdit : context.state.isEdit;
        var value = options.value !== undefined ? options.value : context.state[name];
        var def = context.definition && context.definition[name] ? context.definition[name] : {};
        var listName = options.listName || def.listName;
        //hasLabel
        var hasLabel = (function hasLabel() {
            if (options.hasLabel !== undefined) {
                return options.hasLabel;
            }
            if (def.hasLabel !== undefined) {
                return options.hasLabel;
            }return true;
        })();
        //Build a container for the props.
        name = options.name || this.definitionPath + '.' + name;
        var propsContainer = {
            name: name,
            label: def.label || options.label || name,
            ref: name,
            value: value,
            domain: options.domain || def.domain,
            error: context.state.error ? context.state.error[name] : undefined,
            //Mode
            isEdit: isEdit,
            hasLabel: hasLabel,
            isRequired: def.isRequired || def.required, //legacy on required on model generation.
            //Style
            style: options.style,
            //Methods
            validator: def.validator,
            formatter: def.formatter || identity,
            unformatter: def.unformatter || identity,
            //Component
            FieldComponent: def.FieldComponent,
            InputLabelComponent: def.InputLabelComponent,
            InputComponent: def.InputComponent,
            TextComponent: def.TextComponent,
            DisplayComponent: def.DisplayComponent,
            options: options.options || def.options //Add options to the fields
        };
        //Extend the options object in order to be able to specify more options to thie son's component.
        var fieldProps = assign(options, propsContainer);
        // Values list.
        var refContainer = options.refContainer || context.state.reference;
        if (refContainer && refContainer[listName]) {
            assign(fieldProps, { values: refContainer[listName] });
        }
        return fieldProps;
    }
};

module.exports = fieldBehaviourMixin;