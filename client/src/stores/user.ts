import { defineComponent }  from "vue"
import alerts from "@/stores/common/alerts"
import dateTools from "@/stores/date_tools"
import Header from "@/components/HeaderComponent.vue"
import http_util from "@/stores/http_util"

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  dob: number;
}

export default defineComponent({
    data() {
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
            age: "",
            dob: ""
          }
        },
        users: [],
        eatingHealth: new Map(),
        charts: []
      }
    },
    components: {
      "Header": Header
    },
    methods: {
      refresh() {
        this.showUserTable();
        this.getUsers();
      },
      cleanEditForm(): void {
        this.ui.editForm.id = null;
        this.ui.editForm.firstName = '';
        this.ui.editForm.lastName = '';
        this.ui.editForm.dob = dateTools.millisToString((new Date()).valueOf());
      },
      showUserTable(): void {
        this.ui.showTable = true;
        this.ui.showEditForm = false;
        this.redrawChartjs();
      },
      showAddUser(): void {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.cleanEditForm();
      },
      showUpdateUser(userId: number): void {
        this.ui.showTable = false;
        this.ui.showEditForm = true;
        this.ui.editForm.id = userId;
        this.getUserAndFillForm(userId);
      },
      showPreviousPage(): void {
        if(this.ui.page > 0) {
          this.ui.page = this.ui.page - 1;
          this.getUsers();
        }
      },
      showNextPage(): void {
        this.ui.page = this.ui.page + 1;
        this.getUsers();
      },
      goToUserFood(userId: number): void {
        this.$router.push({path: '/userfood', query: {userId: userId}});
      },
      destroyCharts(): void {
        for (var i = 0; i < this.charts.length; i++) {
          this.charts[i].destroy();
        }
      },
      getUserChartId(userId: number): string {
        return "user-chart-" + userId;
      },
      redrawChartjs(): void {
        var self = this;
        setTimeout(function() {
          for (var i = 0; i < self.users.length; i++) {
            self.formChartjs((self.users[i] as User).id);
          }
        }, 100);
      },
      formChartjs(userId: number): void {
        var userData =  this.eatingHealth.get(userId);
        if (!userData) {
          return;
        }
       
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

        let chartId: string = this.getUserChartId(userId);
        this.removeChart(chartId);

        let ctx = document.getElementById(chartId);
        let chart: any = new Chart(ctx, {
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

      removeChart(chartId: string): void {
        try {
          let chart: any = Chart.getChart(chartId);
          chart.destroy();
        } catch(error) {}
      },

      async getUsers(): Promise<void> {
        var api_url = 'api/users/pagination?limit=' + this.ui.limit + '&page=' + this.ui.page;
        const result = await http_util.doGet(this, api_url, null);

        if (result.status == true) {
          this.users = [];
          this.eatingHealth = new Map();
          this.destroyCharts();
          for (var i = 0; i < result.data.length; i++) {
            let user: User = result.data[i];
            
            user.age = Math.round((Date.now() - user.dob) / 1000 / 60 / 60 / 24 / 365);
            
            this.users.push(user);
            this.getEatingHealthReport(user.id);
          }
        }
      },
      async getEatingHealthReport(userId: number): Promise<void> {
        var api_url = 'api/userfoods/eatinghealth/user/' + userId;
        const result = await http_util.doGet(this, api_url, null);
  
        if (result.status == true) {
          this.eatingHealth.set(userId, result.data);
          this.formChartjs(userId);
        }
      },
      removeUser(userId: number): void {
        alerts.showConfirm("Press 'OK' to delete the user", this.deleteUser, userId);
      },
      async deleteUser(userId: number) {
        var api_url = 'api/user/' + userId;
        const result = await http_util.doDelete(this, api_url, null);
        
        if (result.status == true) {
          this.getUsers()
          alerts.alertSuccess("User deleted successfully.");
        }
      },
      saveUser(): void {
        if (this.ui.editForm.id == null) {
          this.addUser();
        } else {
          alerts.showConfirm("Press 'OK' to update the user", this.updateUser, this.ui.editForm.id);
        }
      },
      async addUser(): Promise<void> {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          dob: dateTools.stringToMillis(this.ui.editForm.dob)
        }
        var api_url = 'api/user';
        var body = JSON.stringify(obj);
        const result = await http_util.doPost(this, api_url, null, body);

        if (result.status == true) {
          this.refresh();
          alerts.alertSuccess("User has been successfully created.");
        }
      },
      async updateUser(userId: number): Promise<void> {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          dob: dateTools.stringToMillis(this.ui.editForm.dob)
        }
        var api_url = 'api/user/' + userId;
        var body = JSON.stringify(obj);
        const result = await http_util.doPut(this, api_url, null, body);
  
        if (result.status == true) {
          this.refresh();
          alerts.alertSuccess("User has been successfully updated.");
        }
      },
      async getUserAndFillForm(userId: number): Promise<void> {
        var api_url = 'api/user/' + userId;
        const result = await http_util.doGet(this, api_url, null);
  
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
  })