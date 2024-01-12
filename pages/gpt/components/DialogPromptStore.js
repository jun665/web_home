let promptStoreComponent = {
    template: `
        <n-modal v-model:show="show">
            <n-card
              style="width: 600px"
              title="模态框"
              :bordered="false"
              size="huge"
              role="dialog"
              aria-modal="true"
            >
                hello
            </n-card>
          </n-modal>
    `,
    props: {
        visible: Boolean
    },
    model: {
        props: 'visible',
        event: 'updateShow'
    },
    watch:{
        visible(n, o){
            this.show = this.visible
        },
        show(n, o){
            this.$emit('updateShow', this.show)
        }
    },
    data(){
        return {
            show: false
        }
    },
}

