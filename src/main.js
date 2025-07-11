import './style.css'

//Mobile sidebar
const hamburger = document.getElementById('hamburgerToggle')
const sidebar = document.getElementById('mobileSidebar')
const overlay = document.getElementById('overlay')
const sidebarLinks = sidebar.querySelectorAll('a')

function openSidebar() {
  sidebar.classList.add('open')
  overlay.classList.add('show')
  document.body.classList.add('noscroll')
}

function closeSidebar() {
  sidebar.classList.remove('open')
  overlay.classList.remove('show')
  document.body.classList.remove('noscroll')
}

hamburger.addEventListener('click', openSidebar)
overlay.addEventListener('click', closeSidebar)

sidebarLinks.forEach((link) => {
  link.addEventListener('click', closeSidebar)
})
