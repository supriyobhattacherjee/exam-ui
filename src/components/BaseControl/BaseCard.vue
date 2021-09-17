<template>
  <div class="card text-center mb-2">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <slot name="title"></slot>
      </h5>
      <p class="card-text">
        <slot name="body"></slot>
      </p>
      <slot name="buttons">
        
      </slot>
    </div>
    <div class="card-footer text-muted">
      <slot name="footer"></slot>
    </div>
  </div>
</template>