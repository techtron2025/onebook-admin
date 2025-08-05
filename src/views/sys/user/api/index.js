import _http from '@/utils/http'

export default {
    userList(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/list', apiName: '用户列表'}, params, loading, headers)
    },
    userAdd(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/add', apiName: '新增用户'}, params, loading, headers)
    },
    userEdit(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/edit', apiName: '编辑用户'}, params, loading, headers)
    },
    userDetail(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/detail', apiName: '详情'}, params, loading, headers)
    },
    userDel(params, loading, headers) {
        return _http('post', {url: '/api/admin/user/del', apiName: '删除'}, params, loading, headers)
    },
    roleList(params, loading, headers) {
        return _http('post', {url: '/api/admin/role/list', apiName: '角色列表'}, params, loading, headers)
    },
}
