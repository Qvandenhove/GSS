import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyATsZzt4YfXvihHNKzDoND9l5oHb4UVnqI",
    authDomain: "sites-statiques.firebaseapp.com",
    databaseURL: "https://sites-statiques.firebaseio.com",
    projectId: "sites-statiques",
    storageBucket: "sites-statiques.appspot.com",
    messagingSenderId: "463079656523",
    appId: "1:463079656523:web:5db620209315459a37d1ce",
    measurementId: "G-FGEM8SXFDJ"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore()

const helpers = {
    async getSites(){
        let sitesList = await db.collection("Sites").get()
        let sites = []
        sitesList.forEach((site) => {
            let siteData = site.data()
            sites.push({id: site.id, title: siteData.title, description: siteData.description})
        })
        return sites
    }
}

export default helpers
