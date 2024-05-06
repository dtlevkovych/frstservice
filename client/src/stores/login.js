export default {
    methods: {
        async logout() {
            console.log(this.$store);
            this.$store.state.auth_user = null;
            try {
                const response = await fetch('http://127.0.0.1:3000/api/logout', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
        
              } catch (error) {
                alert('Error: ', error)
              }
        }
    }
}