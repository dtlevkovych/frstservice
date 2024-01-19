<script src="@/stores/food.js"></script>

<template>
  <article id="article-food" class="article-params not-visible">
    <div id="user-table" style="text-align: center">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rate</th>
            <th scope="col">
              <button @click="showAddFood()" class="btn btn-outline-success btn-sm">Add</button>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </article>
</template>