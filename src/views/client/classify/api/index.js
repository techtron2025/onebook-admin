import _http from '@/utils/http'

export default {
    classifyList(params, loading, headers) {
        return _http('post', {url: '/api/admin/classify/list', apiName: '分类列表'}, params, loading, headers)
    },
    classifyAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/classify/add', apiName: '分类新增'}, params, loading, headers)
    },
    classifyEdit(params, loading, headers) {
        return _http('post', {url: '/api/admin/classify/edit', apiName: '分类编辑'}, params, loading, headers)
    },
    classifyDetail(params, loading, headers) {
        return _http('post', {url: '/api/admin/classify/detail', apiName: '分类详情'}, params, loading, headers)
    },
    classifyDel(params, loading, headers) {
      return _http('post', {url: '/api/admin/classify/del', apiName: '删除'}, params, loading, headers)
  },
}
