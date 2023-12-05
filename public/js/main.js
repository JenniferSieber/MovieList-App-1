const addLike = document.querySelectorAll('.fa-thumbs-up')
const deleteMovieBtn = document.querySelectorAll('.fa-trash')

Array.from(addLike).forEach(btn => btn.addEventListener('click', e => updateLikes(btn.parentNode)))
Array.from(deleteMovieBtn).forEach(btn => btn.addEventListener('click', e => deleteMovie(btn.parentNode)))

async function deleteMovie(element) {
  const mName = element.dataset.movieName 
  const mGenre = element.dataset.genre 
  const mYear = element.dataset.releaseYear 
  const mImg = element.dataset.imgLink 
  const mLikes = Number(element.dataset.likes)
  try {
    const response = await fetch('/deleteMovie', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'movieNameS': mName,
        'genreS': mGenre,
        'releaseYearS': mYear,
        'imgLinkS': mImg,
        'likesS': mLikes
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err) {
    console.error(err)
  }
}

async function updateLikes(element) {
  console.log(element.dataset.movieName)
  const mName = element.dataset.movieName 
  const mGenre = element.dataset.genre 
  const mYear = element.dataset.releaseYear 
  const mImg = element.dataset.imgLink 
  const mLikes = Number(element.dataset.likes)
  try {
    const response = await fetch('/updateLikes', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'movieNameS': mName,
        'genreS': mGenre,
        'releaseYearS': mYear,
        'imgLinkS': mImg,
        'likesS': mLikes
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err) {
    console.error(err)
  }
}

