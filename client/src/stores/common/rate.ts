import http_util from "@/stores/http_util"

var rates = {
    getRates: async function(_this: any, rateMap: any): Promise<void> {
        var api_url = 'api/rates';
        const result = await http_util.doGet(_this, api_url, null);
    
        if (result.status == true) {
          rateMap.clear();
          for (var i = 0; i < result.data.length; i++) {
            rateMap.set(result.data[i].id, result.data[i])
          }
        }
      }
}
export default rates