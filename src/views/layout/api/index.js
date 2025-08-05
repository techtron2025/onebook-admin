import _http from '@/utils/http'

export default {
  logout(params, loading, headers) {
    return _http('post', { url: '/carinsu/login/logout', apiName: '退出登录' }, params, loading, headers)
  },

}
