import {ref} from 'vue'
/* 
 pagination 
*/
export const usePagination = (fun) => {
    const pageNum = ref(1)
    const pageSize = ref(20)
    const total = ref(0)
    const handleSizeChange = (val) => {
        pageSize.value = val
        fun()
    }

    const handleCurrentChange = (val) => {
        pageNum.value = val
        fun()
    }

    // 页面要使用的要暴露出去
    return {
        pageNum,
        pageSize,
        total,
        handleSizeChange,
        handleCurrentChange,
    }
}
