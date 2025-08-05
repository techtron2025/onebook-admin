import _http from '@/utils/http'

export default {
    login(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/login', apiName: '登录'}, params, loading, headers)
    },
    userInfo(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/userInfo', apiName: '获取用户信息'}, params, loading, headers)
    },
    logout(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/logout', apiName: '退出登录'}, params, loading, headers)
    },
}
