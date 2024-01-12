


// function theStorage() {
//
//     /**
//      * 设置键值对
//      * @param key 键
//      * @param data 数据
//      * @param expire 到期时间s,缺省时不会到期
//      */
//     function set(key, data, expire) {
//         const val = {
//             data,
//             expire: expire ? new Date().getTime() + expire * 1000 : null
//         }
//         window.localStorage.setItem(key, JSON.stringify(val))
//
//     }
//
//     // 查询
//     function get(key) {
//         const json = window.localStorage.getItem(key)
//         if (json) {
//
//             let { data, expire } =  JSON.parse(json)
//             if (!expire && expire < Date.now()) {
//                 return null
//             }
//             return data
//         }
//     }
//
//     // 移除
//     function remove(key) {
//         window.localStorage.removeItem(key)
//     }
//
//     // 查询+移除
//     function acquire(key){
//         let data = select(key)
//         remove(key)
//         return data
//     }
//
//     // 清空
//     function clear() {
//         window.localStorage.clear()
//     }
//
//     return { set , get, acquire, remove, clear}
// }
