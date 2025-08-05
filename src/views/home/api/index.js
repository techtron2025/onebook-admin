import _http from '@/utils/http'

export default {
    userInfo(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/userInfo', apiName: '获取用户信息'}, params, loading, headers)
    },
    visitorAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/visitor/addVisitor', apiName: '新增访客'}, params, loading, headers)
    },
    tabList(params, loading, headers) {
        return _http('post', {url: '/api/admin/home/tabList', apiName: '首页tab数据'}, params, loading, headers)
    },
    echartList(params, loading, headers) {
      return _http('post', {url: '/api/admin/home/echart', apiName: '首页echart数据'}, params, loading, headers)
  },
}
