import axios from "axios";

const pushCommentToDB = async (userid, schoolid, body) => {
  const res = await axios.post("/schools/comments", {
    schoolid: schoolid,
    userid: userid,
    body: body,
  });

  return res.data;
};

export default pushCommentToDB;
