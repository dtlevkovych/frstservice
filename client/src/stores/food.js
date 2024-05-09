import alerts from "@/stores/common/alerts.js"
import rates from "@/stores/common/rate.js"
import Dropdown from "@/components/DropdownComponent.vue"
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
      "Dropdown": Dropdown
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
        try {
          const response = await fetch(http_util.getBaseUrl() + 'api/foods/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page + '', {
            method: 'GET',
            headers: http_util.getHeaders()
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.foods = []
            for (var i = 0; i < result.data.length; i++) {
              this.foods.push(result.data[i])
            }
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      },
    getRates() {
      rates.getRates(this.rates);
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
      try {
        const response = await fetch(http_util.getBaseUrl() + 'api/food', {
          method: 'POST',
          headers: http_util.getHeaders(),
          body: JSON.stringify(obj)
        })
        const result = await response.json()

        if (result.status == true) {
          this.refresh();
          alerts.alertSuccess("Food has been successfully created.");
        } else {
          alerts.alertError(result.error_msg);
        }
      } catch (error) {
        alerts.alertError(error);
      }
    },
    removeFood(foodId) {
      alerts.showConfirm("Press 'OK' to delete the user", this.deleteFood, foodId);
    },
    async deleteFood(foodId) {
      try {
        const response = await fetch(http_util.getBaseUrl() + 'api/food/' + foodId, {
          method: 'DELETE',
          headers: http_util.getHeaders()
        })
        const result = await response.json()

        if (result.status == true) {
          this.getFoods()
          alerts.alertSuccess("Food deleted successfully.");
        } else {
          alerts.alertError(result.error_msg);
        }
      } catch (error) {
        alerts.alertError(error);
      }
    },
    async updateFood(foodId) {
      var obj = {
        name: this.ui.editForm.name,
        rateId: this.ui.editForm.rateId
      }
      try {
        const response = await fetch(http_util.getBaseUrl() + 'api/food/' + foodId, {
          method: 'PUT',
          headers: http_util.getHeaders(),
          body: JSON.stringify(obj)
        })
        const result = await response.json()

        if (result.status == true) {
          this.refresh();
          alerts.alertSuccess("Food has been successfully updated.");
        } else {
          alerts.alertError(result.error_msg);
        }
      } catch (error) {
        alerts.alertError(error);
      }
    },
    async getFoodAndFillForm(foodId) {
      try {
        const response = await fetch(http_util.getBaseUrl() + 'api/food/' + foodId, {
          method: 'GET',
          headers: http_util.getHeaders()
        })

        const result = await response.json()

        if (result.status == true) {
          this.ui.editForm.name = result.data.name;
          this.ui.editForm.rateId = result.data.rateId;
        } else {
          alerts.alertError(result.error_msg);
        }
      } catch (error) {
        alerts.alertError(error);
      }
    }
  },
    mounted() {
        this.refresh();
    }
}