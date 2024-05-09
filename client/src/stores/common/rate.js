import alerts from "@/stores/common/alerts.js"
import http_util from "@/stores/http_util.js"


var rates = {
    getRates: async function(rateMap) {
        try {
            const response = await fetch(http_util.getBaseUrl() + 'api/rates', {
              method: 'GET',
              headers: http_util.getHeaders()
            })
            const result = await response.json()
    
            if (result.status == true) {
              rateMap.clear();
              for (var i = 0; i < result.data.length; i++) {
                rateMap.set(result.data[i].id, result.data[i])
              }
            } else {
              alerts.alertError(result.error_msg);
            }
          } catch (error) {
            alerts.alertError(error);
          }
      }
}
export default rates