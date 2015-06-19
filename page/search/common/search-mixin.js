// Dependencies

let isFunction = require('lodash/lang/isFunction');

// Stores

let BuiltInSearchStore = Focus.search.builtInStore;

let SearchMixin = {
    getDefaultProps() {
        return ({
            store: BuiltInSearchStore.searchStore
        });
    },

    /**
     * Returns the search criteria sent to the store.
     * @param {string} scope Current scope.
     * @param {string} query Current query.
     * @param {object} facets Selected facets.
     * @returns {object} Formatted criteria {criteria:{}, pagesInfos:{}, facets:{}}.
     */
    _buildSearchCriteria(facets) {
        let query = Focus.search.builtInStore.queryStore.getQuery() || '';
        let scope = Focus.search.builtInStore.queryStore.getScope() || '';
        return {
            criteria: {scope, query},
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets
        };
    },
    getSearchCriteria() {
        if(!isFunction(this.props.searchAction)){
          console.warn(`Your page seems to miss a search action, add in your props a {searchAction: function(scope, query, facets){}}`, this.props.searchAction);
        }
        return this._buildSearchCriteria(this.state.selectedFacetList);
    },
    search() {
        this.props.searchAction(
            this.getSearchCriteria()
        );
    }
};

module.exports = {
    mixin: SearchMixin
};
