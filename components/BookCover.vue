<template>
  <img class="book-cover" alt="book cover" src="/cover.jpg" />
</template>

<style>
.book-cover {
  object-fit: cover;
  max-width: 200px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
