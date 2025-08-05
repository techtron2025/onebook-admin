export default function (el, options) {
    let {width, height} = options
    console.log(width, height)
    console.log(innerWidth, innerHeight)
//     alert(innerHeight)

    function init() {
        const scaleX = innerWidth / width
        const scaleY = innerHeight / height
        const scale = Math.min(scaleX, scaleY)

        const left = (innerWidth - width * scale) / 2
        const top = (innerHeight - height * scale) / 2

        console.log(scaleX, scaleY)

        el.style.transform = `translate(${left}px,${top}px) scale(${scale})`
    }
    init()
    addEventListener('resize', init)
}
