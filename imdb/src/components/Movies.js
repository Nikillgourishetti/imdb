import React, { useEffect, useState, } from 'react'
import Pagination from './Pagination'
import axios from 'axios'

// const movies = [{
//    id : 1,
//    posterURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI8qGCxpgXlfX6nPnLtSLl_vPQ7uMwi3kP5Q&usqp=CAU",
//    title : "Naruto"
// }, {
//   id : 2,
//   posterURL : "https://m.media-amazon.com/images/I/81dH7-pkjiL._AC_UF894,1000_QL80_.jpg",
//   title : "Attack On Titans"
// },{
//   id : 3,
//   posterURL : "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6557b3c8-1067-4397-8aa3-81eb99597be9.jpg",
//   title : "Boruto"
// }]

function Movies() {

  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState([1])
  const [watchlist, setWatchList] = useState( JSON.parse(localStorage.getItem("imdb") || "[]" ))
  const [hoveredMovie, setHoveredMovie] = useState(null)
  const [loading, setLoading] = useState(false)




  const getAllMovies = async () =>{
    setLoading(true)
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=1e4b269a02cf083eed985db4bfb7c19d&page=${currentPage}`)
    const moviesResponse = response.data.results

    setMovies(moviesResponse)
    setLoading(false)
  }

  const decreasePageNo = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const increasePageNo = () => {
        setCurrentPage(currentPage + 1)
  }

  const resetPageNo = () => {
    setCurrentPage(1)
}


    useEffect(()=> {
      getAllMovies()
    }, [currentPage])

    const addToWatchList = (movie) =>{
      const newWatchlist = [...watchlist]
      newWatchlist.push(movie)

      localStorage.setItem("imdb", JSON.stringify(newWatchlist))

      setWatchList(newWatchlist)
    }  

    const removeFromWatchList =(movieCurrent) =>{
      const newWatchlist = watchlist.filter((movie) => {
        return movieCurrent.id !== movie.id
      })

      localStorage.setItem("imdb", JSON.stringify(newWatchlist))

      setWatchList(newWatchlist)
    }

    const WatchlistIds = watchlist.map((movie) => movie.id)

  return (
    <div>
      <div className='text-2xl mt-4 mb-8 font-bold text-center'>Trending Movies</div>

      <div className='flex justify-around flex-wrap'>
          
          { loading ? (
            <div>Loading</div>
          ): movies.map((movie) => {
            return (
              <div onMouseOver={() => setHoveredMovie(movie.id)}
                   onMouseLeave={() => setHoveredMovie(null)}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
              }} key={movie.id} className=' overflow-hidden w-[250px] h-[35vh] bg-center bg-cover m-4 md:h-[55vh] md:w-[250px] flex items-end rounded-xl hover:scale-110 duration-300 relative'>
                <div 
                style={{visibility: movie.id === hoveredMovie ? "visible" : "hidden"}}
                className='text-2xl p-2 bg-gray-900 text-white absolute left-2 top-2 bg-opacity-70'>
                {WatchlistIds.includes(movie.id) ? (
                  <div onClick={() => removeFromWatchList(movie)} >
                     <div> - </div>
                   </div>
                ):
                  <div onClick={() => addToWatchList(movie)} >
                   <div> 😍 </div>
                  </div>
                }
                  </div>
                              
                <div className='text-white font-bold text-center w-full bg-gray-900 bg-opacity-60'>
                  {movie.title}
                </div>
              </div>
            )
          })}
      </div>

      <Pagination decreasePageNo={decreasePageNo} increasePageNo={increasePageNo} page={currentPage} resetPageNo={resetPageNo} />
    </div>
  )
}

export default Movies