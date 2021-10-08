import { Platform } from 'react-native'

function getUserAgend() {
    return 'app/' + global.version + ' ' + Platform.OS
}
const http = {
    get(url, params, headers) {
        var headerJson = {
            'User-Agent': getUserAgend(),
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        }
        //accessToken 
        if (global.currentUser) {
            headerJson.Authorization = 'Bearer ' + global.currentUser.accessToken
        }
        var myHeaders = new Headers(headerJson);
        if (headers) {
            myHeaders = Object.assign(myHeaders, headers);
        }

        if (params) {
            let paramsArray = [];
            //encodeURIComponent
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        if (!url.includes('http')) {
            url = global.host + url;
        }


        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'GET',
                headers: myHeaders,
                credentials: 'include'
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        http.func.respNotOk(response, reject)
                    }
                })
                .then((response) => {
                    http.func.preSolve(response)
                    resolve(response);
                })
                .catch((err) => {
                    http.func.fetchCatch(err, reject)
                })
        })
    },


    post(url, formData, headers) {
        let headerJson = {
            'User-Agent': getUserAgend(),
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        }

        //accessToken 
        if (global.currentUser) {
            headerJson.Authorization = 'Bearer ' + global.currentUser.accessToken
        }

        var myHeaders = new Headers(headerJson);

        if (headers) {
            myHeaders = Object.assign(myHeaders, headers);
        }
        if (url.indexOf('http') == -1) {
            url = global.host + url;
        }
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(formData),
                credentials: 'include'
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        http.func.respNotOk(response, reject)
                    }
                })
                .then((response) => {
                    http.func.preSolve(response)
                    resolve(response);
                })
                .catch((err) => {
                    http.func.fetchCatch(err, reject)
                })
        })
    },

    postFormData(url, formData, headers) {
        let headerJson = {
            'User-Agent': getUserAgend(),
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        }

        //accessToken 
        if (global.currentUser) {
            headerJson.Authorization = 'Bearer ' + global.currentUser.accessToken
        }

        var myHeaders = new Headers(headerJson);

        if (headers) {
            myHeaders = Object.assign(myHeaders, headers);
        }
        if (url.indexOf('http') == -1) {
            url = global.host + url;
        }
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        http.func.respNotOk(response, reject)
                    }
                })
                .then((response) => {
                    http.func.preSolve(response)
                    resolve(response);
                })
                .catch((err) => {
                    http.func.fetchCatch(err, reject)
                })
        })
    },

    func: {
        preSolve: (resp) => {
            if (resp.code == 401) {
                if (global.nav) {
                    // global.storage.remove('user')
                    global.currentUser = null
                    global.nav.navigate('Login')
                }
            }
        },

        fetchCatch: (err, func) => {
            func('网络连接失败')
        },

        respNotOk: (resp, func) => {
            func('网络请求失败:' + resp.status)
        }

    },

}

export default http