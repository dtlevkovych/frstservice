import alerts from "@/stores/common/alerts.js"
import rates from "@/stores/common/rate.js"
import Header from "@/components/HeaderComponent.vue"
import http_util from "@/stores/http_util.js"

export default {
    data: function () {
      return {
        ui: {
          page: 0,
          limit: 5,
          showTable: true,
          showEditForm: false,
          editForm: {
            foodId: null,
            name: '',
            rateId: null
          }
        },
        foods: [],
        rates: new Map()
      }
    },
    components: {
      "Header": Header
    },
    methods: {
      refresh() {
        this.showFoodTable();
        this.getFoods();
        this.getRates();
      },
      cleanEditForm() {
        this.ui.editForm.foodId = null;
        this.ui.editForm.rateId = null;
        this.ui.editForm.name = '';
      },
      showFoodTable() {
        this.ui.showTable = true;
        this.ui.showEditForm = false;
      },
      showAddFood() {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.cleanEditForm();
      },
      showUpdateFood(foodId) {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.ui.editForm.foodId = foodId;
        this.getFoodAndFillForm(foodId);
      },
      showPreviousPage() {
        if(this.ui.page < 1) {
          return false;
        } else {
          this.ui.page = this.ui.page - 1;
          this.getFoods();
        }
      },
      showNextPage() {
        this.ui.page = this.ui.page + 1;
        this.getFoods();
      },
      async getFoods() {
        console.log(this.$store.state.auth_user);
        var api_url = 'api/foods/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
        const result = await http_util.doGet(this, api_url);
        
        if (result.status == true) {
          this.foods = []
          for (var i = 0; i < result.data.length; i++) {
            this.foods.push(result.data[i])
          }
        }
      },
    getRates() {
      rates.getRates(this, this.rates);
    },
    saveFood() {
      if (this.ui.editForm.foodId == null) {
        this.addFood();
      } else {
        alerts.showConfirm("Press 'OK' to update the food", this.updateFood, this.ui.editForm.foodId);
      }
    },
    async addFood() {
      var obj = {
        name: this.ui.editForm.name,
        rateId: this.ui.editForm.rateId
      }
      var api_url = 'api/food';
      var body = JSON.stringify(obj);
      const result = await http_util.doPost(this, api_url, null, body);

      if (result.status == true) {
        this.refresh();
        alerts.alertSuccess("Food has been successfully created.");
      }
    },
    removeFood(foodId) {
      alerts.showConfirm("Press 'OK' to delete the user", this.deleteFood, foodId);
    },
    async deleteFood(foodId) {
      var api_url = 'api/food/' + foodId;
      const result = await http_util.doDelete(this, api_url);

      if (result.status == true) {
        this.getFoods()
        alerts.alertSuccess("Food deleted successfully.");
      }
    },
    async updateFood(foodId) {
      var obj = {
        name: this.ui.editForm.name,
        rateId: this.ui.editForm.rateId
      }
      var api_url = 'api/food/' + foodId;
      var body = JSON.stringify(obj);
      const result = await http_util.doPut(this, api_url, null, body);

      if (result.status == true) {
        this.refresh();
        alerts.alertSuccess("Food has been successfully updated.");
      }
    },
    async getFoodAndFillForm(foodId) {
      var api_url = 'api/food/' + foodId;
      const result = await http_util.doGet(this, api_url);

      if (result.status == true) {
        this.ui.editForm.name = result.data.name;
        this.ui.editForm.rateId = result.data.rateId;
      }
    }
  },
    mounted() {
        this.refresh();
    }
}