import _http from '@/utils/http'

export default {
    labelList(params, loading, headers) {
        return _http('post', {url: '/api/admin/label/list', apiName: '标签列表'}, params, loading, headers)
    },
    labelAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/label/add', apiName: '标签新增'}, params, loading, headers)
    },
    labelEdit(params, loading, headers) {
        return _http('post', {url: '/api/admin/label/edit', apiName: '标签编辑'}, params, loading, headers)
    },
    labelDetail(params, loading, headers) {
        return _http('post', {url: '/api/admin/label/detail', apiName: '标签详情'}, params, loading, headers)
    },
    labelDel(params, loading, headers) {
        return _http('post', {url: '/api/admin/label/del', apiName: '删除'}, params, loading, headers)
    },
}
