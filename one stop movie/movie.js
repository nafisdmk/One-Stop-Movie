// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase,get,set,ref } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWOYoh66i4ttVS_NmTSqEq38AluBxcVTw",
  authDomain: "one-stop-movie-a2928.firebaseapp.com",
  projectId: "one-stop-movie-a2928",
  storageBucket: "one-stop-movie-a2928.appspot.com",
  messagingSenderId: "357129378481",
  appId: "1:357129378481:web:93a939996ab9569ccae090",
  measurementId: "G-K2BKGJWHV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth();
const db=getDatabase(app);
console.log(app);
console.log(db);


//----- Logout code start	  
document.getElementById("logout").addEventListener("click", function() {
  signOut(auth).then(() => {
    
    window.location.href='signIn.html';
    history.pushState(null, null, "signIn.html");
    alert("Sign-out successful.");
  
  }).catch((error) => {
    console.log("An error happened.");
  });		  		  
});


  const APIURL="https://api.themoviedb.org/3/movie/popular?api_key=27d9ff0fdc00e423b6f4e09e70ab787e";
  const IMGPATH="https://image.tmdb.org/t/p/w500/";
  const TVURL="https://api.themoviedb.org/3/trending/tv/day?api_key=27d9ff0fdc00e423b6f4e09e70ab787e";
  const SEARCHAPI="https://api.themoviedb.org/3/search/movie?api_key=27d9ff0fdc00e423b6f4e09e70ab787e&query=";
  // const DETAILAPI="https://api.themoviedb.org/3/movie/${movieId}?api_key=27d9ff0fdc00e423b6f4e09e70ab787e";
  
  const moiveBox = document.querySelector(".movie-box")
  const TVbox= document.querySelector(".TV-box")
  
  const moviegenres =  [
      {
          "id": 28,
          "name": "Action"
      },
      {
          "id": 12,
          "name": "Adventure"
      },
      {
          "id": 16,
          "name": "Animation"
      },
      {
          "id": 35,
          "name": "Comedy"
      },
      {
          "id": 80,
          "name": "Crime"
      },
      {
          "id": 99,
          "name": "Documentary"
      },
      {
          "id": 18,
          "name": "Drama"
      },
      {
          "id": 10751,
          "name": "Family"
      },
      {
          "id": 14,
          "name": "Fantasy"
      },
      {
          "id": 36,
          "name": "History"
      },
      {
          "id": 27,
          "name": "Horror"
      },
      {
          "id": 10402,
          "name": "Music"
      },
      {
          "id": 9648,
          "name": "Mystery"
      },
      {
          "id": 10749,
          "name": "Romance"
      },
      {
          "id": 878,
          "name": "Science Fiction"
      },
      {
          "id": 10770,
          "name": "TV Movie"
      },
      {
          "id": 53,
          "name": "Thriller"
      },
      {
          "id": 10752,
          "name": "War"
      },
      {
          "id": 37,
          "name": "Western"
      },
      
          {
              "id": 10759,
              "name": "Action & Adventure"
          },
          {
              "id": 16,
              "name": "Animation"
          },
          {
              "id": 35,
              "name": "Comedy"
          },
          {
              "id": 80,
              "name": "Crime"
          },
          {
              "id": 99,
              "name": "Documentary"
          },
          {
              "id": 18,
              "name": "Drama"
          },
          {
              "id": 10751,
              "name": "Family"
          },
          {
              "id": 10762,
              "name": "Kids"
          },
          {
              "id": 9648,
              "name": "Mystery"
          },
          {
              "id": 10763,
              "name": "News"
          },
          {
              "id": 10764,
              "name": "Reality"
          },
          {
              "id": 10765,
              "name": "Sci-Fi & Fantasy"
          },
          {
              "id": 10766,
              "name": "Soap"
          },
          {
              "id": 10767,
              "name": "Talk"
          },
          {
              "id": 10768,
              "name": "War & Politics"
          },
          {
              "id": 37,
              "name": "Western"
          }
      
  ]
  
  function getGenreNames(genreIds) {
      return genreIds.map(id => {
          const genre = moviegenres.find(item => item.id === id);
          return genre ? genre.name : "Unknown Genre";
      });
  }
  
  
  const getmovies= async(url)=>{
      const response= await fetch(url);
      const data= await response.json();
      console.log(data);
      showMovies(data);
  }
  // getmovies(APIURL);
  const showMovies=(data)=>{
      data.results.forEach(item => {
          const box=document.createElement("div");
          box.classList.add("box");
          box.dataset.overview = item.overview;
          box.dataset.title= item.original_title;
          box.dataset.popularity= item.popularity;
          box.dataset.adult= item.adult;
          box.dataset.posterPath= item.poster_path;
          box.dataset.movieid = item.id;
  
          box.innerHTML=`
          
          <img class="poster"  src="${IMGPATH+item.poster_path}" >
        <p class="title" >${item.original_title}</p>
        <p class="genre">${getGenreNames(item.genre_ids)}</p>
        
        `
          moiveBox.appendChild(box);
          box.addEventListener('click',displayDetailsMovies);
      });
  
  }
  getmovies(APIURL);
  
  // getmovies(TVURL);
  const getTV= async(url)=>{
      const response= await fetch(url);
      const data= await response.json();
      console.log(data);
      showTV(data);
  }
  // getmovies(APIURL);
  const showTV=(data)=>{
      data.results.forEach(item => {
          const box=document.createElement("div");
          box.classList.add("box");
          box.dataset.overview = item.overview;
          box.dataset.title= item.name;
          box.dataset.popularity= item.popularity;
          box.dataset.adult= item.adult;
          box.dataset.posterPath= item.poster_path;
          box.dataset.movieid = item.id;
          box.innerHTML=`
          <img class="poster"  src="${IMGPATH+item.poster_path}" >
        <p class="title" >${item.name}</p>
        <p class="genre">${getGenreNames(item.genre_ids)}</p>
          `
          TVbox.appendChild(box);
          box.addEventListener('click',displayDetailsTV);
      });
  
  }
  getTV(TVURL);
  
  // Search Bar
  const search=document.querySelector(".search")
  console.log(search.value);
  const searchItem= document.querySelector(".search-button");
  const displayArea=document.querySelector(".displayArea")
  
  const searchMovies=async(url)=>{
      const response= await fetch(url);
      const data= await response.json();
      console.log(data);
      showSearch(data);
  }
  const showSearch=(data)=>{
      displayArea.innerHTML="";
      data.results.forEach(item => {
          const box=document.createElement("div");
          box.classList.add("box");
          box.dataset.overview = item.overview;
          box.dataset.title= item.title;
          box.dataset.popularity= item.popularity;
          box.dataset.adult= item.adult;
          box.dataset.posterPath= item.poster_path;
          box.dataset.movieid = item.id;
          
          box.innerHTML=`
          <a>
  
          <img class="poster"  src="${IMGPATH+item.poster_path}" >
        <p class="title" >${item.title}</p>
        <p class="genre">${getGenreNames(item.genre_ids)}</p>
        
        </a>
          `
          displayArea.appendChild(box);
          
          box.addEventListener('click',displayDetailsMovies);
      });
  
  }
  
  searchItem.addEventListener("click",
  function (event){
      if (search.value != "") {
          searchMovies(SEARCHAPI+search.value)
      } else {
          getmovies(APIURL);
      }
  
  }
  )
  
  const boxElement= document.querySelectorAll(".box");

  
  const getDetails= async(url)=>{
      const response= await fetch(url);
      const data= await response.json();
      console.log(data);
      showDetails(data);
  }
  
  const showDetails=(data)=>{
      const movieData= data;
      displayArea.innerHTML="";
      const displayDetails=document.createElement("div");
  
      displayDetails.classList.add("displayDetails");
      displayDetails.innerHTML=`
      <img class= "poster" src="${IMGPATH+movieData.poster_path}">
      
      `
      displayArea.appendChild(displayDetails);
  
  }
  
  
  boxElement.forEach(box=>{
      box.addEventListener("click",displayDetailsMovies)
  })
  
  function displayDetailsMovies (event){
      const overview= event.currentTarget.dataset.overview;
      const title= event.currentTarget.dataset.title;
      const popularity= event.currentTarget.dataset.popularity;
      const adult= event.currentTarget.dataset.adult;
      const posterPath= event.currentTarget.dataset.posterPath;
      const movieid=event.currentTarget.dataset.movieid;
  
      displayArea.innerHTML="";
      const detailBox=document.createElement("div");
      detailBox.classList.add("detailBox");
      detailBox.innerHTML=`
      <div class="container">
      <img class="posterDetail" src="${IMGPATH+posterPath}" alt="">
    

    </div>
    
    <div class="titleDetail">${title}</div>
    <div class="icons">
      <span style="font-size: 20px;margin-right: 5px;color: red;">Watchlist</span><a href="#" class="watchlistIcon" ><i class='bx bx-plus-circle' ></i></a>
   
    <div class="rateicon">
      <span style="font-size: 20px;margin-right: 5px;color: red;">Rate</span>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
    </div>
    </div>
    <div style="color: white;margin-left: 180px;margin-right: 180px;">
    <p style="margin-bottom: 10px;">
    <span style="color: red;font-size: 22px;margin-bottom: 10px;">Overview:</span>  ${overview}
    </p> 
    <p style="margin-bottom: 10px;">
    <span style="color: red;font-size: 22px;margin-bottom: 10px;"">Adult:</span> ${adult}
    </p>
    <span style="color: red;font-size: 22px;margin-bottom: 10px;"">Popularity:</span>  ${popularity}


    </div>
      `
      displayArea.appendChild(detailBox);
      
      const stars = document.querySelectorAll(".rateicon i");
      stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
            console.log("hehe");
          stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
          });
        });
      });
      console.log(posterPath);
      const watchlistIcon = detailBox.querySelector('.watchlistIcon');
    
    onAuthStateChanged(auth,(user)=> {
      if (user) {
          console.log("User is signed in:", user.uid);
  
          watchlistIcon.addEventListener('click', function(event) {
              event.preventDefault();
  
              set(ref(db,'users/' + user.uid + '/watchlist/'+movieid),{
                 Title:title, 
                 posterPath:posterPath,
              }).then(function(){
                alert("Watchlist item added");
              }).catch(function(error){
                console.log("Error");
              });
          });
      } else {
          console.log("User is signed out");
          watchlistIcon.addEventListener("click",()=>{
            alert("login to add movie to your watchlist");
        })
      }
  });
   
  }
  function displayDetailsTV (event){
      const overview= event.currentTarget.dataset.overview;
      const title= event.currentTarget.dataset.title;
      const popularity= event.currentTarget.dataset.popularity;
      const adult= event.currentTarget.dataset.adult;
      const posterPath= event.currentTarget.dataset.posterPath;
      const movieid=event.currentTarget.dataset.movieid;
  
      displayArea.innerHTML="";
      const detailBox=document.createElement("div");
      detailBox.classList.add("detailBox");
      detailBox.innerHTML=`
      <div class="container">
      <img class="posterDetail" src="${IMGPATH+posterPath}" alt="">
    

    </div>
    
    <div class="titleDetail">${title}</div>
    <div class="icons">
      <span style="font-size: 20px;margin-right: 5px;color: red;">Watchlist</span><a href="#" class="watchlistIcon" ><i class='bx bx-plus-circle' ></i></a>
   
    <div class="rateicon">
      <span style="font-size: 20px;margin-right: 5px;color: red;">Rate</span>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
      <i class='bx bxs-star' ></i>
    </div>
    </div>
    <div style="color: white;margin-left: 180px;margin-right: 180px;">
    <p style="margin-bottom: 10px;">
    <span style="color: red;font-size: 22px;margin-bottom: 10px;">Overview:</span>  ${overview}
    </p> 
    <p style="margin-bottom: 10px;">
    <span style="color: red;font-size: 22px;margin-bottom: 10px;"">Adult:</span> ${adult}
    </p>
    <span style="color: red;font-size: 22px;margin-bottom: 10px;"">Popularity:</span>  ${popularity}


    </div>
      `
    
      displayArea.appendChild(detailBox);
      const stars = document.querySelectorAll(".rateicon i");
      stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
            console.log("hehe");
          stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
          });
        });
      });
      console.log(posterPath);
      const watchlistIcon = detailBox.querySelector('.watchlistIcon');
    
      onAuthStateChanged(auth,(user)=> {
        if (user) {
            console.log("User is signed in:", user.uid);
    
            watchlistIcon.addEventListener('click', function(event) {
                event.preventDefault();
    
                
                set(ref(db,'users/' + user.uid + '/watchlist/'+movieid),{
                   Title:title, 
                   posterPath:posterPath,
                }).then(function(){
                  alert("Watchlist item added");
                }).catch(function(error){
                  console.log("Error");
                });
            });
        } else {
            console.log("User is signed out");
            watchlistIcon.addEventListener("click",()=>{
                alert("login to add movie to your watchlist");
            })
            
        }
    });
  }
const watchlistPage=document.querySelector(".watchlistPage");
watchlistPage.addEventListener("click",()=>{
    window.location.href="watchlist.html";
})
document.querySelector(".home").addEventListener("click",()=>{
    window.location.href="movie.html";
    console.log("home sweet home");
})

document.querySelector(".GenreMovies").addEventListener("click",()=>{
    window.location.href="movieGenre.html";
})
document.querySelector(".GenreTV").addEventListener("click",()=>{
    window.location.href="TVGenre.html";
})