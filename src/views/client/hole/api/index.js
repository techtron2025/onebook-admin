import _http from '@/utils/http'

export default {
    list(params, loading, headers) {
        return _http('post', {url: '/api/admin/hole/list', apiName: '树洞列表'}, params, loading, headers)
    },
    del(params, loading, headers) {
        return _http('post', {url: '/api/admin/hole/del', apiName: '删除'}, params, loading, headers)
    },
    status(params, loading, headers) {
        return _http('post', {url: '/api/admin/hole/status', apiName: '改变状态'}, params, loading, headers)
    },
}
