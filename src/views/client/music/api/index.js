import _http from '@/utils/http'

export default {
    musicList(params, loading, headers) {
        return _http('post', {url: '/api/admin/music/list', apiName: '歌曲列表'}, params, loading, headers)
    },
    musicAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/music/add', apiName: '新增'}, params, loading, headers)
    },
    musicEdit(params, loading, headers) {
        return _http('post', {url: '/api/admin/music/edit', apiName: '编辑'}, params, loading, headers)
    },
    musicDel(params, loading, headers) {
        return _http('post', {url: '/api/admin/music/del', apiName: '删除'}, params, loading, headers)
    },
    musicDetail(params, loading, headers) {
        return _http('post', {url: '/api/admin/music/detail', apiName: '详情'}, params, loading, headers)
    },
}
