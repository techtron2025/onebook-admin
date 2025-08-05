// data-url 这个自定义属性，在盒子上必须设置

let type = 'img'

const lazy = {
    async mounted(el, binding) {
        type = binding.value
        if (type == 'img') {
            let imgs = el.getElementsByTagName('img')
            for (let i = 0; i < imgs.length; i++) {
                observer.observe(imgs[i])
            }
        } else if (type == 'bg') {
            observer.observe(el)
        }
    },
}
// 交叉观察器
const observer = new IntersectionObserver((arr) => {
    //arr 是被观察的元素集合
    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i]

        // 通过这个属性判断是否在视口中
        if (item.isIntersecting) {
            // 图片标签
            const _target = item.target
            if (type == 'img') {
                //     设置图片的模糊度
                _target.style.filter = 'blur(10px)'
                _target.src = item.target.getAttribute('data-src')
                //     加载完毕后，恢复模糊度
                _target.onload = () => {
                    _target.style.filter = 'blur(0px)'
                }
                // 背景图片
            } else if (type == 'bg') {
                _target.style.filter = 'blur(10px)'
                _target.style.backgroundImage = `url(${item.target.getAttribute('data-url')})`
                let img = new Image()
                img.src = item.target.getAttribute('data-url')
                img.onload = () => {
                    _target.style.filter = 'blur(0px)'
                }
            }

            observer.unobserve(_target)
        }
    }
})

export default lazy
