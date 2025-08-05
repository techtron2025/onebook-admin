import _http from '@/utils/http'

export default {
  resetpwd(params, loading, headers) {
    return _http('post', { url: '/carinsu/login/resetpwd', apiName: '修改密码' }, params, loading, headers)
  },

}
