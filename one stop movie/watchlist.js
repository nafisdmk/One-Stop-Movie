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
  const IMGPATH="https://image.tmdb.org/t/p/w500/";
  const APIURL="https://api.themoviedb.org/3/movie/popular?api_key=27d9ff0fdc00e423b6f4e09e70ab787e";
  const moiveBox=document.querySelector(".movieBox");

onAuthStateChanged(auth,(user)=>{
  if(user){
    const watchlistRef=ref(db,'users/' + user.uid + '/watchlist/');
    get(watchlistRef).then(function(snapshot) {
      var watchlist = snapshot.val();
      if (watchlist) {
        
        for (var movieId in watchlist) {
          var movieDetails = watchlist[movieId];
          const box=document.createElement("div");
        box.classList.add("box");
        box.innerHTML=`
          
        <img class="poster"  src="${IMGPATH+movieDetails.posterPath}" >
      <p class="title" >${movieDetails.Title}</p>
      
      `
        moiveBox.appendChild(box);
        }
      } else {
        
        document.getElementById('watchlist').innerHTML = '<p>No movies in your watchlist.</p>';
      }
    });
  }
  else {
    
    console.log("User is signed out");
}
})
document.querySelector(".home").addEventListener("click",()=>{
  window.location.href="movie.html";
  console.log("home sweet home");
})