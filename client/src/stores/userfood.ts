import { defineComponent } from "vue"
import alerts from "@/stores/common/alerts"
import rates from "@/stores/common/rate"
import Header from "@/components/HeaderComponent.vue"
import http_util from "@/stores/http_util"

interface UserFood {
  id: number;
  userId: number;
  foodId: number;
}

interface Food {
  id: number;
  name: string;
  rateId: number;
}

export default defineComponent({
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
    components: {
      "Header": Header
    },
    methods: {
        refresh(): void {
            this.userId = this.$route.query.userId;
            this.showUserFoodTable();
            this.getUserFoods();
            this.getRates();
          },
          showUserFoodTable(): void {
            this.ui.showTable = true;
            this.ui.showAddForm = false;
            this.ui.showAddFood = false;
          },
          showAddUserFood(): void {
            this.ui.showAddForm = true;
            this.ui.showTable = false;
            this.ui.showAddFood = false;
          },
          showPreviousPage(): void {
            if(this.ui.page > 0) {
              this.ui.page = this.ui.page - 1;
              this.getUserFoods();
            }
          },
          showNextPage(): void {
            this.ui.page = this.ui.page + 1;
            this.getUserFoods();
          },
          getRateColor(rateId: number): string {
            try{
                return this.rates.get(rateId).colorHex;
            } catch (error) {}

            return "";
          },
          setUserInUserFood(userId: number): void {
            this.userId = userId;
          },
          showAddFood(): void {
            this.ui.showAddFood = true;
            this.ui.showTable = false;
            this.ui.showAddForm = false;
          },
          showUserTable(): void {
            this.$router.push('/user');
          },
        async getUserFoods(): Promise<void> {
            var api_url = 'api/userfoods/user/' + this.userId + '/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
            const result = await http_util.doGet(this, api_url, null);
      
            if (result.status == true) {
              this.userfoods = [];
              for (var i = 0; i < result.data.length; i++) {
                let userfood: UserFood = result.data[i];
                this.userfoods.push(userfood);
              }
            }
          },
          async addUserFood(foodId: number): Promise<void> {
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
          async addFood(): Promise<void> {
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
          removeUserFood(userfoodId: number): void {
            alerts.showConfirm("Press 'OK' to delete the user's food", this.deleteUserFood, userfoodId);
          },
          getRates() {
            rates.getRates(this, this.rates);
          },
          async deleteUserFood(userfoodId: number): Promise<void> {
            var api_url = 'api/userfoods/' + userfoodId;
            const result = await http_util.doDelete(this, api_url, null);
      
            if (result.status == true) {
              this.getUserFoods();
              alerts.alertSuccess("User's food deleted successfully.");
            }
          },
          async getFoods(): Promise<void> {
            var phrase = this.ui.editForm.searchfood;
            var api_url = 'api/foods?phrase=' + phrase;
            const result = await http_util.doGet(this, api_url, null);

            if (phrase == undefined || phrase == null || phrase.length < 2) {
                this.foods = [];
                return;
            }
      
            if (result.status == true) {
              this.foods = [];
              for (var i = 0; i < result.data.length; i++) {
                let food: Food = result.data[i];
                this.foods.push(food);
              }
            }
          }
    },
    mounted() {
      this.refresh();
    }
  })