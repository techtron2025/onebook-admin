import _http from '@/utils/http'

export default {
    list(params, loading, headers) {
        return _http('post', {url: '/api/admin/visitor/visitorList', apiName: '访客列表'}, params, loading, headers)
    },
    del(params, loading, headers) {
        return _http('post', {url: '/api/admin/visitor/visitorDel', apiName: '删除'}, params, loading, headers)
    },
}
