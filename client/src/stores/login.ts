import { defineComponent } from "vue";
import conf from "@/stores/common/conf"

export default defineComponent({
    methods: {
        googleLogin() {
            window.location = conf.base_api_url + "api/google/login?redirect_to=" + conf.base_url + "auth_callback";
        }
    }
})