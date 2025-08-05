import _http from '@/utils/http'

export default {
    list(params, loading, headers) {
        return _http('post', {url: '/api/admin/setting/settingList', apiName: '设置列表'}, params, loading, headers)
    },

    add(params, loading, headers) {
        return _http('post', {url: '/api/admin/setting/settingAdd', apiName: '新增'}, params, loading, headers)
    },

    edit(params, loading, headers) {
        return _http('post', {url: '/api/admin/setting/settingEdit', apiName: '编辑'}, params, loading, headers)
    },
    detail(params, loading, headers) {
        return _http('post', {url: '/api/admin/setting/settingDetail', apiName: '详情'}, params, loading, headers)
    },
    del(params, loading, headers) {
        return _http('post', {url: '/api/admin/setting/settingDel', apiName: '删除'}, params, loading, headers)
    },
    upload(params, loading, headers) {
        return _http('post', {url: '/api/common/upload/single', apiName: '图片上传'}, params, loading, headers)
    },
}
