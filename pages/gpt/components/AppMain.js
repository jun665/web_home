class AppMain {


    main = {
        components: {
            IconButton: new IconButton().type,
            Message: new Message().body
        },
        template: `
            <main class="flex-1 overflow-hidden">
                <div id="scrollRef" ref="scrollRef" class="h-full overflow-hidden overflow-y-auto">
                    <div id="image-wrapper" class="w-full max-w-screen-xl m-auto dark:bg-[#101014]" :class="[isMobile ? 'p-2' : 'p-4']">
                        <!-- 无消息 -->
                        <template v-if="!list.length">
                            <div class="flex items-center justify-center mt-4 text-center text-neutral-300">
                                <icon-button type="0" icon="ri:bubble-chart-fill" class="mr-2 text-3xl"></icon-button>
                                <span>{{ info.left.noMessage }}</span>
                            </div>
                        </template>
                        <!-- 消息列表 -->
                        <template v-else>
                            <div>
                                <!--单个消息 -->
                                <message v-for="(item, index) of list" :key="index"
                                         :date-time="item.dateTime"
                                         :text="item.text"
                                         :inversion="item.inversion"
                                         :error="item.error"
                                         :loading="item.loading"
                                         @regenerate="onRegenerate(index)"
                                         @delete="handleDelete(index)"
                                         :is-mobile="isMobile"
                                ></message>
                                <!-- 停止响应按钮 -->
                                <div class="sticky bottom-0 left-0 flex justify-center">
                                      <n-button v-if="loading" @click="handleStop">
                                        <template #icon>
                                             <icon-button type="0" icon="ri:stop-circle-line"></icon-button>
                                        </template>
                                        <label>{{ info.chat.stopChat }}</label>
                                      </n-button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </main>
       `,
        props: {
            isMobile: {
                type: Boolean,
                default: false
            },
            list: {
                type: Array,
                default: () => []
            },
            info: {
                type: Object,
                default: () => {}
            }

        },
        data(){
            return {
                // 重新加载loading
                loading: false

            }
        },
        watch:{
            loading(){
                this.$emit('changeLoading', this.loading)
            }
        },
        methods:{
            // 重新生成
            onRegenerate(index){
                this.loading = true

                alert("重新生成!")
                // this.loading = false
            },
            handleDelete(index){
                this.list.splice(index,1)
            },
            // 停止响应
            handleStop(){
                this.loading = false
            }
        }

    }


}