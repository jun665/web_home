let settingComponent = {
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
              <template #header-extra>
                噢！
              </template>
              内容
              <template #footer>
                尾部
              </template>
            </n-card>
          </n-modal>
    `,
    props: {
        show: true
    },
    data:{
        show: false
    }
}
