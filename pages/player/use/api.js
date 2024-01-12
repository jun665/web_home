// 已被设置跨域


//获取歌词
const getWords = id => {
    return axios.get(`https://n.xlz122.cn/api/lyric?id=${id}`);
};
//获取歌曲详情
const getMusicInfo = id => {
    return axios.get(`https://n.xlz122.cn/api/song/detail?ids=${id}`);
};
//获取歌曲url
const getMusicUrl = id => {
    return axios.get(`https://n.xlz122.cn/api/song/url?id=${id}`);
};
//获取热门歌曲
const getHotMusic = id => {
    return axios.get(`https://n.xlz122.cn/api/playlist/detail?id=${id}`);
};
//获取搜索建议
const getSearchSuggest = key => {
    return axios.get(`https://n.xlz122.cn/api/search/suggest?keywords=${key}`);
};
//获取歌曲热门评论
const getHotTalk = id => {
    return axios.get(`https://n.xlz122.cn/api/comment/music?id=${id}&limit=3`);
};
