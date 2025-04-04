import alerts from "@/stores/common/alerts"
import conf from "@/stores/common/conf"
import { store } from '@/stores/store'

var http_util = {
  doGeneric: async function(_this: any, method: any, api_url: string, headers: any, body: any) {
    if (headers == null) {
      headers = this.getHeaders(_this);
    }
    try {
      const response = await fetch(this.getBaseApiUrl() + api_url, {
        method: method,
        headers: headers,
        body: body
      })
      const result = await response.json();
      response.json = result;
      
      if (result.status != true) {
        this.processUnsuccessfulResponse(_this, response);
      }

      return result;
    } catch (error) {
      alerts.alertError(error);
    }
  },
  doGet: async function(_this: any, api_url: string, headers: any) {
    return this.doGeneric(_this, 'GET', api_url, headers, null);
  },
  doPost: async function(_this: any, api_url: string, headers: any, body: any) {
    return this.doGeneric(_this, 'POST', api_url, headers, body);
  },
  doPut: async function(_this: any, api_url: string, headers: any, body: any) {
    return this.doGeneric(_this, 'PUT', api_url, headers, body);
  },
  doDelete: async function(_this: any, api_url: string, headers: any) {
    return this.doGeneric(_this, 'DELETE', api_url, headers, null);
  },
  getBaseApiUrl: function() {
    return conf.base_api_url;
  },
  getHeaders: function(_this: any) {
    var auth_id = this.getAuthId(_this);
    return {
      'Content-Type': 'application/json',
      'Authorization': conf.tocken_type + auth_id
    }
  },
  getAuthId: function(_this: any) {
    var auth_id = null;
    if (store.auth_user) {
      auth_id = store.auth_user.authenticationId;
    } else {
      auth_id = "";
    }
    return auth_id;
  },
  processUnsuccessfulResponse: function(_this: any, response: any) {
    if (response.status == 401) {
      _this.$router.push("/");
      return ;
    }
    alerts.alertError(response.json.error_msg);
  }
}

export default http_util

