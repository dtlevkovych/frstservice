import alerts from "@/stores/common/alerts.js"

var http_util = {
  doGeneric: async function(_this, method, api_url, headers, body) {
    if (headers == null) {
      headers = this.getHeaders(_this);
    }
    try {
      const response = await fetch(this.getBaseUrl() + api_url, {
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
  doGet: async function(_this, api_url, headers) {
    return this.doGeneric(_this, 'GET', api_url, headers, null);
  },
  doPost: async function(_this, api_url, headers, body) {
    return this.doGeneric(_this, 'POST', api_url, headers, body);
  },
  doPut: async function(_this, api_url, headers, body) {
    return this.doGeneric(_this, 'PUT', api_url, headers, body);
  },
  doDelete: async function(_this, api_url, headers) {
    return this.doGeneric(_this, 'DELETE', api_url, headers, null);
  },
  getBaseUrl: function() {
    return 'http://127.0.0.1:3000/';
  },
  getHeaders: function(_this) {
    var auth_id = this.getAuthId(_this);
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth_id
    }
  },
  getAuthId: function(_this) {
    var auth_id = null;
    if (_this.$store.state.auth_user) {
      auth_id = _this.$store.state.auth_user.authenticationId;
    } else {
      auth_id = "";
    }
    return auth_id;
  },
  processUnsuccessfulResponse: function(_this, response) {
    if (response.status == 401) {
      _this.$router.push("/");
      return ;
    }
    alerts.alertError(response.json.error_msg);
  }
}

export default http_util

