<script src="@/stores/rate.ts"></script>

<template>
  <article id="article-rate">

    <div v-if="ui.showTable" id="rate-table">
      <div>
        <Header />
      </div>

      <button class="btn btn-link" v-if="ui.page > 0" @click="showPreviousPage">&#8592;Previous</button>
      <button class="btn btn-link" v-if="rates.length >= ui.limit" @click="showNextPage">Next&#8594;</button>

      <div style="text-align: center">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
              <th scope="col">Color</th>
              <th scope="col"></th>
              <th scope="col">
                <button @click="showAddRate()" class="btn btn-outline-success btn-sm">Add</button>
              </th>
            </tr>
          </thead>
          <tr v-for="r in rates">
            <td>{{ r.name }}</td>
            <td>{{ r.value }}</td>
            <td> <input disabled type="color" :value="r.colorHex" /></td>
            <td>
              <button @click="showUpdateRate(r.id)" class="btn btn-outline-primary btn-sm">
                Edit
              </button>
            </td>
            <td>
              <button @click="removeRate(r.id)" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div v-if="ui.showEditForm" id="rate-edit">
      <div>
        <Header />
      </div>
      <div class="control-group mx-auto m-3 w-25">
        <label for="name">Name</label>
        <input id="name" type="text" class="form-control" v-model="ui.editForm.name" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <label for="value">Value</label>
        <input id="value" type="number" class="form-control" v-model="ui.editForm.value" />
      </div>

       <div class="control-group mx-auto m-3 w-25">
        <label for="color">Color</label>
        <input id="color" type="color" class="form-control" v-model="ui.editForm.colorHex" />
      </div>

      <div class="control-group mx-auto m-3 w-25">
        <button @click="saveRate()" class="btn btn-outline-success btn-sm">Save</button>
        &nbsp;
        <button @click="showRateTable()" class="btn btn-outline-dark btn-sm">Cancel</button>
      </div>
    </div>

  </article>
</template>