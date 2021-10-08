import http from '../utils/http'

const userReceiveAddressApi = {
    name: 'userReceiveAddressApi',
    urls: {
        GetById: '/api/UserReceiveAddress/GetById',
        SetDefault: '/api/UserReceiveAddress/SetDefault',
        GetList: '/api/UserReceiveAddress/GetList',
        Delete: '/api/UserReceiveAddress/Delete',
        AddOrUpdate: '/api/UserReceiveAddress/AddOrUpdate',
    },

    GetById(id, success, error) {
        http.get(this.urls.GetById + "?id=" + id)
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

    SetDefault(id, success, error) {
        let formData = new FormData();
        formData.append('id', id)
        http.postFormData(this.urls.SetDefault, formData)
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

    Delete(id, success, error) {
        let formData = new FormData();
        formData.append('id', id)
        http.postFormData(this.urls.Delete, formData)
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
    AddOrUpdate(id, name, phone, province, city, region, detailAddress, success, error) {
        let formData = new FormData();
        formData.append('id', id)
        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('province', province)
        formData.append('city', city)
        formData.append('region', region)
        formData.append('detailAddress', detailAddress)
        http.postFormData(this.urls.AddOrUpdate, formData)
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

export default userReceiveAddressApi