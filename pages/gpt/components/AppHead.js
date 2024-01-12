

class AppHead {


    main = {
        components: {
            IconButton: new IconButton().type
        },
        template: `
                <header class="sticky top-0 left-0 right-0 z-30 border-b dark:border-neutral-800 bg-white/80 dark:bg-black/20 backdrop-blur" >
                    <div class="relative flex items-center justify-between min-w-0 overflow-hidden h-14">
                        <!-- 折叠按钮 -->
                        <div class="flex items-center justify-center w-11 h-11"  @click="handleUpdateCollapsed">
                            <icon-button size="24" type="0" :icon="collapsed ? 'ri:align-justify':'ri:align-right'"></icon-button>
                        </div>
                        <!-- 会话标题 -->
                        <h1 class="flex-1 px-4 pr-6 overflow-hidden cursor-pointer select-none text-ellipsis whitespace-nowrap" @dblclick="onScrollToTop" >
                            {{ title }}
                        </h1>
                        <!-- 导出和切换 -->
                        <div class="flex items-center space-x-2">
                            <!-- 切换图标 -->
                            <span class="text-xl" :class="{ 'text-[#4b9e5f]': usingContext, 'text-[#a8071a]': !usingContext }" @click="toggleUsingContext">
                                <icon-button color="#18A058"  icon="ri:chat-history-line"></icon-button>
                            </span>
                            <!-- 导出图标 -->
                            <span class="text-xl text-[#4f555e] dark:text-white" @click="handleExport">
                                <icon-button  icon="ri:download-2-line"></icon-button>
                            </span>
                        </div>
                    </div>
                </header>
       `,
        props:{
            // 关闭侧边?
            collapsed: { type: Boolean, default: false },
            // 使用上下文?
            usingContext: { type: Boolean, default: false },
            // 对话标题
            title: { type: String, default: '' }
        },
        data(){
            return {

            }
        },
        methods:{
            handleUpdateCollapsed(){
                this.$emit("changeCollapsed")
            },
            onScrollToTop(){
                // 将对话内容滚动到顶部
                const scrollRef = document.querySelector('#scrollRef')
                if (scrollRef)
                    naive.nextTick(() => scrollRef.scrollTop = 0)
            },
            // 导出
            handleExport(){
                this.$emit("export")
            },
            // 切换上下文
            toggleUsingContext(){
                this.$emit("changeContext")
            }
        }

    }


}