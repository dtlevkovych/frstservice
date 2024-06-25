import alerts from "@/stores/common/alerts"
import rates from "@/stores/common/rate"
import Header from "@/components/HeaderComponent.vue"
import http_util from "@/stores/http_util"
import { defineComponent } from "vue"

interface Food {
  id: number;
  name: string;
  rateId: number;
}

export default defineComponent({
    data() {
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
      refresh(): void {
        this.showFoodTable();
        this.getFoods();
        this.getRates();
      },
      cleanEditForm(): void {
        this.ui.editForm.foodId = null;
        this.ui.editForm.rateId = null;
        this.ui.editForm.name = '';
      },
      showFoodTable(): void {
        this.ui.showTable = true;
        this.ui.showEditForm = false;
      },
      showAddFood(): void {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.cleanEditForm();
      },
      showUpdateFood(foodId: number) {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.ui.editForm.foodId = foodId;
        this.getFoodAndFillForm(foodId);
      },
      showPreviousPage(): void {
        if(this.ui.page > 0) {
          this.ui.page = this.ui.page - 1;
          this.getFoods();
        }
      },
      showNextPage(): void {
        this.ui.page = this.ui.page + 1;
        this.getFoods();
      },
      async getFoods(): Promise<void> {
        var api_url = 'api/foods/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
        const result = await http_util.doGet(this, api_url, null);
        
        if (result.status == true) {
          this.foods = []
          for (var i = 0; i < result.data.length; i++) {
            let food: Food = result.data[i];
            this.foods.push(food);
          }
        }
      },
    getRates(): void {
      rates.getRates(this, this.rates);
    },
    saveFood(): void {
      if (this.ui.editForm.foodId == null) {
        this.addFood();
      } else {
        alerts.showConfirm("Press 'OK' to update the food", this.updateFood, this.ui.editForm.foodId);
      }
    },
    async addFood(): Promise<void> {
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
    removeFood(foodId: number): void {
      alerts.showConfirm("Press 'OK' to delete the user", this.deleteFood, foodId);
    },
    async deleteFood(foodId: number): Promise<void> {
      var api_url = 'api/food/' + foodId;
      const result = await http_util.doDelete(this, api_url, null);

      if (result.status == true) {
        this.getFoods()
        alerts.alertSuccess("Food deleted successfully.");
      }
    },
    async updateFood(foodId: number): Promise<void> {
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
    async getFoodAndFillForm(foodId: number): Promise<void> {
      var api_url = 'api/food/' + foodId;
      const result = await http_util.doGet(this, api_url, null);

      if (result.status == true) {
        this.ui.editForm.name = result.data.name;
        this.ui.editForm.rateId = result.data.rateId;
      }
    }
  },
    mounted() {
        this.refresh();
    }
})