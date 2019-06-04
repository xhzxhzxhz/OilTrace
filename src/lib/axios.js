const Axios = require('axios');

class HttpRequest {
  constructor(baseUrl){
    this.baseUrl = baseUrl
    this.queue = []
    this.ajaxLoading = document.getElementById('ajaxLoading')
  }
  getInsideConfig(){
    const config = {
      baseUrl:this.baseUrl,
      headers:{

      },
      timeout: 5000,
    }
    return config;
  }
  interceptors(instance){
    instance.interceptors.request.use((config) => {
      this.queue.push(config);
      if(this.queue.length !== 0){
        this.ajaxLoading.style.display = 'block';
      }
      return config;
    },(error)  => {
      return Promise.reject(error);
    })
    instance.interceptors.response.use((res) => {
      if (res.data.token) {
        window.localStorage.setItem('yun-auth-token', res.data.token);
      }
      // console.log('response',res);
      this.queue.pop();
      if(this.queue.length === 0){
        this.ajaxLoading.style.display = 'none';
      }
      return res.data
    },(error) => {
      this.queue.pop();
      if (this.queue.length === 0) {
         this.ajaxLoading.style.display = 'none';
      }
       console.log(error.response);
      return error;
    })
  }
  request(options){
    const instance = Axios.create();
    const config = Object.assign(this.getInsideConfig(),options);
    this.interceptors(instance);
    return instance(config);
  }
}

export default HttpRequest;