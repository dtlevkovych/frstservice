<script src="@/stores/login.js"></script>

<template>
  <article id="not-logged-in">

    <div class="d-grid">
      <br /><br /><br /><br /><br />
      <label class="form-label col-md-1 mx-auto">Please login</label>
      <div class="col-md-1 mx-auto">
        <a class="btn btn-outline-dark form-control" @click="googleLogin()">Google Login</a>
      </div>
    </div>

  </article>
</template>