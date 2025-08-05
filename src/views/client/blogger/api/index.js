import _http from '@/utils/http'

export default {
    getBloger(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/getBloger', apiName: '获取博主'}, params, loading, headers)
    },
    setBloger(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/setBloger', apiName: '设置博主'}, params, loading, headers)
    },
    upload(params, loading, headers) {
        return _http('post', {url: '/api/admin/upload', apiName: '图片上传'}, params, loading, headers)
    },
}
