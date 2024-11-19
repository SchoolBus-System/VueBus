import axios from "axios";



// 使用axios创建一个HTTP客户端实例，设置基础URL和请求头
const http = axios.create({
    baseURL: 'http://localhost:3002/api', // 设置API的基础URL
    headers: {
        'Content-Type': 'application/json' // 设置请求的内容类型为JSON
    }
});


// 导出http实例，以便在其他组件或模块中使用
export default http;