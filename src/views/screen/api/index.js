import _http from '@/utils/http'

export default {
    screenList(params, loading, headers) {
        return _http('post', {url: '/api/admin/screen/screenList', apiName: '数据大屏'}, params, loading, headers)
    },
}
