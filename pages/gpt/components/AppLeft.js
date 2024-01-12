class AppLeft {

    static ingTitleMessage = main.getLanguage()

    chatItem = {
        components:{
            iconButton: new IconButton().type
        },
        template: `
             <a class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group dark:border-neutral-800 dark:hover:bg-[#24272e]"
               :class="isActive && ['border-[#4b9e5f]', 'bg-neutral-100', 'text-[#4b9e5f]', 'dark:bg-[#24272e]', 'dark:border-[#4b9e5f]', 'pr-14']"
               @click="chatSelect"
            >
                <!-- LOGO -->
                <span>
                    <icon-button :size="null" type="0" color="#18A058" icon="ri:message-3-line"></icon-button>
                </span>
                <!-- 标题 -->
                <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
                    <n-input v-if="item.isEdit" v-model:value="item.title" size="tiny" @keypress="chatEnter(item, false, $event)"></n-input>
                    <span v-else>{{ item.title }}</span>
                </div>
                <!-- 编辑/删除标题 -->
                <div v-if="isActive" class="absolute z-10 flex visible right-1">
                    <!-- 编辑保存 -->
                    <template v-if="item.isEdit">
                        <icon-button class="p-1"  @click="chatEdit(item, false, $event)" :size="null" type="0" color="#18A058" icon="ri:save-line"></icon-button>
                    </template>
                    <template v-else>
                        <!-- 编辑 -->
                        <icon-button class="p-1"  @click="chatEdit(item, true, $event)" :size="null" type="0" color="#18A058" icon="ri:edit-line"></icon-button>
                        <!-- 删除 -->
                        <n-popconfirm placement="bottom" @positive-click="chatDelete">
                            <template #trigger>
                                <icon-button class="p-1"  :size="null" type="0" color="#18A058" icon="ri:delete-bin-line"></icon-button>
                            </template>
                            {{ title }}
                        </n-popconfirm>
                    </template>
                </div>
            </a>
        `,
        props: {
            item: {
                type: Object,
                default: () => {}
            },
            title: { type: String, default: '' },
            // 是否被选择
            isActive: {
                type: Boolean,
                default: false
            }
        },
        methods: {

            chatSelect(){
                this.$emit('chatSelect')
                // 前一个选择的元素item.isEdit设置为false
            },

            chatEnter(){

            },

            // 编辑聊天名称
            chatEdit(item, isEdit, event){
                item.isEdit = isEdit

                if (isEdit) {
                    // 编辑
                } else {
                    // 保存

                }

            },

            // 删除聊天
            chatDelete(){
                this.$emit('chatDelete' )
            },
        }
    }

    chatList = {
        components:{
            IconButton: new IconButton().icon,
            ChatItem: this.chatItem
        },
        template: `
            <div class="flex-1 min-h-0 pb-4 overflow-hidden">
                <n-Scrollbar class="px-4">
                    <div class="flex flex-col gap-2 text-sm">
                        <!-- 无数据 -->
                        <template v-if="!list.length">
                            <div class="flex flex-col items-center mt-4 text-center text-neutral-300">
                                <icon-button :size="30" type="0"  icon="ri:inbox-line" class="mb-2 text-3xl" ></icon-button>
                                <span>{{ info.left.noChat }}</span>
                            </div>
                        </template>
                        <!-- 有数据 -->
                        <template v-else>
                            <!-- 对话列表 -->
                            <div v-for="(item, index) of list" :key="index">
                                <chat-item :is-active="isActive(item.uuid)" :item="item" :title="info.chat.deleteHistoryConfirm"  @chat-select="chatSelect(item, index)" @chat-delete="chatDelete(index, $event)"></chat-item>
                            </div>
                        </template>
                    </div>
                </n-Scrollbar>

            </div>
        `,
        props: {
            list: {
                type: Array,
                default: ()=>[]
            },
            info: {
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return {
                // 活动的chat
                isActiveChat: '100',
                selectIndex: -1,
            }
        },
        methods: {
            isActive(uuid){
                return this.isActiveChat === uuid
            },
            chatSelect(item, index){
                // 前一个选择的元素item.isEdit设置为false
                const active = this.selectIndex
                if(active >= 0 && active !== index){
                    this.list[active].isEdit = false
                }
                this.selectIndex = index
                this.isActiveChat = item.uuid
            },
            chatDelete(index, event){
                this.list.splice(index,1)
            }
        }
    }

    promptButton = {
        components:{
            iconButton: new IconButton().type
        },
        template:`
            <div class="p-4 flex items-center">
                <span class="text-xl text-[#4f555e] dark:text-white" @click="chatClear">
                    <icon-button icon="ri:delete-bin-line"></icon-button>
                </span>
                <!-- 提示按钮 -->
                <div class="text-xl text-[#4f555e] dark:text-white"  style="margin-left: 10px; width: 100%;">
                    <n-button block @click="showPrompt = true"> {{ title }}</n-button>
                </div>
            </div>
            <!--    <PromptStore v-if="showPrompt" v-model:visible="showPrompt"/>-->
        `,
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                showPrompt: false
            }
        },
        methods: {
            chatClear(){
                this.$emit('chatClear')
            }
        }
    }

    userDiv = {
        components:{
            iconButton: new IconButton().type,
            UserAvatar: new UserAvatar().type
        },
        template: `
            <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
                <!-- 用户信息 -->
                <div class="flex-1 flex-shrink-0 overflow-hidden">
                    <user-avatar></user-avatar>
                </div>
                <!-- 设置 -->
                <icon-button @click="showSetting = true" icon="ri:settings-4-line" :hover="info.setting.setting"></icon-button>
            </footer>
            <!--    <Setting v-if="showSetting" v-model:visible="showSetting"/>-->
        `,
        props: {
            info: {
                type: Object,
                default: ()=>{}
            }

        },
        data(){
            return {
                showSetting: false
            }
        }
    }


    main = {
        components:{
            iconButton: new IconButton().type,
            ChatList: this.chatList,
            PromptButton: this.promptButton,
            UserDiv: this.userDiv
        },
        template: `
                    <div class="flex flex-col h-full" :style="mobileSafeArea">
                        <!-- 操作按钮 -->
                        <main class="flex flex-col flex-1 min-h-0">
                            <!-- 新增按钮 -->
                            <div class="p-4">
                           
                                <n-button dashed block @click="chatAdd"> {{ info.left.addChat }} </n-button>
                            </div>
                            <!-- 对话列表 -->
                            <chat-list :info="info" :list="chatList"></chat-list>
                            <prompt-button :title="info.left.promptStore" @chat-clear="chatClear"></prompt-button>
                        </main>
                        <!-- 用户信息 -->
                        <user-div :info="info"></user-div>
                    </div>
        `,
        props: {
            isMobile: {
                type: Boolean,
                default: false,
            },
            info: {
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return {
                chatList: []
            }
        },

        computed:{
            mobileSafeArea() {
                if (this.isMobile) {
                    return {
                        paddingBottom: 'env(safe-area-inset-bottom)',
                    }
                }
                return {}
            },
        },
        methods:{
            // 新建聊天
            chatAdd(){
                this.chatList.push({ uuid: new Date(), isEdit: false, title: this.info.left.newChat, })
            },
            // 清空聊天
            chatClear(){
                this.chatList = []
            },
        }
    }


}