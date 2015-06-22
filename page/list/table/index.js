let type = require('focus').component.types;
let builder = require('focus').component.builder;
let React = require('react');
let assign = require('object-assign');
let Table = require('../../../list/table').list.component;
let isFunction = require('lodash/lang/isFunction');

let ScrollBehaviourMixin = require('../mixin/scroll-behaviour-mixin');
let StoreMixin = require('../../../common/mixin/store-behaviour');

let tablePageMixin = {
  mixins: [ScrollBehaviourMixin, StoreMixin],

  /**@inheritDoc**/
  componentDidMount(){
    this.search();
  },

  /**@inheritDoc**/
  getDefaultProps(){
    return {
      criteria: {},
      Table: Table
    };
  },

  /**
   * properties validation
   */
  propTypes: {
    criteria: type('object'),
    Table: type('func'),
    lineComponent: type('func'),
    columns: type('object')
  },

  /**
   * @inheritDoc
   */
  getInitialState(){
    return {};
  },

  _buildListCriteria() {
    return {
      criteria: this._getCriteria(),
      pageInfos: {
        page: this.state.currentPage
        //order: this.state.orderSelected
      }
    };
  },

  _getCriteria(){
    if(this.getCriteria){
      return this._getCriteria();
    }
    if(this.refs.criteria) {
      return this.refs.criteria.getValue();
    }
  },

  /**
   * Handler when store emit a change event.
   */
  onChange() {
    this.setState(assign(this.this._getStateFromStores(), this.getScrollState()));
  },

  search(){
    if(!isFunction(this.props.loadListAction)){
      console.warn(`Your page seems to miss a search action, add in your props a {loadListAction: function(criteria}`, this.props.searchAction);
    }
    this.props.loadListAction(this._buildListCriteria());
  },

  /**
   * Get the table representation of the list.
   */
  getTableComponent(){
    return (
      <this.props.Table
        data={this.state.list}
        lineComponent={this.props.lineComponent}
        columns={this.props.columns}
        sortColumn={this.props.sortColumn}
        onLineClick={this.props.onLineClick}
        isLoading={this.state.isLoading}
        hasMoreData={this.state.hasMoreData}
        isManualFetch={this.state.isManualFetch}
        />
    );
  }

  /**@inheritDoc**/
  /*render(){
    return (
      <div className="table-panel" data-focus="table-panel">
        {this.getTableComponent()}
      </div>
    );
  }*/
};

module.exports = builder(tablePageMixin, true);
