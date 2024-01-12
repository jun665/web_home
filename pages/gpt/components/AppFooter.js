class AppFooter {

   main = {
       components: {
           IconButton: new IconButton().type
       },
       template: `
                <footer :class="footerClass">
                    <div class="w-full max-w-screen-xl m-auto">
                        <div class="flex items-center justify-between space-x-2">
                            <!-- 清空图标 -->
                            <span class="text-xl text-[#4f555e] dark:text-white" @click="handleClear">
                                <icon-button icon="ri:delete-bin-line"></icon-button>
                            </span>
                            <!-- 下载图标 -->
                            <span v-if="!isMobile" class="text-xl text-[#4f555e] dark:text-white" @click="handleExport">
                                 <icon-button  icon="ri:download-2-line"></icon-button>
                             </span>
                            <!-- 切换消息图标 -->
                            <span v-if="!isMobile"  class="text-xl" :class="{ 'text-[#4b9e5f]': usingContext, 'text-[#a8071a]': !usingContext }" @click="toggleUsingContext">
                                  <icon-button color="#18A058"  icon="ri:chat-history-line"></icon-button>
                             </span>

                            <!-- 消息框 -->
                            <n-input ref="inputRef" v-model:value="prompt" type="textarea" :placeholder="isMobile ? info.chat.placeholderMobile : info.chat.placeholder" :autosize="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"></n-input>
                            <!-- 发送按钮 -->
                            <n-button :disabled="buttonDisabled" @click="handleSubmit">
                                <template #icon>
                                  <span class="dark:text-black">
                                      <icon-button type="0" icon="ri:send-plane-fill"></icon-button>
                                  </span>
                                </template>
                            </n-button>
                        </div>
                    </div>
                </footer>   
       `,
       props: {

           isMobile: {
               type: Boolean,
               default: false
           },
           info: {
               type: Object,
               default: () => {}
           },
           loading: {
               type: Boolean,
               default: false
           },
           usingContext:{
               type: Boolean,
               default: false
           }
       },
       watch:{
           loading(){

           }
       },
       data(){
           return {
               prompt: '',
               thisLoading: false
           }
       },
       computed:{
           // 禁用发送按钮
           buttonDisabled(){
               return this.loading || !this.prompt || this.prompt.trim() === ''
           },
           footerClass() {
               let classes = ['p-4']
               if (this.isMobile)
                   classes = ['sticky', 'left-0', 'bottom-0', 'right-0', 'p-2', 'pr-3', 'overflow-hidden']
               return classes
           },
       },
       methods:{
           handleClear(){
               this.$emit('clear')
           },
           handleExport(){
               this.$emit('export')
           },
           toggleUsingContext(){
               this.$emit('changeContext')
           },
           // 发送
           handleSubmit(){

           }
       }

   }


}