const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const MatchLiveDetails = require("./models/match_live_details_scores_copy");
const Matches = require("./models/matchtwo");
const getkeys = require("../apikeys");

const serviceAccount = {
    "type": "service_account",
    "project_id": "myelleven",
    "private_key_id": "c380a31b3731f5e1b95a5faa7d877cd3fd777f13",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFDuCtqBFYaQY5\nD9XsDfLbOUyTOrNDGF/y5IJzYCen2CDMsVQWu1S+yT/8UmnVOX0Sib5AQhFNLUDV\nkD7tPQ+C9eo9IEsmnNhYy5s9nFDf4P5VxZ2lhLGS2UFrB0FddwCNg6nwVYJCYKnw\n8CIZeDuecsCPPTNY2jaN+v+1Yhxkh6fAgWH23kIa28dfhjUkEZ1HRvIk+NjB1hNN\nYQRI7qGaE9JWf2LzXQwnKu5366O7hxqTm2ytb8PeswnGm72D4gsjCqBuOlJgVYC6\noXQROGXJOS1ThH0ISA8gEWJOOjXlMoNcZ287wQYG4T00uoqY1vebfPzasRZmTc6J\nUHe/4zmDAgMBAAECggEAWy+3w1QW9rDeys/rn2iS/WPl7elHY6BnYffg76/Kme42\nu1HBhiVYoVJyU/n09FC+cjIgQg7wf6SVsF2n6NMNFv5hzrhfXjZNHMXXB+sKN5cf\nSiSAf0PIghobngHE+xGixVlsbYS8Gqgta4tLVDrhZ8BVH9Njq9WKUigYZOBKIDAf\nGf69VtKHtxQe0BtikmicxraNiVKXN4Kb4lOm5qnkb5nf9RveIkeMRfCaxAN9yvUk\nVUoV2xjpS2BpLgMqWMrC373RNeWuQMt0XPfgeMud0aqqgu5yNvHzUnwEtieLqChu\nggTNu1x19xQZaLxaJPi7tl8MjgKC7nvpx88nFSjGBQKBgQD3OzgtD6ZnnPVH5sVv\n3F9BCTqpokFzjWU3Q/pK6qOI7RGQzkuxGIRnlnO3Cr4DxxgZTlYDCjx8lZkcqP/d\nLC4QTwtvfuLQujNMmUTRZIg3It9jbp/V3QiYGCBvA+bZ7VbDgQ3R1OKCdVQvLXN8\nH8vyeAPd864VfB9Q5ZFK28rrzQKBgQDMDBoHWkBHGlsXorSVeChYVvS5qTiWXOO8\nbZ9J1TXAVgIry6AX/s0XGnbpdLba5uge4BjAej11s+WOD6xgWWpuod2YM6WWtNY9\n5ucXwqoxKbibGi4luWi/+WgHNwa5m4zd5oHNcwGi2AYkuYVjqUy4/uX2GZ84xZ95\nKe249SGKjwKBgBjmzRS009Tx2T7BvrcyoiGB1XfKkP8bictUPHyZP5mGD1Pfg341\n8vggDk2sdlEZF5NM8ZriyA7gXoileQgE8CrSW1uCk0PkzU/0zBqvHo03JPr15IF8\n/uWa4IFuCi1/G1Mbx5GP+LSdLrqFwHELHtawQet0JN+jHeBfDxBULQ8tAoGBAInG\nJhEO3FXmMtmbr+k4r60uUaHG5AGLCO5i6mn0/401xdOCcz+geSR/ZwktGIZn4RVv\n5OaZ40PFS1uHs7F+zoGS48fwH3/J7NrxPNprQ3VcoVyA6eXo8hSlt5sfiXfr0srF\n6KErZVBqIoPLjIiFeNt0qRtpo3u23H34VJ5NTe97AoGBANpXveAoXJ8gLGFx7Evc\n3oxgf22HYIEJwgioux4dQqxEOe+13XX3ktUNb0ioICmNqQeUbakDIq4Kba7WMUIl\nj6Lm0+N/uMaEcHMEvUWth6a0zT9mPWucdOizSmq44/6lvADTuVYSgDvXwIKXbflH\n2dr87qZS1LV5NJHR2YqbquLi\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-3i5r3@myelleven.iam.gserviceaccount.com",
    "client_id": "103891215143284895189",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3i5r3%40myelleven.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
// Add a new document with a generated id.
module.exports.addLivecommentary = async function addcommentry() {
  try {
    console.log("mefigure");
    let date = new Date();
    const matchess = [];
    const endDate = new Date(date.getTime() + 10 * 60 * 60 * 1000);
    date = new Date(date.getTime() - 10 * 60 * 60 * 1000);
    const matches = await Matches.find({
      date: {
        $gte: new Date(date),
        $lt: new Date(endDate),
      },
    });
    console.log(matches, "matches");
    for (let i = 0; i < matches.length; i++) {
      const matchid = matches[i].matchId;
      const match = await MatchLiveDetails.findOne({ matchId: matchid });

      console.log(match?.result, "match");
      if (match && !(match?.result == "Yes")) {
        console.log(matches[i].matchId, "matchid");
        matchess.push(matches[i]);
      }
    }
    for (let i = 0; i < matchess.length; i++) {
      if (matchess[i].cmtMatchId.length > 3) {
        console.log(matchess[i].cmtMatchId, "id");
        const keys = await getkeys.getkeys();
        const options = {
          method: "GET",
          url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchess[i].matchId}/comm`,
          headers: {
            "X-RapidAPI-Key": keys,
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        };
        try {
          const washingtonRef = doc(db, "cities", matchess[i].matchId);
          const response = await axios.request(options);
          const docRef = doc(db, "cities", matchess[i].matchId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
          console.log(response.data.commentaryList);
          const a = response.data.commentaryList[0];
          if (docSnap?.data()?.capital) {
            await setDoc(washingtonRef, {
              capital: [...docSnap.data().capital, a],
            });
          } else {
            await setDoc(washingtonRef, {
              capital: [a],
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
  const res = await db.collection("cities").add({
    name: "bangalore",
    country: "karnataka",
  });
  console.log("Added document with ID: ", res.id);
  return res;
};
