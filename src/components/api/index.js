import _http from '@/utils/http'

export default {
    labelAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/label/add', apiName: '标签新增'}, params, loading, headers)
    },
}
