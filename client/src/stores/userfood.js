import alerts from "@/stores/common/alerts.js"
import rates from "@/stores/common/rate.js"
import Dropdown from "@/components/DropdownComponent.vue"

export default {
    data: function () {
      return {
        ui: {
            page: 0,
            limit: 10,
            showTable: true,
            showAddForm: false,
            showAddFood: false,
            editForm: {
                id: null,
                foodId: null,
                foodname: "",
                rateId: null,
                searchfood: ""

            }
        },
        userfoods: [],
        foods: [],
        rates: new Map(),
        userId: null,
      }
    },
    components: {"Dropdown": Dropdown},
    methods: {
        refresh() {
            this.userId = this.$route.query.userId;
            this.showUserFoodTable();
            this.getUserFoods();
            this.getRates();
          },
          addBackButton() {
           $("#gl-back").html('<button @click="showUserTable()" class="btn border-0">&#8592;Back</button>');
          },
          showUserFoodTable() {
            this.ui.showTable = true;
            this.ui.showAddForm = false;
            this.ui.showAddFood = false;
          },
          showAddUserFood() {
            this.ui.showAddForm = true;
            this.ui.showTable = false;
            this.ui.showAddFood = false;
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
          setUserInUserFood(userId) {
            this.userId = userId;
          },
          showAddFood() {
            this.ui.showAddFood = true;
            this.ui.showTable = false;
            this.ui.showAddForm = false;
          },
          showUserTable() {
            this.$router.push('/');
          },
        async getUserFoods() {

            try {
              const response = await fetch('http://127.0.0.1:3000/api/userfoods/user/' + this.userId + '/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page, {
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
          async addUserFood(foodId) {
            var obj = {
              userId: this.userId,
              foodId: foodId
            }
            try {
              const response = await fetch('http://127.0.0.1:3000/api/userfoods', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
              })
              const result = await response.json();
              
              if (result.status == true) {
                this.refresh();

                alerts.alertSuccess("User's food has been successfull added.");
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
          async addFood() {
            var obj = {
              name: this.ui.editForm.foodname,
              rateId: this.ui.editForm.rateId
            }
            try {
              const response = await fetch('http://127.0.0.1:3000/api/food', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
              })
              const result = await response.json()
      
              if (result.status == true) {
                this.showAddUserFood();
                this.ui.editForm.searchfood = this.ui.editForm.foodname;
                this.getFoods();

                alerts.alertSuccess("Food has been successfully created.");
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
    beforCreate() {
      this.addBackButton();
    },
    mounted() {
      this.refresh();
    }
  }