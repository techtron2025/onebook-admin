import _http from '@/utils/http'

export default {
    list(params, loading, headers) {
        return _http('post', {url: '/api/admin/message/messageList', apiName: '留言列表'}, params, loading, headers)
    },
    del(params, loading, headers) {
      return _http('post', {url: '/api/admin/message/messageDel', apiName: '删除'}, params, loading, headers)
  },
}
