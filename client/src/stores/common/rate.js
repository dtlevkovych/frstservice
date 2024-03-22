import alerts from "@/stores/common/alerts.js"

var rates = {
    getRates: async function(rateMap) {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/rates', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
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