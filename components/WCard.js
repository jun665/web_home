/**
 * card组件
 */
class WCard {
    body = {
        template: `
            <el-card v-if="card.show" class="card">
                <div v-if="card.type === 'code'">
                    <div :id="card.info"></div>
                </div>
                <div v-else-if="card.type === 'page'">
                    <el-image :src="card.img || './source/imgs/card_img.png'" @click="toPage(card.info, card.noTarget)"></el-image>
                    <div style="height: 20px;font-size: 12px; text-align: center" @click="toPage(card.info, card.noTarget)">{{ card.title }}</div>
                </div>
                <el-tooltip class="item" effect="dark" :content="card.desc" placement="bottom">
                    <div style="
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #9c9b9b;
                        font-size: 11px;
                    ">{{card.desc}}</div>
                </el-tooltip>
                
                <!-- css -->
                <div v-html="css" />
            </el-card>
            
        `,
        props: {
            card:{}
        },
        data() {
            return{
                css: `
                    <style>
                         .card {
                            line-height: 2;
                            margin: 5px;
                            width: 255.75px;
                            height: 303px;
                        }
                        .card:hover {
                            box-shadow: 0 2px 4px rgba(14, 2, 2, 0.16), 0 0 6px rgba(0, 0, 0, 0.22)
                        }
                        .el-image {
                            width: 215px;
                            height: 228px;
                            border-radius: 5px;
                        }
                    </style>
                `
            }
        },
        methods:{
            toPage(url, noTarget){
                if (noTarget){
                    window.location.href = url
                } else {
                    window.open(url)
                }
            },
        }
    }

}
