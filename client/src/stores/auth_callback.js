import http_util from "@/stores/http_util.js"
import { store } from '@/stores/store.js'

export default {
    data: function() {
        return {
            store
        }
    },
    methods: {
       async checkAuth() {
            const params = new URLSearchParams(window.location.search);
            const auth_id = params.get('auth_id');

            if (auth_id) {
                store.auth_user = {authenticationId: auth_id};
                
                var api_url = "/api/authuser/" + auth_id;
                const result = await http_util.doGet(this, api_url);

                if (result.status == true) {
                    store.auth_user = result.data;
                }
            }

            this.$router.push("/user");
        }
    },
    mounted() {
        this.checkAuth()
      }
}