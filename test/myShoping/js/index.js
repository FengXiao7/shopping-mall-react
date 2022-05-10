let left = document.querySelector('.arrow-l')
let right = document.querySelector('.arrow-r')
let bigImgList = document.querySelector('.bigImgList')
let ul = bigImgList.querySelector('ul')
let circles = document.querySelector('.circles')
let main = document.querySelector('.main')
//阀门,防止用户点击箭头过快,点击箭头关闭阀门，animate执行完开启阀门，
let flag = true
// 大图个数
let bigImgNum = ul.children.length
// 控制左右箭头点击以及控制小圆点selected
let num = 0
// 大图宽度
let bigImgWidth = bigImgList.offsetWidth
// 自动播放定时器，相当于自己点右箭头
let timer = setInterval(() => {
    right.click()
}, 2000)
// 鼠标移入mian关闭定时器
main.addEventListener('mouseenter', () => {
    clearInterval(timer)
    // console.log('进入')
})
// 鼠标移出mian开启定时器(不要开启新的了！)
main.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
        right.click()
    }, 2000)
    // console.log('关闭')
})


// 根据图片数创建小圆点数，并添加点击事件
for (let i = 0; i < bigImgNum; i++) {
    let li = document.createElement('li')
    li.setAttribute('index', i)
    circles.appendChild(li)
    // 小圆圈添加点击事件:变色,移动图片
    li.addEventListener('click', function () {
        for (let i = 0; i < bigImgNum; i++) {
            circles.children[i].className = ""
        }
        this.className = "selected"
        let index = li.getAttribute('index')
        // 点击小圆点的时候把num设为index
        num = index
        animate(ul, -index * bigImgWidth)
    })
    // 第一个点默认点亮
    circles.children[0].className = 'selected'
}

// 点击右箭头移动图片,同时改变小圆点颜色
right.addEventListener('click', function () {
    if (flag) {
        flag = false
        num++
        // console.log(num)
        // 置空所有小圆点颜色
        for (let i = 0; i < bigImgNum; i++) {
            circles.children[i].className = ""
        }
        // 增加到图片数时置为0
        if (num === bigImgNum) {
            num = 0
        }
        // 只保留正确位置的小圆点颜色
        circles.children[num].className = 'selected'

        animate(ul, -num * bigImgWidth, () => flag = true)
    }

})
// 点击左箭头移动图片,同时改变小圆点颜色
left.addEventListener('click', function () {
    if (flag) {
        flag = false
        num--
        // 置空所有小圆点颜色
        for (let i = 0; i < bigImgNum; i++) {
            circles.children[i].className = ""
        }
        // 减少到-1时置为图片数-1
        if (num === -1) {
            num = bigImgNum - 1
        }
        // 只保留正确位置的小圆点颜色
        circles.children[num].className = 'selected'
        animate(ul, -num * bigImgWidth, () => flag = true)
    }

})

