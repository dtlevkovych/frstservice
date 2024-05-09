var http_util = {
  getBaseUrl: function() {
    return 'http://127.0.0.1:3000/';
  },
  getHeaders: function() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Basic 100324161699394014642'
    }
  },
  processUnsuccessfulResponse: function(response) {
    if (response.status == 401) {
      this.$router.push("/");
      return ;
    }
    alerts.alertError(response.json().error_msg);
  }
}

export default http_util