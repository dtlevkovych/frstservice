<script src="@/stores/userfood.js"></script>

<template>
    <article id="article-userfood">

     <div v-if="ui.showTable" id="userfood-table">
        
        <div class="d-grid justify-content-md-end">
          <button @click="showUserTable()" class="btn border-0">&#8592;Back</button>
        </div>

        <div>
            <button class="btn btn-link" v-if="ui.page > 0" @click="showPreviousPage">&#8592;Previous</button>
            <button class="btn btn-link" v-if="userfoods.length >= ui.limit" @click="showNextPage">Next&#8594;</button>
        </div>

      <div style="text-align: center;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Rate</th>
              <th scope="col">
                <button @click="showAddUserFood()" class="btn btn-outline-success btn-sm">Add</button>
              </th>
            </tr>
          </thead>
          <tr v-for="uf in userfoods">
            <td>{{ uf.name }}</td>
            <td><input disabled type="color" :value="getRateColor(uf.rateId)" /></td>
            <td>
                <button @click="removeUserFood(uf.id)" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
        </table>
      </div>

    </div>

    <div v-if="ui.showAddForm" id="userfood-edit">
        
        <div class="d-grid justify-content-md-end">
          <button @click="showUserFoodTable()" class="btn border-0">&#8592;Back</button>
        </div>

        <div class="input-group mx-auto m-3 w-25 py-4">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">Search food</span>
            </div>
            <input id="searchfood" type="text" placeholder="Search" class="form-control" v-model="ui.editForm.searchfood" @input="getFoods()" />
        </div>

        <div style="text-align: center;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"><button class="btn btn-outline-success btn-sm" @click="showAddFood()">Add Food</button></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tr v-for="f in foods">
            <td>{{ f.name }}</td>
            <td><input disabled type="color" :value="getRateColor(f.rateId)" /></td>
            <td>
                <button @click="addUserFood(f.id)" class="btn btn-outline-success btn-sm">Add</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div v-if="ui.showAddFood" id="food-edit">
      <div class="control-group mx-auto m-3 w-25">
        <label for="name">Name</label>
        <input id="name" type="text" class="form-control" v-model="ui.editForm.foodname" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <label for="value">Rate</label>
        <select id="value" class="form-select" v-model="ui.editForm.rateId">
          <option v-for="r in rates.values()" v-bind:value="r.id">{{ r.name }}</option>
        </select>
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <button @click="addFood()" class="btn btn-outline-success btn-sm">Save</button>
        &nbsp;
        <button @click="showAddUserFood()" class="btn btn-outline-dark btn-sm">Cancel</button>
      </div>
    </div>

    </article>
</template>