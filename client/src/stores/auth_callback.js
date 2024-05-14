export default {
    methods: {
        checkAuth() {
            console.log(this);
            this.$store.state.auth_user = null;
            this.$router.push("/user");
        }
    },
    mounted() {
        this.checkAuth()
      }
}