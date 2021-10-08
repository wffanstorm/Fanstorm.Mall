import http from '../utils/http'

const userApi = {
    name: 'userApi',
    urls: {
        Login: '/api/User/Login',
        GetInfo: '/api/User/GetInfo',
        Register: '/api/User/Register',
        Recharge: '/api/User/Recharge',
    },

    Login(username, password, success, error) {
        let formData = new FormData();
        formData.append('uname', username)
        formData.append('pwd', password)
        http.postFormData(this.urls.Login, formData)
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

    GetInfo(success, error) {
        http.get(this.urls.GetInfo)
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

    Register(username, password, phone, payPwd, success, error) {
        let formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        formData.append('phone', phone)
        formData.append('payPwd', payPwd)
        http.postFormData(this.urls.Register, formData)
            .then(data => {
                if (data.code == 200) success(data)
                else {
                    if (error) error(data.message)
                }
            }).catch(ex => {
                if (error) error(JSON.stringify(ex))
            })
    },

    Recharge(money) {
        let formData = new FormData();
        formData.append('money', money)
        http.postFormData(this.urls.Recharge, formData)
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

export default userApi