const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config;
const myRouter = require("./routes/routes.js");

IG_USERNAME = "silverfangs_"
IG_PASSWORD = "Ibrahim123"

const { IgApiClient } = require("instagram-private-api");
const ig = new IgApiClient();

ig.state.generateDevice(IG_USERNAME);



(async () => {
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(
    IG_USERNAME,
    IG_PASSWORD
  );
  console.log("Logged in User: ", loggedInUser);
  process.nextTick(async () => await ig.simulate.preLoginFlow());

  const userFeed = ig.feed.user(loggedInUser.pk);
  const myPostsFirstPage = await userFeed.items();

})();

const app = express();
app.use(express.json());

  //   await ig.media.like({
  //     mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
  //     moduleInfo: {
  //       module_name: "profile",
  //       user_id: loggedInUser.pk,
  //       username: loggedInUser.username,
  //     },
  //     d: sample([0, 1]),
  //   });

app.use("/", myRouter);

PORT = process.env.PORT || 4000;
URI = "mongodb+srv://ibrahimdoba55:ibrahim123@authdb.kuauwfm.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose
  .connect(
    URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connect"));

app.listen(PORT, () => console.log(`Server Running in ${PORT}`));
