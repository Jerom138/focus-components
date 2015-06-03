// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;
let React = require('react');
let words = require('lodash/string/words');

// Components

let i18nMixin = require('../../common/i18n/mixin');
let Scope = require('./scope').component;

/**
 * SearchBar component
 * @type {Object}
 */
let SearchBar = {
    mixins: [i18nMixin],
    displayName: 'SearchBar',
    getDefaultProps() {
        return {
            placeholder: '',
            value: 'defaultValue',
            scope: undefined,
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help'
        };
    },
    propTypes: {
        placeholder: type('string'),
        value: type('string'),
        scope: type(['string', 'number']),
        scopes: type('array'),
        minChar: type('number'),
        loading: type('bool'),
        helpTranslationPath: type('string')
    },
    getInitialState() {
        return {
            value: this.props.value,
            scope: this.props.scope,
            loading: this.props.loading
        };
    },
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.loading !== undefined) {
            this.setState({loading: newProps.loading});
        }
    },
    getValue() {
        return {
            scope: this.refs.scope.getValue(),
            query: React.findDOMNode(this.refs.query).value
        };
    },
    _handleChange() {
        if (this.props.handleChange) {
            return this.props.handleChange(this.getValue());
        }
    },
    _handleKeyUp(event) {
        let val = event.target.value;
        if (val.length >= this.props.minChar) {
            if (this.props.handleKeyUp) {
                this.props.handleKeyUp(event);
            }
            this._handleChange();
        }
    },
    _handleChangeScope(event) {
        this._focusQuery();
        //If query not empty
        let query = this.getValue().query;
        if (!query || 0 === query.length) {
            return;
        }
        if (this.props.handleChangeScope) {
            this.props.handleChangeScope(event);
        }
        this._handleChange();
    },
    _handleOnClickScope() {
        this.setState({scope: this.refs.scope.getValue()}, this._handleChangeScope(event));
    },
    _renderHelp() {
        return (
            <div className='sb-help' ref='help'>
                <span name='share'/>
                <span>{this.i18n(this.props.helpTranslationPath)}</span>
            </div>
        );
    },
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    setStateFromSubComponent() {
        return this.setState(this.getValue(), this._focusQuery);
    },
    render() {
        let loadingClassName = this.props.loading ? 'sb-loading' : '';
        return (
            <div data-focus='search-bar'>
                <Scope handleOnClick={this._handleOnClickScope} list={this.props.scopes} ref='scope' value={this.state.scope}/>
                <input className={loadingClassName} onKeyUp={this._handleKeyUp} ref='query'  type='search' />
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);