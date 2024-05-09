import alerts from "@/stores/common/alerts.js"
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
            id: null,
            name: '',
            value: 0,
            colorHex: "#FFFFFF"
          }
        },
        rates: []
      }
    },
    components: {"Dropdown": Dropdown},
    methods: {
        refresh() {
            this.showRateTable();
            this.getRates();
          },
          cleanEditForm() {
            this.ui.editForm.id = null;
            this.ui.editForm.name = '';
            this.ui.editForm.value = '';
            this.ui.editForm.colorHex = '';
          },
          showRateTable() {
            this.ui.showTable = true;
            this.ui.showEditForm = false;
          },
          showAddRate() {
            this.ui.showTable = false;
            this.ui.showEditForm = true;
            this.cleanEditForm();
          },
          showUpdateRate(rateId) {
            this.ui.showTable = false;
            this.ui.showEditForm = true;
            this.ui.editForm.id = rateId;
            this.getRateAndFillForm(rateId);
          },
          showPreviousPage() {
            if(this.ui.page < 1) {
              return false;
            } else {
              this.ui.page = this.ui.page - 1;
              this.getRates();
            }
          },
          showNextPage() {
            this.ui.page = this.ui.page + 1;
            this.getRates();
          },
        async getRates() {

            try {
              const response = await fetch(http_util.getBaseUrl() + 'api/rates/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page, {
                method: 'GET',
                headers: http_util.getHeaders()
              })
              const result = await response.json()
      
              if (result.status == true) {
                this.rates = []
                for (var i = 0; i < result.data.length; i++) {
                  this.rates.push(result.data[i])
                }
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
          saveRate() {
            if (this.ui.editForm.id == null) {
              this.addRate();
            } else {
              alerts.showConfirm("Press 'OK' to update the rate", this.updateRate, this.ui.editForm.id);
            }
          },
        async addRate() {
            var obj = {
              name: this.ui.editForm.name,
              value: this.ui.editForm.value,
              colorHex: this.ui.editForm.colorHex
            }
            try {
              const response = await fetch(http_util.getBaseUrl() + 'api/rate', {
                method: 'POST',
                headers: http_util.getHeaders(),
                body: JSON.stringify(obj)
              })
              const result = await response.json()
      
              if (result.status == true) {
                this.refresh();
                alerts.alertSuccess("Rate has been successfully created.");
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
        async updateRate(rateId) {
            var obj = {
              name: this.ui.editForm.name,
              value: this.ui.editForm.value,
              colorHex: this.ui.editForm.colorHex
            }
            try {
              const response = await fetch(http_util.getBaseUrl() + 'api/rate/' + rateId, {
                method: 'PUT',
                headers: http_util.getHeaders(),
                body: JSON.stringify(obj)
              })
              const result = await response.json()
      
              if (result.status == true) {
                this.refresh();
                alerts.alertSuccess("Rate has been successfully updated.");
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
        removeRate(rateId) {
            alerts.showConfirm("Press 'OK' to delete the rate", this.deleteRate, rateId);
        },
        async deleteRate(rateId) {
            try {
              const response = await fetch(http_util.getBaseUrl() + 'api/rate/' + rateId, {
                method: 'DELETE',
                headers: http_util.getHeaders()
              })
              const result = await response.json()
      
              if (result.status == true) {
                this.getRates()
                alerts.alertSuccess("Rate deleted successfully.");
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
        async getRateAndFillForm(rateId) {
            try {
              const response = await fetch(http_util.getBaseUrl() + 'api/rate/' + rateId, {
                method: 'GET',
                headers: http_util.getHeaders()
              })
      
              const result = await response.json()
      
              if (result.status == true) {
                this.ui.editForm.name = result.data.name;
                this.ui.editForm.value = result.data.value;
                this.ui.editForm.colorHex = result.data.colorHex;
              } else {
                alerts.alertError(result.error_msg);
              }
            } catch (error) {
              alerts.alertError(error);
            }
          },
    },
    mounted() {
      this.refresh()
    }
  }