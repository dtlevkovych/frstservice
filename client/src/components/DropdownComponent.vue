<script src="@/stores/login.js"></script>

<template>
    <div class="dropdown">
        <button class="btn btn-light btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="../assets/settings.png" /></button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/">User</a></li>
            <li><a class="dropdown-item" href="/food">Food</a></li>
            <li><a class="dropdown-item" href="/rate">Rate</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item" @click="logout()">Logout</button></li>
        </ul>
    </div>
</template>