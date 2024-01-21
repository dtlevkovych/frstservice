<script src="@/stores/user.js"></script>

<template>
  <article id="article-user" class="article-params">
    <div v-if="ui.showTable" id="user-table" style="text-align: center">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">age</th>
            <th scope="col"></th>
            <th scope="col">
              <button @click="showAddUser()" class="btn btn-outline-success btn-sm">Add</button>
            </th>
          </tr>
        </thead>
        <tr v-for="u in users">
          <td>{{ u.firstName }}</td>
          <td>{{ u.lastName }}</td>
          <td>{{ u.age }}</td>
          <td>
            <button @click="showUpdateUser(u.id)" class="btn btn-outline-primary btn-sm">
              Edit
            </button>
          </td>
          <td>
            <button @click="deleteUser(u.id)" class="btn btn-outline-danger btn-sm">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="ui.showEditForm" id="user-edit">
      <div class="control-group mx-auto m-3 w-25">
        <label for="firstName">First name</label>
        <input id="firstName" type="text" class="form-control" v-model="ui.editForm.firstName" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <label for="lastName">Last name</label>
        <input id="lastName" type="text" class="form-control" v-model="ui.editForm.lastName" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <label for="age">Age</label>
        <input id="age" type="number" class="form-control" v-model="ui.editForm.age" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <button @click="saveUser()" class="btn btn-outline-success btn-sm">Save</button>
        &nbsp;
        <button @click="showUserTable()" class="btn btn-outline-dark btn-sm">Cancel</button>
      </div>
    </div>
  </article>
</template>
