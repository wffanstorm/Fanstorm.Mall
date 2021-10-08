import http from '../utils/http'

const cartApi = {
    name: 'cartApi',
    urls: {
        GetList: '/api/Cart/GetList',
        ChangeCartQuantity: '/api/Cart/ChangeCartQuantity',
        Check: '/api/Cart/Check',
        Checkout: '/api/Cart/Checkout',
    },

    GetList(success, error) {
        http.get(this.urls.GetList)
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

    ChangeCartQuantity(productId, quantity, success, error) {
        let formData = new FormData();
        formData.append('productId', productId)
        formData.append('quantity', quantity)
        http.postFormData(this.urls.ChangeCartQuantity, formData)
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

    Check(id, success, error) {
        let formData = new FormData();
        formData.append('id', id)
        http.postFormData(this.urls.Check, formData)
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
    Checkout(success, error) {
        http.post(this.urls.Checkout)
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

export default cartApi