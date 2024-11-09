
const clazzCard = [
    {
        "className": "工具",
        "show": true,
        "children": [
            {
                "title": "悠悠有品",
                "show": true,
                "type": "page",
                "info": "./pages/csgo_youyou/index.html",
                "img": "components/card_image/csgo_youyou.png",
                "desc": "查看悠悠有品上csgo饰品信息，比较与steam的价格比例。"
            },
            {
                "title": "BUFF市场",
                "show": true,
                "type": "page",
                "info": "./pages/csgo_buff/index.html",
                "img": "components/card_image/csgo_buff.png",
                "desc": "查看buff上csgo饰品信息，比较与steam的价格比例。"
            },
            {
                "title": "和风天气",
                "show": false,
                "type": "code",
                "info": "he-plugin-standard",
                "desc": "简易的天气插件，可以以卡片嵌入到网页中。"
            },
            {
                "title": "电子绘图",
                "show": true,
                "type": "page",
                "info": "https://simulator.io/board",
                "img": "components/card_image/img.png",
                "desc": "电路仿真在线绘图网站，可以很方便地画自己的逻辑电路并调试。"
            },
            {
                "title": "足球胜平负",
                "show": false,
                "type": "page",
                "info": "./pages/picks_soccer/index.html",
                "img": "components/card_image/img_1.png",
                "desc": "用于足球胜负平的随机投注，可以显示最新的比赛信息，解决投注选择困难。(目标网站似乎已停止使用此接口)"
            },
            {
                "title": "Chat GPT",
                "show": false,
                "type": "page",
                "info": "http://gpt.wenp.top/",
                "img": "",
                "desc": ""
            },
        ]
    },
    {
        "className": "特效",
        "show": true,
        "children": [
            {
                "title": "重力笔",
                "show": true,
                "type": "page",
                "info": "./pages/gravity_points/index.html",
                "img": "pages/gravity_points/img.png",
                "desc": "这是一个模拟重力的页面，点击屏幕将添加重力，粒子将会在受到重力影响下改变移动轨迹。"
            },
            {
                "title": "滑稽",
                "show": true,
                "type": "page",
                "info": "./pages/comical/index.html",
                "img": "./pages/comical/images/ParticleSmoke.png",
                "desc": "滑稽滑稽滑稽滑稽滑稽滑稽滑稽滑稽滑稽滑稽滑稽..."
            },
            {
                "title": "烟花",
                "show": true,
                "type": "page",
                "info": "./pages/firework-simulator-v2/index.html",
                "img": "./pages/firework-simulator-v2/icon.png",
                "desc": "一个播放烟花的界面，点击屏幕可以触发烟花效果，也可以打开声音。"
            },
            {
                "title": "粒子效果",
                "show": true,
                "type": "page",
                "info": "./pages/particle_effects/index.html",
                "img": "pages/particle_effects/img.png",
                "desc": "各种粒子形状，点击屏幕将会触发一些变化。"
            },
            {
                "title": "万花筒",
                "show": true,
                "type": "page",
                "info": "./pages/kaleidoscope/index.html",
                "img": "pages/kaleidoscope/img.png",
                "desc": "万花筒特效，移动鼠标将会产生不同的视觉效果。"
            },
            {
                "title": "八卦时钟",
                "show": true,
                "type": "page",
                "info": "./pages/time8/index.html",
                "img": "pages/time8/img.png",
                "desc": "这是一个时钟，以中文八卦的形式来显示时间。"
            }
        ]
    },
    {
        "className": "其他",
        "show": true,
        "children": [
            {
                "title": "gpt重构",
                "show": false,
                "type": "page",
                "info": "./pages/gpt/index.html",
                "img": "pages/gpt/img.png",
                "desc": "对chat-gpt的一个开源项目页面进行重写，仅做展示，实际不提供功能。"
            },
            {
                "title": "个人博客",
                "show": false,
                "type": "page",
                "info": "http://bk.wenp.top/",
                "img": "",
                "desc": ""
            },
            {
                "title": "404页面",
                "show": true,
                "type": "page",
                "info": "./pages/404/index.html",
                "img": "",
                "desc": ""
            },
            {
                "title": "音乐播放",
                "show": true,
                "type": "page",
                "info": "./pages/player/index.html",
                "img": "",
                "desc": ""
            },

        ]
    }
]


// 获取全部card
function allCard(){
    const list = []
    for (let clazzCardElement of clazzCard) {
        list.push(...clazzCardElement["children"])
    }
    return list
}

// 分类：含全部
function allAndClassCard() {
    const all = {
        "className": "全部",
        "show": true,
        "children": allCard()
    }


    const list = []
    list.push(...clazzCard)
    list.push(all)
    return list
}
