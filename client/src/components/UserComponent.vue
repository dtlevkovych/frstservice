<script src="@/stores/user.ts"></script>


<template>
  <article id="article-user">

    <div v-if="ui.showTable" id="user-table">
      <div>
        <Header />
      </div>
      <button class="btn btn-link" v-if="ui.page > 0" @click="showPreviousPage">&#8592;Previous</button>
      <button class="btn btn-link" v-if="users.length >= ui.limit" @click="showNextPage">Next&#8594;</button>

      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col" style="text-align: right;">
                <button @click="showAddUser()" class="btn btn-outline-success">Add</button>&nbsp;&nbsp;&nbsp;
              </th>
            </tr>
          </thead>
          <tr v-for="u in users">
            <td style="padding: 50px; text-align: center;">
              <p><h3>{{ u.firstName }} {{ u.lastName }}</h3></p>
              <p>
                {{ u.age }} yo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button @click="showUpdateUser(u.id)" class="btn btn-link btn-sm">Edit</button>
                <button @click="removeUser(u.id)" class="btn btn-link btn-sm">Delete</button>
              </p>
            </td>
            <td>
              <div class="chart-container" style="width: 200px; height: 200px;">
                <canvas :id="getUserChartId(u.id)"></canvas>
              </div>
            </td>
            <td><button class="btn btn-dark btn-secondary" @click="goToUserFood(u.id)">Details</button></td>
          </tr>
        </table>
      </div>

    </div>

    <div v-if="ui.showEditForm" id="user-edit">
      <div>
        <Header />
      </div>
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