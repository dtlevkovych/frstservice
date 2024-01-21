export default {
    data: function () {
      return {
        foods: []
      }
    },
    methods: {
      refresh() {
          //this.showFoodTable();
          this.getFoods();
      },
      async getFoods() {
      console.log("get foods");
        try {
          const response = await fetch('http://127.0.0.1:3000/api/foods', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.users = []
            for (var i = 0; i < result.data.length; i++) {
              this.users.push(result.data[i])
            }
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      }
    },
    mounted() {
        this.refresh();
    }
}