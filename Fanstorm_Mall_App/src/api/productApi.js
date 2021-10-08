import http from '../utils/http'

const productApi = {
    name: 'productApi',
    urls: {
        GetDetail: '/api/Product/GetDetail',
        GetList: '/api/Product/GetList',
    },

    GetDetail(id, success, error) {
        http.get(this.urls.GetDetail + "?id=" + id)
            .then(data => {
                if (data.code == 200) {
                    success(data)
                }
                else {
                    if (error) error(data.message)
                }

            }).catch(ex => {
                if (error) error(JSON.stringify(ex))
            })
    },

    GetList(name, pageIndex, pageSize, success, error) {
        let url = this.urls.GetList + "?name=" + name
            + "&pageIndex=" + pageIndex
            + "&pageSize=" + pageSize
        http.get(url)
            .then(data => {
                if (data.code == 200) {
                    success(data)
                }
                else {
                    if (error) error(data.message)
                }

            }).catch(ex => {
                if (error) error(JSON.stringify(ex))
            })
    },
}

export default productApi