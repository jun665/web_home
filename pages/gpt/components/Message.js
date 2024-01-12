class Message {

    static iconComponent = new IconButton()
    static info = main.getLanguage()

    static getMarkdown(){
        // 设置主题
        function useTheme(theme, sefCss) {
            let oldStr, color
            // selector: https://highlightjs.org/static/demo/
            // download: https://highlightjs.org/download/  by '\styles\*.css'
            switch (theme){
                case 'idea-black': // IDEA 黑
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#a9b7c6;background:#282b2e}.hljs-bullet,.hljs-literal,.hljs-number,.hljs-symbol{color:#6897bb}.hljs-deletion,.hljs-keyword,.hljs-selector-tag{color:#cc7832}.hljs-link,.hljs-template-variable,.hljs-variable{color:#629755}.hljs-comment,.hljs-quote{color:grey}.hljs-meta{color:#bbb529}.hljs-addition,.hljs-attribute,.hljs-string{color:#6a8759}.hljs-section,.hljs-title,.hljs-type{color:#ffc66d}.hljs-name,.hljs-selector-class,.hljs-selector-id{color:#e8bf6a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`
                    color =  '.hljs{color:#a9b7c6 !important;background:#282b2e !important;}'
                    break
                case 'idea-white': // IDEA 白
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#000;background:#fff}.hljs-subst,.hljs-title{font-weight:400;color:#000}.hljs-comment,.hljs-quote{color:grey;font-style:italic}.hljs-meta{color:olive}.hljs-tag{background:#efefef}.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-class,.hljs-selector-id,.hljs-selector-tag,.hljs-type{font-weight:700;color:navy}.hljs-attribute,.hljs-link,.hljs-number,.hljs-regexp{font-weight:700;color:#00f}.hljs-link,.hljs-number,.hljs-regexp{font-weight:400}.hljs-string{color:green;font-weight:700}.hljs-bullet,.hljs-formula,.hljs-symbol{color:#000;background:#d0eded;font-style:italic}.hljs-doctag{text-decoration:underline}.hljs-template-variable,.hljs-variable{color:#660e7a}.hljs-addition{background:#baeeba}.hljs-deletion{background:#ffc8bd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`
                    color = '.hljs{color:#000;background:#fff}'
                    break
                case 'beige':
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#e7e9db;color:#4f424c}.hljs-comment,.hljs-quote{color:#776e71}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`
                    color = '.hljs{background:#e7e9db;color:#4f424c}'
                    break
                default:
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#a626a4}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#50a14f}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#986801}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}`
                    color= '.hljs{color:#383a42;background:#fafafa}'
            }
            return `<style>${sefCss || (oldStr + color)}</style>`

        }
        // 构建行号
        function appendRowIndex(str) {
            const linesLength = str.split(/\n/).length - 1;
            // 生成行号
            let linesNum = `<span aria-hidden="true" class="line-numbers-rows hljs" contenteditable="false">`;
            for (let index = 0; index < linesLength; index++) {
                linesNum = linesNum + "<span>" + (index + 1) + "</span>";
            }
            linesNum += "</span>";

            let style = `
            <style>
                .line-numbers-rows {
                     display: flex;
                     flex-direction:  column;

                     line-height: 1.65;
                     font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;

                }

                .line-numbers-rows > span {
                    text-align: right;
                    margin-right: 15px;
                    padding-right: 5px;
                    border-right: 1px solid #c5c5c5;
                    color: #b3b3b3;
                }

            </style>
         `

            return linesNum + style
        }
        // 修改代码块
        function highlightBlock(str, lang) {

            let uid = new Date().getTime();
            let copy = `
             let input = document.createElement('textarea');
             input.setAttribute('readonly', 'readonly');
             input.value =  document.getElementById('code_${uid}').innerHTML.replace(/<.+?>/g, '');
             document.body.appendChild(input);
             input.select();
             if (document.execCommand('copy')){
                 document.execCommand('copy');
             }
             document.body.removeChild(input);
          `
            // 显示行号
            let rowIndex = appendRowIndex(str)
            // 不要出现任何换行,否则会产生空白. 并且换行后开头由<pre>变为换行符,从而会包裹默认的<pre>
            let html = `<pre class="code1-block-wrapper hljs" style="display: flex;"><div class="code1-block-header" contenteditable="false"><span class="code1-block-header__lang">${lang}</span><span class="code1-block-header__copy" onclick="${copy}">复制代码</span></div>${rowIndex}<code id="code_${uid}" class="code1-block-body ${lang} hljs">${str}</code></pre>`
            let style = `
                 <style>
                    .code1-block-wrapper {
                    
                        position: relative;
                        background-color: #f6f3f3;
                        padding: 24px 16px 16px 16px;
                        margin: 16px 0 16px 0;
                        border-radius: 6px;
                    }
                    .code1-block-header {
                        position: absolute;
                        right: 0;
                        width: 100%;
                        padding: 0 1rem;
                        display: flex;
                        justify-content: flex-end;
                        color: #b3b3b3;
                        top: 5px;
                        align-items: center;
                        box-sizing: border-box;
                        background-color: transparent;

                    }
                    .code1-block-header__copy {
                        cursor: pointer;
                        margin-left: 0.5rem;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        user-select: none;
                    }

                    #code_${uid} {
                        margin: 0;
                        padding: 0;
                        display: block;
                        overflow-x: auto;
                        word-wrap: normal;
                        background-color: transparent;
                        border: 0;
                        word-break: normal;
                        white-space: pre;
                        font-size: 100%;

                        line-height: 1.65;
                        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;

                    }
                </style>
          `
            return html + style + useTheme()
        }
        return window.markdownit({
            linkify: true,
            highlight(code, language) {
                const validLang = !!(language && hljs.getLanguage(language))
                if (validLang) {
                    const lang = language ?? ''
                    return highlightBlock(hljs.highlight(code, {language: lang}).value, lang,false, true )
                }
                return highlightBlock(hljs.highlightAuto(code).value, '', false, true)
            },
        })
    }
    static iconRender(config) {
        const { color, fontSize, icon, type , size} = config

        const style = {}

        if (color)
            style.color = color

        if (fontSize)
            style.fontSize = `${fontSize}px`

        if (!icon)
            window.console.warn('iconRender: icon is required')

        return () => Vue.h(Message.iconComponent.icon, { icon, style, type , size })
    }
    static copyStr(str, isTestArea){
        let name = isTestArea ? 'textarea' : 'input'
        let input = document.createElement(name)
        input.setAttribute('readonly', 'readonly')
        input.value = str
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
    }

    textComponent = {
        template: `
                <div class="text-black" :class="wrapClass">
                    <template v-if="loading">
                          <span class="dark:text-white w-[4px] h-[20px] block animate-blink" />
                    </template>

                    <template v-else>
                  
                          <div ref="textRef" class="leading-relaxed break-words">
                                <div v-if="!inversion && !asRawText">
                                      <div class="markdown-body" v-html="text" />
                                </div>
                                <div v-else class="whitespace-pre-wrap" v-text="text" />
                          </div>
                    </template>
              </div>
        `,
        props: ['inversion', 'asRawText', 'value', 'loading', 'error', 'isMobile' ],
        computed:{
            wrapClass(){
                return [ 'text-wrap', 'min-w-[20px]', 'rounded-md',
                    this.isMobile ? 'p-2' : 'px-3 py-2',
                    this.inversion ? 'bg-[#d2f9d1]' : 'bg-[#f4f6f8]',
                    this.inversion ? 'dark:bg-[#a1dc95]' : 'dark:bg-[#1e1e20]',
                    this.inversion ? 'message-request' : 'message-reply',
                    { 'text-red-500': this.error },
                ]
            },
            text(){
                const value = this.value ?? ''
                if (!this.asRawText)
                    return Message.getMarkdown().render(value)
                return value
            }
        },
    }
    body = {
        components: {
            icAvatar: Message.iconComponent.avatar,
            icIcon: Message.iconComponent.icon,
            icText: this.textComponent
        },
        template: `
            <div ref="messageRef" class="flex w-full mb-6 overflow-hidden" :class="[{ 'flex-row-reverse': inversion }]" >
                <!-- 头像 -->
                <div class="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8" :class="[inversion ? 'ml-2' : 'mr-2']" >
                    <ic-avatar :size="28" type="img" :src="inversion? (avatar||def_avatar) : ''" />
                </div>
                <!-- 内容 -->
                <div class="overflow-hidden text-sm " :class="[inversion ? 'items-end' : 'items-start']">
                    <!-- 时间信息 -->
                    <p class="text-xs text-[#b4bbc4]" :class="[inversion ? 'text-right' : 'text-left']"> {{ dateTime || '2023/5/9 17:55:31' }} </p>
                    <!-- 文本内容 -->
                    <div class="flex items-end gap-1 mt-2" :class="[inversion ? 'flex-row-reverse' : 'flex-row']" style="margin-top: 8px;">
                        <ic-text :value="text" :is-mobile="isMobile" :inversion="inversion" :asRawText="asRawText" :loading="loading" :error="error"></ic-text>
                        <!-- 文本工具 -->
                        <div class="flex flex-col">
                            <!-- 重新生成 -->
                            <ic-icon v-if="!inversion" type="icon" icon="ri:restart-line" @click="handleRegenerate" style="height: 14px;" class="mb-2 transition text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-300" />
                            <!-- 更多：复制、删除 -->
                            <n-dropdown :trigger="isMobile ? 'click' : 'hover'" :placement="!inversion ? 'right' : 'left'" :options="options" @select="handleSelect" >
                                <ic-icon type="icon"  icon="ri:more-2-fill" class="transition text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200" />
                            </n-dropdown>
                        </div>
                    </div>        
                    
                </div>
            </div>
         
        `,
        props: {
            avatar: '',
            dateTime: '2023/5/9 17:55:31',
            text: String,
            inversion: Boolean, // 是否是用户
            error: Boolean,
            loading: Boolean,
            isMobile: Boolean,
        },
        data(){
            return {
                def_avatar: main.def_user_avatar,
                options: [
                    {
                        label: Message.info.chat.copy,
                        key: 'copyText',
                        icon: Message.iconRender({ icon: 'ri:file-copy-2-line', type: 'icon', size: 15 }),
                    },
                    {
                        label: Message.info.common.delete,
                        key: 'deleteText',
                        icon: Message.iconRender({ icon: 'ri:delete-bin-line', type: 'icon', size: 15 })
                    }
                ],

                // 原文显示,不渲染
                asRawText: this.inversion,
            }
        },
        methods:{
            // 重新加载
            handleRegenerate(){
                this.$emit("regenerate")
            },
            // 重置
            handleSelect(key){
                switch (key) {
                    case 'copyText':
                        Message.copyStr(this.text)
                        return
                    case 'toggleRenderType':
                        this.asRawText = !this.asRawText
                        return
                    case 'deleteText':
                        this.$emit('delete')
                }
            },
        }
    }
}


