export const state = () => ({
  list: [
    {
      "id": 1,
      "account": {
        "username": "hunafazaky",
        "password": "12345678"
      },
      "profile": {
        "image_src": "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        "name": "Zaky Syi'ar Hunafa Nugroho",
        "birthdate": "13 September 2000",
        "region_id": 1,
        "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt magni placeat illo, soluta vero facilis molestiae nemo ea incidunt nisi fuga, architecto, ut nihil aut quia illum perspiciatis perferendis voluptatum! Minima sint distinctio, quis ut voluptatum culpa quas voluptatem et libero aspernatur. Illum nobis rerum quo quae nisi earum facilis!"
      },
      "activities": {
        "works": [1, 3, 4, 5, 6],
        "subscriptions": [2, 3],
        "subscriber": [2, 3],
        "reading_list": [1, 2, 3, 4],
      },
      "created_at": "19 April 2022",
      "updated_at": "19 April 2022"
    },
    {
      "id": 2,
      "account": {
        "username": "zashin",
        "password": "12345678"
      },
      "profile": {
        "image_src": "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        "name": "The Shin",
        "birthdate": "1 September 2000",
        "region_id": 1,
        "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt magni placeat illo, soluta vero facilis molestiae nemo ea incidunt nisi fuga, architecto, ut nihil aut quia illum perspiciatis perferendis voluptatum! Minima sint distinctio, quis ut voluptatum culpa quas voluptatem et libero aspernatur. Illum nobis rerum quo quae nisi earum facilis!"
      },
      "activities": {
        "works": [2],
        "subscriptions": [1, 3],
        "subscriber": [1, 3],
        "reading_list": [1, 2, 3, 4],
      },
      "created_at": "1 April 2022",
      "updated_at": "1 April 2022"
    },
    {
      "id": 3,
      "account": {
        "username": "noname",
        "password": "12345678"
      },
      "profile": {
        "image_src": "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        "name": "No Name, No Life",
        "birthdate": "1 Juni 1999",
        "region_id": 1,
        "bio": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt magni placeat illo, soluta vero facilis molestiae nemo ea incidunt nisi fuga, architecto, ut nihil aut quia illum perspiciatis perferendis voluptatum! Minima sint distinctio, quis ut voluptatum culpa quas voluptatem et libero aspernatur. Illum nobis rerum quo quae nisi earum facilis!"
      },
      "activities": {
        "works": [],
        "subscriptions": [1, 2],
        "subscriber": [1, 2],
        "reading_list": [1, 2, 3, 4],
      },
      "created_at": "21 Desember 2012",
      "updated_at": "21 Desember 2012"
    }
  ]
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}