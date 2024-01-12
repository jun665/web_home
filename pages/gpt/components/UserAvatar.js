// 用户基本信息
class UserAvatar {
    type = {
        components:{
            icAvatar: Message.iconComponent.avatar,
        },
        template: `
            <div class="flex items-center overflow-hidden">
                <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
                 <ic-avatar :size="28" type="img" :src="isString(user.avatar) && user.avatar.length > 0 ? user.avatar : defaultAvatar" />
                </div>
                <div class="flex-1 min-w-0 ml-2">
                  <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
                    {{ user.name ?? 'user' }}
                  </h2>
                  <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
                    <span v-if="isString(user.description) && user.description !== ''"  v-html="user.description" />
                  </p>
                </div>
            </div>
        `,
        data(){
            return {
                defaultAvatar: main.def_user_avatar,
                user: {
                    avatar: main.def_user_avatar,
                    name: 'wenge',
                    description: 'This user info.',
                },
            }
        },
        methods:{
            isString(value){
                return Object.prototype.toString.call(value) === '[object String]'
            }
        }
    }
}
