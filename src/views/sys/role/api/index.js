import _http from '@/utils/http'

export default {
    roleList(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/list', apiName: '角色列表(下拉)'}, params, loading, headers)
    },
    roleListAll(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/listAll', apiName: '角色列表'}, params, loading, headers)
    },
    roleAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/add', apiName: '新增角色'}, params, loading, headers)
    },
    roleEdit(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/edit', apiName: '编辑角色'}, params, loading, headers)
    },
    roleDetail(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/detail', apiName: '角色详情'}, params, loading, headers)
    },
    roleDel(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/del', apiName: '删除'}, params, loading, headers)
    },
}
