import alerts from "@/stores/common/alerts.js"
import dateTools from "@/stores/date_tools.js"
import Dropdown from "@/components/DropdownComponent.vue"
import http_util from "@/stores/http_util.js"

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
        console.log(this.$store);
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
        var api_url = 'api/users/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
        const result = await http_util.doGet(this, api_url, http_util.getHeaders());

        if (result.status == true) {
          this.users = [];
          this.eatingHealth = new Map();
          this.destroyCharts();
          for (var i = 0; i < result.data.length; i++) {
            result.data[i].age = parseInt((Date.now() - result.data[i].dob) / 1000 / 60 / 60 / 24 / 365);
            this.users.push(result.data[i]);
            this.getEatingHealthReport(result.data[i].id);
          }
        }
      },
      async getEatingHealthReport(userId) {
        var api_url = 'api/userfoods/eatinghealth/user/' + userId;
        const result = await http_util.doGet(this, api_url, http_util.getHeaders());
  
        if (result.status == true) {
          this.eatingHealth.set(userId, result.data);
          this.formChartjs(userId);
        }
      },
      removeUser(userId) {
        alerts.showConfirm("Press 'OK' to delete the user", this.deleteUser, userId);
      },
      async deleteUser(userId) {
        var api_url = 'api/user/' + userId;
        const result = await http_util.doDelete(this, api_url, http_util.getHeaders());
        
        if (result.status == true) {
          this.getUsers()
          alerts.alertSuccess("User deleted successfully.");
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
        var api_url = 'api/user';
        var body = JSON.stringify(obj);
        const result = await http_util.doPost(this, api_url, http_util.getHeaders(), body);

        if (result.status == true) {
          this.refresh();
          alerts.alertSuccess("User has been successfully created.");
        }
      },
      async updateUser(userId) {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          dob: dateTools.stringToMillis(this.ui.editForm.dob)
        }
        var api_url = 'api/user/' + userId;
        var body = JSON.stringify(obj);
        const result = await http_util.doPut(this, api_url, http_util.getHeaders(), body);
  
        if (result.status == true) {
          this.refresh();
          alerts.alertSuccess("User has been successfully updated.");
        }
      },
      async getUserAndFillForm(userId) {
        var api_url = 'api/user/' + userId;
        const result = await http_util.doGet(this, api_url, http_util.getHeaders());
  
        if (result.status == true) {
          this.ui.editForm.firstName = result.data.firstName;
          this.ui.editForm.lastName = result.data.lastName;
          this.ui.editForm.dob = dateTools.millisToString(result.data.dob);
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }