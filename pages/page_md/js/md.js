
class MDMessage {


    // 代码块主题
    static IDEA_BLACK = "idea-black"
    static IDEA_WHITE = "idea-white"
    static BEIGE = "beige"
    static DEFAULT = "-1"

    // 代码块字体
    static CODE_FONT_FIRA = `italic 1.2rem "Fira Sans", serif`
    static CODE_FONT_DEFAULT = ``

    static getMarkdown(theme) {
        let uid = 1;
        // 代码设置
        let rowHeight = 1.4
        let fontSize = "100%"
        let fonts = MDMessage.CODE_FONT_DEFAULT


        // 设置主题
        function useTheme(theme, sefCss) {
            let oldStr, color
            // selector: https://highlightjs.org/static/demo/
            // download: https://highlightjs.org/download/  by '\styles\*.css'
            switch (theme) {
                case MDMessage.IDEA_BLACK: // IDEA 黑
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#a9b7c6;background:#282b2e}.hljs-bullet,.hljs-literal,.hljs-number,.hljs-symbol{color:#6897bb}.hljs-deletion,.hljs-keyword,.hljs-selector-tag{color:#cc7832}.hljs-link,.hljs-template-variable,.hljs-variable{color:#629755}.hljs-comment,.hljs-quote{color:grey}.hljs-meta{color:#bbb529}.hljs-addition,.hljs-attribute,.hljs-string{color:#6a8759}.hljs-section,.hljs-title,.hljs-type{color:#ffc66d}.hljs-name,.hljs-selector-class,.hljs-selector-id{color:#e8bf6a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`
                    color = '.hljs{color:#a9b7c6 !important;background:#282b2e !important;}'
                    break
                case MDMessage.IDEA_WHITE: // IDEA 白
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#000;background:#fff}.hljs-subst,.hljs-title{font-weight:400;color:#000}.hljs-comment,.hljs-quote{color:grey;font-style:italic}.hljs-meta{color:olive}.hljs-tag{background:#efefef}.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-class,.hljs-selector-id,.hljs-selector-tag,.hljs-type{font-weight:700;color:navy}.hljs-attribute,.hljs-link,.hljs-number,.hljs-regexp{font-weight:700;color:#00f}.hljs-link,.hljs-number,.hljs-regexp{font-weight:400}.hljs-string{color:green;font-weight:700}.hljs-bullet,.hljs-formula,.hljs-symbol{color:#000;background:#d0eded;font-style:italic}.hljs-doctag{text-decoration:underline}.hljs-template-variable,.hljs-variable{color:#660e7a}.hljs-addition{background:#baeeba}.hljs-deletion{background:#ffc8bd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`
                    color = '.hljs{color:#000;background:#fff}'
                    break
                case MDMessage.BEIGE:
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#e7e9db;color:#4f424c}.hljs-comment,.hljs-quote{color:#776e71}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`
                    color = '.hljs{background:#e7e9db;color:#4f424c}'
                    break
                default:
                    oldStr = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#a626a4}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#50a14f}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#986801}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}`
                    color = '.hljs{color:#383a42;background:#fafafa}'
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
                     line-height: ${rowHeight};
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

            uid = uid + 1;
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
             console.log(document.getElementById('copyTitle_${uid}').innerHTML, 'copyTitle_${uid}')
             document.getElementById('copyTitle_${uid}').innerHTML = '已复制';
          `
            // 显示行号
            let rowIndex = appendRowIndex(str)
            // 不要出现任何换行,否则会产生空白. 并且换行后开头由<pre>变为换行符,从而会包裹默认的<pre>
            let html = `<pre class="code1-block-wrapper hljs" style="display: flex;"><div class="code1-block-header" contenteditable="false"><span class="code1-block-header__lang">${lang}</span><span class="code1-block-header__copy" id="copyTitle_${uid}" onclick="${copy}">复制代码</span></div>${rowIndex}<code id="code_${uid}" class="code1-block-body ${lang} hljs">${str}</code></pre>`
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
                        font: ${fonts};
                        font-size: ${fontSize};

                        line-height: ${rowHeight};
                        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;

                    }
                </style>
          `
            return html + style  + useTheme(theme)
        }

        return window.markdownit({
            linkify: true,
            // (使用此方法进行markdown处理)
            highlight(code, language) {
                const validLang = !!(language && hljs.getLanguage(language))
                if (validLang) {
                    const lang = language ?? ''
                    return highlightBlock(hljs.highlight(code, {language: lang}).value, lang, false, true)
                }
                return highlightBlock(hljs.highlightAuto(code).value, '', false, true)
            },
        })
    }
}