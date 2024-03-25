<script src="@/stores/userfood.js"></script>

<template>
    <article id="article-userfood">

     <div v-if="ui.showTable" id="userfood-table">
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
        <form>
            <div class="form-group mx-auto m-3 w-25">
                <label class="col-lg-5" for="searchfood">Search food</label>
                <div class="col-lg-12">
                    <input id="searchfood" type="text" placeholder="Search" class="form-control" v-model="ui.editForm.searchfood" @input="getFoods()" />
                </div>
            </div>
        </form>
        <div style="text-align: center;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Food</th>
              <th scope="col"></th>
              <th scope="col"><button class="btn btn-outline-dark btn-sm" @click="showUserFoodTable()">Back</button></th>
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

    </article>
</template>