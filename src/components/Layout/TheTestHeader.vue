<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-success mb-3" aria-label="Third navbar example">
    <div class="container-fluid">
      <a class="navbar-brand text-uppercase fw-bold" href="#">Exam Portal | Student</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" @click="gotoLink('userslist', 'home')">Home</a>
          </li>
          <li class="nav-item">
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-sm-0">
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-bold" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Welcome {{loggedInUser.firstName}}</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" @click="logout">Sign out</a></li>
              <li><a class="dropdown-item" href="#">Change Settings</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>