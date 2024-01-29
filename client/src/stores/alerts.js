var alerts = {
    SHOW_INTERVAL: 1000,
    alertSuccess: function(msg) {
        this.showAlertWithTimeout("success", msg);
    },
    alertWarning: function(msg) {
        this.showAlertWithTimeout("warning", msg);
    },
    alertError: function(msg) {
        this.showAlertWithTimeout("danger", msg);
    },
    showAlertWithTimeout: function(type, msg){
        var self = this;
        setTimeout(self.showAlert, self.SHOW_INTERVAL, type, msg);
    },
    showAlert: function(type, msg) {
        const alertArea = document.getElementsByClassName("alert-area")[0];
        alertArea.innerHTML = alertArea.innerHTML 
        + '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' + msg 
        + '<button onclick="this.closest(\'div.alert\').remove();" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    },
}
export default alerts
