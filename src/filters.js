export default {
    tab: (input) => {
        return {
            'top': '顶置',
            'good': '精华',
            'job': '招聘',
            'ask': '问答',
            'share': '分享'
        }[input]
    },
    date: (input, format) => {
        if(format === 'ago'){
            let date = new Date(String(input)).getTime(), now = Date.now(), delta = parseInt((now - date) / 1000)
            switch (true) {
                case (delta < 60):
                    return '刚刚'
                case (delta >= 60 && delta < 60 * 60):
                    return `${parseInt(delta / 60)}分钟前`
                case (delta >= 60 * 60 && delta < 60 * 60 * 24):
                    return `${parseInt(delta / (60 * 60))}小时前`
                case (delta >= 60 * 60 * 24 && delta < 60 * 60 * 24 * 30):
                    return `${parseInt(delta / (60 * 60 * 24))}天前`
                case (delta >= 60 * 60 * 24 * 30 && delta < 60 * 60 * 24 * 365):
                    return `${parseInt(delta / (60 * 60 * 24 * 30))}月前`
                case (delta >= 60 * 60 * 24 * 365):
                    return `${parseInt(delta / (60 * 60 * 24 * 30 * 365))}月前`
                default:
                    return '...'
            }
        }else{
            let date = new Date(input)
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
    }
}
