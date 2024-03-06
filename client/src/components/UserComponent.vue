<script src="@/stores/user.js"></script>

<template>
  <article id="article-user" class="article-params">

    <div v-if="ui.showTable" id="user-table">
    
      <button class="btn btn-link" v-if="ui.page > 0" @click="showPreviousPage">&#8592;Previous</button>
      <button class="btn btn-link" v-if="users.length >= ui.limit" @click="showNextPage">Next&#8594;</button>

      <div style="margin-left: 100px;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <button @click="showAddUser()" class="btn btn-outline-success">Add</button>
              </th>
            </tr>
          </thead>
          <tr v-for="u in users">
            <td style="padding: 50px;">
              <p style="margin-top: 0px; padding: 1px;"><h3>{{ u.firstName }} {{ u.lastName }}</h3></p>
              <p style="margin-top: 0px; padding: 1px;">
                {{ u.age }} yo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button @click="showUpdateUser(u.id)" class="btn btn-link btn-sm">Edit</button>
                <button @click="removeUser(u.id)" class="btn btn-link btn-sm">Delete</button>
              </p>
            </td>
            <td>
              <div>
                <canvas :id="getUserChartId(u.id)" width="100px" height="100px"></canvas>
              </div>
            </td>
          </tr>
        </table>
      </div>

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
        <label for="dob">Date Of Birthday</label>
        <input id="dob" type="date" class="form-control" v-model="ui.editForm.dob" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <button @click="saveUser()" class="btn btn-outline-success btn-sm">Save</button>
        &nbsp;
        <button @click="showUserTable()" class="btn btn-outline-dark btn-sm">Cancel</button>
      </div>
    </div>
    
  </article>
</template>