import { reviews } from './reviews.js'

//Gallery
$(document).ready(function () {
  $('.gallery-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      640: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  })
})

//Reviews elements
const reviewsContainer = document.getElementById('reviews-carousel')

reviews.forEach(({ name, rating, comment }) => {
  const reviewEl = document.createElement('div')
  reviewEl.classList.add('review-card')

  reviewEl.innerHTML = `
    <div class="review">
      <h5 class="review-name">${name}</h5>
      <p class="review-stars">${'⭐'.repeat(rating)}</p>
      <p class='review-comment'>${comment}</p>
    </div>
  `

  reviewsContainer.appendChild(reviewEl)
})

//Reviews carousel
$(document).ready(function () {
  $('#reviews-carousel').owlCarousel({
    items: 3,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  })
})

function normalizeOwlHeights() {
  const items = document.querySelectorAll('.owl-item .review-card')
  let maxHeight = 0

  items.forEach((el) => {
    el.style.height = 'auto'
    if (el.offsetHeight > maxHeight) maxHeight = el.offsetHeight
  })

  items.forEach((el) => {
    el.style.height = maxHeight + 'px'
  })
}

$('.owl-carousel').on(
  'initialized.owl.carousel resized.owl.carousel refreshed.owl.carousel',
  function () {
    normalizeOwlHeights()
  }
)

//To top btn
const scrollBtn = document.getElementById('toTop')

window.addEventListener('scroll', () => {
  if (window.scrollY > 700) {
    scrollBtn.classList.add('show')
  } else {
    scrollBtn.classList.remove('show')
  }
})

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})
