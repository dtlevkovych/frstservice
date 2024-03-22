var alerts = {
    SHOW_INTERVAL: 1000,
    getRandomId: function() {
        return "alert-" + Math.random().toString(36).slice(2);
    },
    alertSuccess: function(msg) {
        var self = this;
        var id = this.getRandomId();
        this.showAlertWithTimeout("success", msg, id);
        setTimeout(function() {
            $("." + id).fadeOut(800, function() {
                $("." + id).remove();
            });
        }, self.SHOW_INTERVAL + 10000);
    },
    alertWarning: function(msg) {
        this.showAlertWithTimeout("warning", msg, this.getRandomId());
    },
    alertError: function(msg) {
        this.showAlertWithTimeout("danger", msg, this.getRandomId());
    },
    showAlertWithTimeout: function(type, msg, id){
        var self = this;
        setTimeout(self.showAlert, self.SHOW_INTERVAL, type, msg, id);
    },
    showAlert: function(type, msg, id) {
        const alertArea = document.getElementsByClassName("alert-area")[0];
        alertArea.innerHTML = alertArea.innerHTML 
        + '<div class="alert alert-' + type + ' alert-dismissible fade show ' + id + '" style="display: none;" role="alert">' + msg 
        + '<button onclick="this.closest(\'div.alert\').remove();" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

        $("." + id).first().fadeIn(800);
    },
    showConfirm: function(msg, func, par1) {
        bootbox.confirm({
            closeButton: false,
            message: msg,
            callback: function(result) {
              if(result == true) func(par1);
            }
          });
    }
}
export default alerts