import http_util from "@/stores/http_util.js"

export default {
    methods: {
        async logout() {
            console.log(this.$store);
            this.$store.state.auth_user = null;
            try {
                const response = await fetch(http_util.getBaseUrl() + 'api/logout', {
                  method: 'GET',
                  headers: http_util.getHeaders()
                })
        
              } catch (error) {
                alert('Error: ', error)
              }
        }
    }
}