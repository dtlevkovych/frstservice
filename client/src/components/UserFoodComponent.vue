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
              <th scope="col"></th>
            </tr>
          </thead>
          <tr v-for="uf in userfoods">
            <td>{{ uf.name }}</td>
            <td>{{ uf.rateId }}</td>
            <td>
                <button @click="removeUserFood(uf.id)" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
        </table>
      </div>

    </div>

    </article>
</template>