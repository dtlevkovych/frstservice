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
            age: 0
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
        this.ui.editForm.age = 0;
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
              this.users.push(result.data[i])
            }
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      },
      removeUser(userId) {
        if (confirm("Press 'OK' to delete the user.") == false) return;

        this.deleteUser(userId);
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
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      },
      saveUser() {
        if (this.ui.editForm.id == null) {
          this.addUser();
        } else {
          if (confirm("Press 'OK' to update the user.") == false) return;
          
          this.updateUser(this.ui.editForm.id);
        }
      },
      async addUser() {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          age: this.ui.editForm.age
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
            setTimeout(alert, 1000, "User has been successfully created.");
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      },
      async updateUser(userId) {
        var obj = {
          firstName: this.ui.editForm.firstName,
          lastName: this.ui.editForm.lastName,
          age: this.ui.editForm.age
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
            setTimeout(alert, 1000, "User has been successfully updated.");
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
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
            this.ui.editForm.age = result.data.age;
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }