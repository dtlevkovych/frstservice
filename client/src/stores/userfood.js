import alerts from "@/stores/common/alerts.js"
import rates from "@/stores/common/rate.js"
import Dropdown from "@/components/DropdownComponent.vue"
import http_util from "@/stores/http_util.js"

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
            this.$router.push('/user');
          },
        async getUserFoods() {
            var api_url = 'api/userfoods/user/' + this.userId + '/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
            const result = await http_util.doGet(this, api_url);
      
            if (result.status == true) {
              this.userfoods = [];
              for (var i = 0; i < result.data.length; i++) {
                this.userfoods.push(result.data[i]);
              }
            }
          },
          async addUserFood(foodId) {
            var obj = {
              userId: this.userId,
              foodId: foodId
            }
            var api_url = 'api/userfoods';
            var body = JSON.stringify(obj);
            const result = await http_util.doPost(this, api_url, null, body);

            if (result.status == true) {
              this.refresh();
              alerts.alertSuccess("User's food has been successfull added.");
            }
          },
          async addFood() {
            var obj = {
              name: this.ui.editForm.foodname,
              rateId: this.ui.editForm.rateId
            }
            var api_url = 'api/food';
            var body = JSON.stringify(obj);
            const result = await http_util.doPost(this, api_url, null, body);
      
            if (result.status == true) {
              this.showAddUserFood();
              this.ui.editForm.searchfood = this.ui.editForm.foodname;
              this.getFoods();

              alerts.alertSuccess("Food has been successfully created.");
            }
          },
          removeUserFood(userfoodId) {
            alerts.showConfirm("Press 'OK' to delete the user's food", this.deleteUserFood, userfoodId);
          },
          getRates() {
            rates.getRates(this.rates);
          },
          async deleteUserFood(userfoodId) {
            var api_url = 'api/userfoods/' + userfoodId;
            const result = await http_util.doDelete(this, api_url);
      
            if (result.status == true) {
              this.getUserFoods();
              alerts.alertSuccess("User's food deleted successfully.");
            }
          },
          async getFoods() {
            var phrase = this.ui.editForm.searchfood;
            var api_url = 'api/foods?phrase=' + phrase;
            const result = await http_util.doGet(this, api_url);

            if (phrase == undefined || phrase == null || phrase.length < 2) {
                this.foods = [];
                return;
            }
      
            if (result.status == true) {
              this.foods = [];
              for (var i = 0; i < result.data.length; i++) {
                this.foods.push(result.data[i]);
              }
            }
          }
    },
    mounted() {
      this.refresh();
    }
  }