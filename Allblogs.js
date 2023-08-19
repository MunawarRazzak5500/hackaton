import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, deleteDoc, getDoc, getDocs, collection, onSnapshot, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRPEu5onC7xpOuC54yf3C9j-qSPF7jw_s",
    authDomain: "auth-79c09.firebaseapp.com",
    projectId: "auth-79c09",
    storageBucket: "auth-79c09.appspot.com",
    messagingSenderId: "685017904760",
    appId: "1:685017904760:web:73e0cd010ee117f183df8d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // document.getElementById("signout").style.display = "block"
        const onSnapshot = await getDocs(collection(db, "Users"));
        onSnapshot.forEach((doc) => {
            console.log(`Users Collection --> ${doc.id} => ${JSON.stringify(doc.data())}`);
            // document.getElementById("username").innerHTML = doc.data().fName;
        });
        const querySnapshot = await getDocs(collection(db, "Blogs"));
        const userEmail = user.email;
        const username = userEmail.split("@")[0]; // Extract the username part
        // console.log(username,"aaaaaa");
        let show = document.getElementById('show');
        show.innerHTML = ''
        querySnapshot.forEach(async (doc) => {
            const timestamp = doc.data().Timestamp.toDate();
            const formattedTimestamp = timestamp.toLocaleDateString();

            show.innerHTML += `
        <div id="card">
    <div id="any">
    <img src="./pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" alt="Blog">
    <div>
    <h3>${doc.data().Title}</h3>
    <p id="nameShow">${username}</span>- Posted on: <span>${formattedTimestamp}</span></p>
    </div>
    </div>
    <div id="showDesc">
    ${doc.data().Description}
    </div>
    <div>
    <a href="./Allblogs.html"><button id="del">See All Blog From This User</button></a>
    </div>
    </div>
                `
            // console.log(`Users Collection --> ${doc.id} => ${JSON.stringify(doc.data())}`);

            console.log(`Blogs Collection --> ${doc.id} => ${JSON.stringify(doc.data())}`);

        })


    } else {
        Swal.fire({
            title: `Account`,
            text: `First Create An Account`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        function wrong() {
            location.replace("../index.html")
        }
        setInterval(wrong, 2000);
    }
})