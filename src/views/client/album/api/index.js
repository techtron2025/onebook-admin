import _http from '@/utils/http'

export default {
    list(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumList', apiName: '相册列表'}, params, loading, headers)
    },

    add(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumAdd', apiName: '新增'}, params, loading, headers)
    },

    edit(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumEdit', apiName: '编辑'}, params, loading, headers)
    },
    detail(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumDetail', apiName: '详情'}, params, loading, headers)
    },
    del(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumDel', apiName: '删除'}, params, loading, headers)
    },
    batchUpload(params, loading, headers) {
        return _http('post', {url: '/api/common/upload/batch', apiName: '批量上传'}, params, loading, headers)
    },
    pic(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumPic', apiName: '查看图片'}, params, loading, headers)
    },
    delPic(params, loading, headers) {
        return _http('post', {url: '/api/admin/album/albumDelPic', apiName: '删除图片'}, params, loading, headers)
    },
    upload(params, loading, headers) {
        return _http('post', {url: '/api/common/upload/single', apiName: '图片上传'}, params, loading, headers)
    },
}
