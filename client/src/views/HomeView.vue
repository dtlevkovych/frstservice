<script setup>
import UserComponent from '@/components/UserComponent.vue'
import FoodComponent from '@/components/FoodComponent.vue'
import RateComponent from '@/components/RateComponent.vue'

function switchContent(articleId) {
    const articles = document.getElementsByClassName('article-params');
    for( var i = 0; i < articles.length; i++) {
        articles.item(i).classList.add('not-visible');  
        if(articles.item(i).id === articleId) {
            articles.item(i).classList.remove('not-visible');
        }
    }
}

</script>

<template>
<div>
    <nav class="navbar navbar-dark bg-dark">
        <div class="btn-group">
            <button @click="switchContent('article-user')" class="btn btn-dark btn-secondary">User</button>
            <button @click="switchContent('article-food')" class="btn btn-dark btn-secondary">Food</button>
            <button @click="switchContent('article-rate')" class="btn btn-dark btn-secondary">Rate</button>
        </div>
    </nav>
</div>
<div>
    <UserComponent />
    <FoodComponent />
    <RateComponent />
</div>

</template>

<style lang="css">

    .visible {
        display: block;
    }

    .not-visible {
        display: none;
    }
</style>
