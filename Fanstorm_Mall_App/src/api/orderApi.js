import http from '../utils/http'

const orderApi = {
    name: 'orderApi',
    urls: {
        Create: '/api/Order/Create',
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