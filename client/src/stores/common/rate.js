import alerts from "@/stores/common/alerts.js"
import http_util from "@/stores/http_util.js"


var rates = {
    getRates: async function(rateMap) {
        var api_url = 'api/rates';
        const result = await http_util.doGet(this, api_url);
    
        if (result.status == true) {
          rateMap.clear();
          for (var i = 0; i < result.data.length; i++) {
            rateMap.set(result.data[i].id, result.data[i])
          }
        }
      }
}
export default rates