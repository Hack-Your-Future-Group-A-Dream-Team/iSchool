import axios from "axios";

const saveCommentToDb = async (schoolid, userid, body) => {
  const res = await axios.post("/schools/comments", {
    schoolid: schoolid,
    userid: userid,
    body: body,
  });

  return res.data;
};

export default saveCommentToDb;
