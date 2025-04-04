import { defineComponent } from "vue"
import http_util from "@/stores/http_util"
import { store } from '@/stores/store'

export default defineComponent({
    data: function() {
        return {
            store
        }
    },
    methods: {
        async logout() {
            var api_url = 'api/logout';
            const result = await http_util.doGet(this, api_url, null);

            if (result.status == true) {
                store.auth_user = null;
                this.$router.push("/");
            }
        },
        goToUserPage() {
            this.$router.push("/user");
        },
        goToFoodPage() {
            this.$router.push("/food");
        },
        goToRatePage() {
            this.$router.push("/rate");
        }
    }
})