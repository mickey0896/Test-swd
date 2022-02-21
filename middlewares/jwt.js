import Vue from 'vue';

function getAccessToken() {
    // return Vue.prototype.$session.get('accessToken')
    return  sessionStorage.getItem("accessToken");

}

function getRefreshToken() {
    // return Vue.prototype.$session.get('refreshToken')
    return sessionStorage.getItem('refreshToken')

}

function setAccessToken(accessToken) {
    sessionStorage.setItem('accessToken', accessToken)
}

function setRefreshToken(refreshToken) {
    sessionStorage.setItem('refreshToken', refreshToken)
}

//Renew Access Token
async function getNewAccessToken() {
    var body = {
        refreshtoken: await getRefreshToken()
    }
    await Vue.prototype.$http.post(Vue.prototype.$url2 + 'renewaccesstoken', body)
        .then((result) => {
            console.log(result);
            setAccessToken(result.data.accessToken)
        }).catch((err) => {
            console.log(err)
        })
}

//Compute Authorization Header to make API request
async function getAuthenticaitonHeader() {
    const accessToken = await getAccessToken()
    return {
        'Authorization': 'Bearer ' + accessToken
    };
}

//Re-Authorize user after renew Access Token
async function reinitializeAPIRequest(url, method, body) {
    if (method == 'get') return Vue.prototype.$http.get(Vue.prototype.$url2 + url, {
        headers: await getAuthenticaitonHeader()
    }).then((result) => {
        return result
    }).catch((err) => {
        console.log(err)
    })
    if (method == 'post') return Vue.prototype.$http.post(Vue.prototype.$url2 + url, body, { headers: authenHeader })
        .then((result) => {
            console.log(result)
            return result
        }).catch((err) => {
            console.log(err)
        })
    if (method == 'put') return Vue.prototype.$http.put(Vue.prototype.$url2 + url, body, { headers: authenHeader })
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
        })
    if (method == 'delete') return Vue.prototype.$http.delete(Vue.prototype.$url2 + url, body, { headers: authenHeader })
        .then((result) => {
            return result
        }).catch((err) => {
            console.log(err)
        })
}

//Request API Class
function API() {

    //GET Request
    this.get = async function(url) {
        try {
            let result = await Vue.prototype.$http.get(`${Vue.prototype.$url2}${url}`, {
                headers: await getAuthenticaitonHeader()
            })
            return result
        } catch (error) {
            console.log(error);
            if (error.response.status == 401 && error.response.data.error === 'Invalid Access Token') {
                await getNewAccessToken();
                return await Vue.prototype.$http.get(`${Vue.prototype.$url2}${url}`, {
                    headers: await getAuthenticaitonHeader()
                })
            } else throw error
        }
    }

    //POST Request
    this.post = async function(url, body) {
        try {
            return await Vue.prototype.$http.post(`${Vue.prototype.$url2}${url}`, body, {
                headers: await getAuthenticaitonHeader()
            })
        } catch (error) {
            if (error.response.status == 401 && error.response.data.error === 'Invalid Access Token') {
                await getNewAccessToken();
                return await Vue.prototype.$http.post(`${Vue.prototype.$url2}${url}`, body, {
                    headers: await getAuthenticaitonHeader()
                })
            } else throw error
        }
    }


    //PUT Request
    this.put = async function(url, body) {
        try {
            return await Vue.prototype.$http.put(`${Vue.prototype.$url2}${url}`, body, {
                headers: await getAuthenticaitonHeader()
            })
        } catch (error) {
            if (error.response.status == 401 && error.response.data.error === 'Invalid Access Token') {
                await getNewAccessToken();
                return await Vue.prototype.$http.put(`${Vue.prototype.$url2}${url}`, body, {
                    headers: await getAuthenticaitonHeader()
                })
            } else throw err
        }
    }

    //DELETE Request
    this.delete = async function(url, body) {
        try {
            return await Vue.prototype.$http.delete(`${Vue.prototype.$url2}${url}`, body, {
                headers: await getAuthenticaitonHeader()
            })
        } catch (error) {
            if (error.response.status == 401 && error.response.data.error === 'Invalid Access Token') {
                await getNewAccessToken();
                return await Vue.prototype.$http.delete(`${Vue.prototype.$url2}${url}`, body, {
                    headers: await getAuthenticaitonHeader()
                })
            } else throw err
        }
    }
}

const headers = {
    'Access-Control-Request-Method': '*',
    'Access-Control-Request-Headers': '*',
    'Origin': '*'
};

export default {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    getNewAccessToken,
    getAuthenticaitonHeader,
    API
};
