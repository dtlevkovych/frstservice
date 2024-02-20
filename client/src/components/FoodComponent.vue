<script src="@/stores/food.js"></script>

<template>
  <article id="article-rate" class="article-params">

    <div v-if="ui.showTable" id="food-table">

      <button class="btn btn-link" v-if="ui.page > 0" @click="showPreviousPage">&#8592;Previous</button>
      <button class="btn btn-link" v-if="foods.length >= ui.limit" @click="showNextPage">Next&#8594;</button>

      <div style="text-align: center">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col">
                <button @click="showAddFood()" class="btn btn-outline-success btn-sm">Add</button>
              </th>
            </tr>
          </thead>
          <tr v-for="f in foods">
            <td>{{ f.name }}</td>
            <td><span v-if="rates.has(f.rateId)">{{ rates.get(f.rateId).name }}</span></td>
            <td>
              <button @click="showUpdateFood(f.id)" class="btn btn-outline-primary btn-sm">
                Edit
              </button>
            </td>
            <td>
              <button @click="removeFood(f.id)" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div v-if="ui.showEditForm" id="food-edit">
      <div class="control-group mx-auto m-3 w-25">
        <label for="name">Name</label>
        <input id="name" type="text" class="form-control" v-model="ui.editForm.name" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <label for="value">Rate</label>
        <select id="value" class="form-select" v-model="ui.editForm.rateId">
          <option v-for="r in rates.values()" v-bind:value="r.id">{{ r.name }}</option>
        </select>
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <button @click="saveFood()" class="btn btn-outline-success btn-sm">Save</button>
        &nbsp;
        <button @click="showFoodTable()" class="btn btn-outline-dark btn-sm">Cancel</button>
      </div>
    </div>

  </article>
</template>