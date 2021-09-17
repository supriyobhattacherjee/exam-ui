<template>
<div class="rounded-3 w-50 float-end p-1 bg-light">
    <form>
    <h1 class="h3 mb-3 fw-normal fw-bolder text-center">Book For Demo</h1>
    <p class="mb-3 text-center">Bringing excellence to your career</p>
    <div class="form-floating">
      <input type="email" class="form-control" id="username" placeholder="User Name ">
      <label for="floatingInput">Name</label>
    </div>
    <div class="form-floating my-1">
      <input type="tel" class="form-control" id="floatingcontact" placeholder="Mobile">
      <label for="floatingcontact">Enter Your Mobile Number</label>
    </div>
    <div class="row my-1">
      <div class="col-sm-6">
        <div class="form-floating">
        <input type="text" class="form-control" id="email" placeholder="Email Address">
        <label for="email">Email Address</label>

      </div>
      </div>
      <div class="col-sm-6">
        <div class="form-floating">
        <input type="text" class="form-control" id="state" placeholder="State">
        <label for="state">State</label>

        </div>
      </div>
    </div>
    <button class="w-100 btn btn-lg my-1" type="submit">Schedule For a free demo</button>
  </form>
  </div>
</template>
<style scoped>
 .btn{
   background-image: linear-gradient(to right, #FF8E32, #FF5263);
 }
</style>