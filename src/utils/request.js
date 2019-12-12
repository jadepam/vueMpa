import axios from "axios";
let urlPrefix = {};
if (process.env.NODE_ENV === "development") {
    urlPrefix.api = "/dev";
} else {
    urlPrefix.api = "/";
}
// 创建axios实例
const service = axios.create({
    baseURL: urlPrefix.api,
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        return new Promise(resolve => {
            // if (store.getters.token) {
            //     config.headers["ycltoken"] = store.getters.token;
            // }
            resolve(config);
            return config;
        });
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const data = response.data;
        return Promise.resolve(data);
    },
    error => {
        // let data = JSON.parse(JSON.stringify(error))
        // if (data.response.status== 400) {

        // }//登录过期
        return Promise.reject(error);
    }
);

const request = (url, method, data, opt) => {
    return service({
        url: url,
        method: method,
        data: data,
        ...opt,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

const get = (url, data, opt) => {
    return request(url, "get", data, opt);
};

const post = (url, data, opt) => {
    return request(url, "post", data, opt);
};

const del = (url, data, opt) => {
    return request(url, "delete", data, opt);
};

export default {
    request,
    post,
    get,
    del
};
