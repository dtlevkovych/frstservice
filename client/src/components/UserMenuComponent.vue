<script src="@/stores/usermenu.ts"></script>

<template>
    <div v-if="store.auth_user != null">
        
        
        <button class="btn btn-light btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img v-bind:src="store.auth_user.profilePic" width="35" height="35" style="border-radius: 50%;"> &nbsp; {{ store.auth_user.name }} &nbsp; &nbsp; &#926;</button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="goToUserPage()">User</a></li>
            <li><a class="dropdown-item" @click="goToFoodPage()">Food</a></li>
            <li><a class="dropdown-item" @click="goToRatePage()">Rate</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item" @click="logout()">Logout</button></li>
        </ul>
    </div>
</template>