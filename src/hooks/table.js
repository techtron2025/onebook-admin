
import { ref, onMounted, onBeforeUnmount } from "vue";
/* 
 计算table height的值
*/
export const useTable = (height) => {


    // 动态设置table的高度
    const headerCellStyle = ref({ color: '#505050', backgroundColor: '#fff', textAlign: 'center' })
    const container = ref()
    const tabHeight = ref(300)
    onMounted(() => {
        listenResizeTable()
        window.addEventListener('resize', listenResizeTable)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('resize', listenResizeTable)
    })
    const listenResizeTable = () => {
        if (container.value) {
            tabHeight.value = container.value.clientHeight - height
        }
    }
    // 页面要使用的要暴露出去
    return {
        headerCellStyle,
        container,
        tabHeight
    }

}