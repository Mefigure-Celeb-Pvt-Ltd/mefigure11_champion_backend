const request = require("request");
const News = require("../models/news");
const Contest = require("../models/contest");
const User = require("../models/user");
const getkeys = require("../crickeys");

// function prizeBreakupRules(prize, numWinners){
//     let prizeMoneyBreakup = [];
//     for(let i = 0; i < numWinners; i++){

//     }
// }
// var month = "09";
// var day = 25;
module.exports.addNews = async function () {
  console.log('started')
  //const keys = await getkeys.getkeys();
  //let user = await User.findById(process.env.refUserId);
  //user.totalhits = user.totalhits + 1;
  //await user.save();
  const options = {
    method: "GET",
    url: "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",
    headers: {
      "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      "x-rapidapi-key": "bb336e1ebcmshb322f2a540afb74p1ad7bdjsn05f13a8d4593",
      useQueryString: true,
    },
  };
  // Doubt in this part, is request is synchronous or non synchronous?
  let newsIds = [129137, 129136, 129135];
  const promise = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      console.log(body)
      const s = JSON.parse(body);
      resolve(s);
    });
  });
  promise
    .then(async (s) => {
      for (se of s.storyList) {
        console.log(se.story, 'story')
        if (se?.story?.id) {
          newsIds.push(se?.story?.id)
        }
      }
      console.log(newsIds, 'allnewsids')
      for (let i = 0; i < newsIds.length; i++) {
        const news = await News.findOne({ newsId: newsIds[i] });
        if (news) {
          console.log('news found')
        } else {
          let user = await User.findById(process.env.refUserId);
          user.totalhits = user.totalhits + 1;
          await user.save();
          const keys = await getkeys.getkeys();
          const date1 = "2679243";
          console.log("image", newsIds[i]);
          const optionse = {
            method: "GET",
            url: `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${newsIds[i]}`,
            headers: {
              "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
              "X-RapidAPI-Key": "bb336e1ebcmshb322f2a540afb74p1ad7bdjsn05f13a8d4593",
              useQueryString: true,
            },
          };
          const premise = new Promise((resolve, reject) => {
            request(optionse, (error, response, body) => {
              if (error) {
                reject(error);
              }
              const s = JSON.parse(body);
              resolve(s);
            });
          });

          premise.then(async (s) => {
            console.log(s, "saaa");
            try {
              if (s.id) {
                const newsItem = new News();
                newsItem.newsId = s.id;
                newsItem.title = s.headline;
                let data = "";
                if (s?.content) {
                  for (const x of s.content) {
                    console.log(s.content, 'content')
                    if (x?.content?.contentValue) {
                      data = data + x.content.contentValue;
                    }
                  }
                }
                newsItem.details = data;
                newsItem.image = s.coverImage.id;
                newsItem.date = s.lastUpdatedTime;
                await News.create(newsItem);
              }
            }
            catch (err) {
              console.log(`Error : ${err}`);
            }
          })
            .catch((error) => console.log(error));
        }
      }
    })
}

