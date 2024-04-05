import alerts from "@/stores/common/alerts.js"
import dateTools from "@/stores/date_tools.js"
import Dropdown from "@/components/DropdownComponent.vue"

export default {
    data: function () {
      return {
        ui: {
          page: 0,
          limit: 3,
          showTable: true,
          showEditForm: false,
          editForm: {
            id: null,
            firstName: '',
            lastName: '',
            age: 0,
            dob: ""
          }
        },
        users: [],
        eatingHealth: new Map(),
        charts: []
      }
    },
    components: {"Dropdown": Dropdown},
    methods: {
      refresh() {
        this.showUserTable();
        this.getUsers();
      },
      cleanEditForm() {
        this.ui.editForm.id = null;
        this.ui.editForm.firstName = '';
        this.ui.editForm.lastName = '';
        this.ui.editForm.dob = dateTools.millisToString((new Date()).valueOf());
      },
      showUserTable() {
        this.ui.showTable = true;
        this.ui.showEditForm = false;
        this.redrawChartjs();
      },
      showAddUser() {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.cleanEditForm();
      },
      showUpdateUser(userId) {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.ui.editForm.id = userId;
        this.getUserAndFillForm(userId);
      },
      showPreviousPage() {
        if(this.ui.page < 1) {
          return false;
        } else {
          this.ui.page = this.ui.page - 1;
          this.getUsers();
        }
      },
      showNextPage() {
        this.ui.page = this.ui.page + 1;
        this.getUsers();
      },
      goToUserFood(userId) {
        this.$router.push({path: '/userfood', query: {userId: userId}});
      },
      destroyCharts() {
        for (var i = 0; i < this.charts; i++) {
          this.charts[i].destroy();
        }
      },
      getUserChartId(userId) {
        return "user-chart-" + userId;
      },
      redrawChartjs() {
        var self = this;
        setTimeout(function() {
          for (var i = 0; i < self.users.length; i++) {
            self.formChartjs(self.users[i].id);
          }
        }, 100);
      },
      formChartjs(userId) {
        var userData =  this.eatingHealth.get(userId);
       
        var lables = [];
        var datasetsData = [];
        var datasetsColor = [];
        for (var i = 0; i < userData.length; i++) {
          lables.push(userData[i].name);
          datasetsData.push(userData[i].count);
          datasetsColor.push(userData[i].colorHex);
        }
        const data = {
          labels: lables,
          datasets: [{
            label: 'Eating Health.',
            data: datasetsData,
            backgroundColor: datasetsColor,
            hoverOffset: 4
          }]
        };

        var chartId = this.getUserChartId(userId);
        
        var chart = Chart.getChart(chartId);
        
        try {
          chart.destroy();
        } catch(error) {}

        var ctx = document.getElementById(chartId);
        chart = new Chart(ctx, {
          type: 'pie',
          data: data,
          options: {
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });

        this.charts.push(chart);

      },
      async getUsers() {

        try {
          const response = await fetch('http://127.0.0.1:3000/api/users/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.users = [];
            this.eatingHealth = new Map();
            this.destroyCharts();
            for (var i = 0; i < result.data.length; i++) {
              result.data[i].age = parseInt((Date.now() - result.data[i].dob) / 1000 / 60 / 60 / 24 / 365);
              this.users.push(result.data[i]);
              this.getEatingHealthReport(result.data[i].id);
            }
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      },
      async getEatingHealthReport(userId) {

        try {
          const response = await fetch('http://127.0.0.1:3000/api/userfoods/eatinghealth/user/' + userId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const result = await response.json();
  
          if (result.status == true) {
            this.eatingHealth.set(userId, result.data);
            this.formChartjs(userId);
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      },
      removeUser(userId) {
        alerts.showConfirm("Press 'OK' to delete the user", this.deleteUser, userId);
      },
      async deleteUser(userId) {
        try {
          const response = await fetch('http://127.0.0.1:3000/api/user/' + userId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.getUsers()
            alerts.alertSuccess("User deleted successfully.");
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      },
      saveUser() {
        if (this.ui.editForm.id == null) {
          this.addUser();
        } else {
          alerts.showConfirm("Press 'OK' to update the user", this.updateUser, this.ui.editForm.id);
        }
      },
      async addUser() {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          dob: dateTools.stringToMillis(this.ui.editForm.dob)
        }
        try {
          const response = await fetch('http://127.0.0.1:3000/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.refresh();
            alerts.alertSuccess("User has been successfully created.");
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      },
      async updateUser(userId) {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          dob: dateTools.stringToMillis(this.ui.editForm.dob)
        }
        try {
          const response = await fetch('http://127.0.0.1:3000/api/user/' + userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.refresh();
            alerts.alertSuccess("User has been successfully updated.");
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      },
      async getUserAndFillForm(userId) {
        try {
          const response = await fetch('http://127.0.0.1:3000/api/user/' + userId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const result = await response.json()
  
          if (result.status == true) {
            this.ui.editForm.firstName = result.data.firstName;
            this.ui.editForm.lastName = result.data.lastName;
            this.ui.editForm.dob = dateTools.millisToString(result.data.dob);
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }