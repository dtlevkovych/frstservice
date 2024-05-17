import conf from "@/stores/common/conf.js"

export default {
    methods: {
        googleLogin() {
            window.location = conf.base_api_url + "api/google/login?redirect_to=" + conf.base_url + "auth_callback";
        }
    }
}