import _http from '@/utils/http'

export default {
    login(params, loading, headers) {
        return _http('post', {url: '/carinsu/login/login', apiName: '登录'}, params, loading, headers)
    },

}
