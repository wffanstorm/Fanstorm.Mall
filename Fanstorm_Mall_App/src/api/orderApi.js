import http from '../utils/http'

const orderApi = {
    name: 'orderApi',
    urls: {
        GetList: '/api/Order/GetList',
        Create: '/api/Order/Create',
    },

    GetList(status, success, error) {
        let url = this.urls.GetList
        if (status != null) {
            url += "?status=" + status
        }
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


    Create(addressId, note, payPwd, success, error) {
        let formData = new FormData();
        formData.append('addressId', addressId)
        formData.append('note', note)
        formData.append('payPwd', payPwd)
        http.postFormData(this.urls.Create, formData)
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

export default orderApi