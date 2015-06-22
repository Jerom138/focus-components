let scrollInfo = require('../../mixin/scroll-info-mixin');
let scrollMixin = {
  mixins: [scrollInfo],

  getScrollState(){
    if (this.props.store) {
      let data = this._getStateFromStore();
      let hasMoreData = data.pageInfos && data.list && data.pageInfos.totalPages && data.pageInfos.currentPage < data.pageInfos.totalPages;
      let totalRecords = data.pageInfos ? data.pageInfos.totalRecords : undefined;
      return {
        list: data.list,
        hasMoreData,
        totalRecords,
        isLoading: false
      };
    }
    return {};
  }
};

module.exports = scrollMixin;
