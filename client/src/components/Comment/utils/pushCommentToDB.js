import axios from "axios";

const pushCommentToDB = async (userid, schoolid, body) => {
  console.log(schoolid);
  console.log(userid);
  console.log(body);

  const res = await axios.post("/schools/comments", {
    schoolid: schoolid,
    userid: userid,
    body: body,
  });

  if (res !== 200) {
    console.log("not working");
  }

  return res.data;
};

export default pushCommentToDB;
