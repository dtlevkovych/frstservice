import alerts from "@/stores/common/alerts.js"
import rates from "@/stores/common/rate.js"

export default {
    data: function () {
      return {
        ui: {
            page: 0,
            limit: 2,
            showTable: true,
            showAddForm: false,
            editForm: {
                id: null,
                searchfood: ""

            }
        },
        userfoods: [],
        foods: [],
        rates: new Map()
      }
    },
    methods: {
        refresh() {
            this.showUserFoodTable();
            this.getUserFoods();
            this.getRates();
          },
          showUserFoodTable() {
            this.ui.showTable = true;
            this.ui.showAddForm = false;
          },
          showAddUserFood() {
            this.ui.showTable = false;
            this.ui.showAddForm = true;
          },
          showPreviousPage() {
            if(this.ui.page < 1) {
              return false;
            } else {
              this.ui.page = this.ui.page - 1;
              this.getUserFoods();
            }
          },
          showNextPage() {
            this.ui.page = this.ui.page + 1;
            this.getUserFoods();
          },
          getRateColor(rateId) {
            try{
                return this.rates.get(rateId).colorHex;
            } catch (error) {}

            return "";
          },
        async getUserFoods() {

            try {
              const response = await fetch('http://127.0.0.1:3000/api/userfoods/user/950f4862-bc4b-483b-a763-5c39765d2a71/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              const result = await response.json();
      
              if (result.status == true) {
                this.userfoods = [];
                for (var i = 0; i < result.data.length; i++) {
                  this.userfoods.push(result.data[i]);
                }
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
          removeUserFood(userfoodId) {
            alerts.showConfirm("Press 'OK' to delete the user's food", this.deleteUserFood, userfoodId);
          },
          getRates() {
            rates.getRates(this.rates);
          },
          async deleteUserFood(userfoodId) {
            try {
              const response = await fetch('http://127.0.0.1:3000/api/userfoods/' + userfoodId, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              const result = await response.json();
      
              if (result.status == true) {
                this.getUserFoods();
                alerts.alertSuccess("User's food deleted successfully.");
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
          async getFoods() {
            var phrase = this.ui.editForm.searchfood;
            if (phrase == undefined || phrase == null || phrase.length < 2) {
                this.foods = [];
                return;
            }
            try {
              const response = await fetch('http://127.0.0.1:3000/api/foods?phrase=' + phrase, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              const result = await response.json()
      
              if (result.status == true) {
                this.foods = [];
                for (var i = 0; i < result.data.length; i++) {
                  this.foods.push(result.data[i]);
                }
              } else {
                alert(result.error_msg);
              }
            } catch (error) {
              alert('Error: ', error);
            }
          }
    },
    mounted() {
      this.refresh()
    }
  }