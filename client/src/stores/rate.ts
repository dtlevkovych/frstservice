import { defineComponent } from "vue"
import alerts from "@/stores/common/alerts"
import Header from "@/components/HeaderComponent.vue"
import http_util from "@/stores/http_util"

interface Rate {
  id: number;
  name: string;
  value: number;
  colorHex: string;
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
            id: null,
            name: '',
            value: 0,
            colorHex: "#FFFFFF"
          }
        },
        rates: []
      }
    },
    components: {
      "Header": Header
    },
    methods: {
        refresh(): void {
            this.showRateTable();
            this.getRates();
          },
          cleanEditForm(): void {
            this.ui.editForm.id = null;
            this.ui.editForm.name = '';
            this.ui.editForm.value = 0;
            this.ui.editForm.colorHex = '';
          },
          showRateTable(): void {
            this.ui.showTable = true;
            this.ui.showEditForm = false;
          },
          showAddRate(): void {
            this.ui.showTable = false;
            this.ui.showEditForm = true;
            this.cleanEditForm();
          },
          showUpdateRate(rateId: number) {
            this.ui.showTable = false;
            this.ui.showEditForm = true;
            this.ui.editForm.id = rateId;
            this.getRateAndFillForm(rateId);
          },
          showPreviousPage(): void {
            if(this.ui.page > 0) {
              this.ui.page = this.ui.page - 1;
              this.getRates();
            }
          },
          showNextPage(): void {
            this.ui.page = this.ui.page + 1;
            this.getRates();
          },
        async getRates(): Promise<void> {
            var api_url = 'api/rates/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
            const result = await http_util.doGet(this, api_url, null);
      
            if (result.status == true) {
              this.rates = []
              for (var i = 0; i < result.data.length; i++) {
                let rate: Rate = result.data[i];
                this.rates.push(rate);
              }
            }
          },
          saveRate(): void {
            if (this.ui.editForm.id == null) {
              this.addRate();
            } else {
              alerts.showConfirm("Press 'OK' to update the rate", this.updateRate, this.ui.editForm.id);
            }
          },
        async addRate(): Promise<void> {
            var obj = {
              name: this.ui.editForm.name,
              value: this.ui.editForm.value,
              colorHex: this.ui.editForm.colorHex
            }
            var api_url = 'api/rate';
            var body = JSON.stringify(obj);
            const result = await http_util.doPost(this, api_url, null, body);
      
            if (result.status == true) {
              this.refresh();
              alerts.alertSuccess("Rate has been successfully created.");
            }
          },
        async updateRate(rateId: number): Promise<void> {
            var obj = {
              name: this.ui.editForm.name,
              value: this.ui.editForm.value,
              colorHex: this.ui.editForm.colorHex
            }
            var api_url = 'api/rate/' + rateId;
            var body = JSON.stringify(obj);
            const result = await http_util.doPut(this, api_url, null, body);
      
            if (result.status == true) {
              this.refresh();
              alerts.alertSuccess("Rate has been successfully updated.");
            }
          },
        removeRate(rateId: number): void {
            alerts.showConfirm("Press 'OK' to delete the rate", this.deleteRate, rateId);
        },
        async deleteRate(rateId: number): Promise<void> {
            var api_url = 'api/rate/' + rateId;
            const result = await http_util.doDelete(this, api_url, null);
      
            if (result.status == true) {
              this.getRates()
              alerts.alertSuccess("Rate deleted successfully.");
            }
          },
        async getRateAndFillForm(rateId: number): Promise<void> {
            var api_url = 'api/rate/' + rateId;
            const result = await http_util.doGet(this, api_url, null);

            if (result.status == true) {
              this.ui.editForm.name = result.data.name;
              this.ui.editForm.value = result.data.value;
              this.ui.editForm.colorHex = result.data.colorHex;
            }
          },
    },
    mounted() {
      this.refresh()
    }
  })