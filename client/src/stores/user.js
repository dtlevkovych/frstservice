export default {
    data: function () {
      return {
        users: []
      }
    },
    methods: {
      refresh() {
        this.showUserTable()
        this.getUsers()
      },
      async getUsers() {
        console.log("get users");
        try {
          const response = await fetch('http://127.0.0.1:5000/users?order_by=id', {
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
      async deleteUser(userId) {
        try {
          const response = await fetch('http://127.0.0.1:5000/user/' + userId, {
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
      showUserTable() {
        document.getElementById('user-table').style.display = 'block'
        document.getElementById('user-edit').style.display = 'none'
      },
      showAddUser() {
        document.getElementById('userId').value = ''
        document.getElementById('user-table').style.display = 'none'
        document.getElementById('user-edit').style.display = 'block'
      },
      showUpdateUser(userId) {
        this.getUserAndFillForm(userId)
        document.getElementById('userId').value = userId
        document.getElementById('user-table').style.display = 'none'
        document.getElementById('user-edit').style.display = 'block'
      },
      saveUser() {
        var userId = document.getElementById('userId').value
        if (userId == '') {
          this.addUser()
        } else {
          this.updateUser(userId)
        }
      },
      async addUser() {
        var firstName = document.getElementById('firstName').value
        var lastName = document.getElementById('lastName').value
        var age = document.getElementById('age').value
        var obj = {
          firstName: firstName,
          lastName: lastName,
          age: age
        }
        try {
          const response = await fetch('http://127.0.0.1:5000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.refresh()
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      },
      async updateUser(userId) {
        var firstName = document.getElementById('firstName').value
        var lastName = document.getElementById('lastName').value
        var age = document.getElementById('age').value
        var obj = {
          firstName: firstName,
          lastName: lastName,
          age: age
        }
        try {
          const response = await fetch('http://127.0.0.1:5000/user/' + userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          const result = await response.json()
  
          if (result.status == true) {
            this.refresh()
          } else {
            alert(result.error_msg)
          }
        } catch (error) {
          alert('Error: ', error)
        }
      },
      async getUserAndFillForm(userId) {
        try {
          const response = await fetch('http://127.0.0.1:5000/user/' + userId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const result = await response.json()
  
          if (result.status == true) {
            document.getElementById('firstName').value = result.data.firstName
            document.getElementById('lastName').value = result.data.lastName
            document.getElementById('age').value = result.data.age
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