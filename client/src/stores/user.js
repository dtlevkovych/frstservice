import alerts from "@/stores/alerts.js"

export default {
    data: function () {
      return {
        ui: {
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
        users: []
      }
    },
    methods: {
      refresh() {
        this.showUserTable()
        this.getUsers()
      },
      cleanEditForm() {
        this.ui.editForm.id = null;
        this.ui.editForm.firstName = '';
        this.ui.editForm.lastName = '';
      },
      showUserTable() {
        this.ui.showTable = true;
        this.ui.showEditForm = false;
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
      async getUsers() {

        try {
          const response = await fetch('http://127.0.0.1:3000/api/users?order_by=id', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.users = []
            for (var i = 0; i < result.data.length; i++) {
              result.data[i].age = parseInt((Date.now() - result.data[i].dob) / 1000 / 60 / 60 / 24 / 365);
              this.users.push(result.data[i])
            }
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
          dob: this.getMillisFromString(this.ui.editForm.dob)
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
          dob: this.getMillisFromString(this.ui.editForm.dob)
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
            var dob = new Date(result.data.dob);
            var month = (dob.getMonth() + 1);
            var day = dob.getDate();
            this.ui.editForm.dob = "" + dob.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
          } else {
            alerts.alertError(result.error_msg);
          }
        } catch (error) {
          alerts.alertError(error);
        }
      },
      getMillisFromString(date) {
        var dob = new Date();
        var date_arr = date.split("-");
        dob.setFullYear(parseInt(date_arr[0]));
        dob.setMonth(parseInt(date_arr[1]) - 1);
        dob.setDate(parseInt(date_arr[2]));

        return dob.valueOf();
      }
    },
    mounted() {
      this.refresh()
    }
  }