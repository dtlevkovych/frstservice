import http_util from "@/stores/http_util.js"

export default {
    methods: {
        async logout() {
            console.log(this.$store);
            this.$store.state.auth_user = null;

            var api_url = 'api/logout';
            const result = await http_util.doGet(this, api_url, http_util.getHeaders());
            if (result.status == true) {
                this.$router.push("/");
            }
        }
    }
}