import { verifyAccessToken } from "../utils/index.js";

const userAuth = async (req, res, next) => {
 
  try {
    // get the accesstoken from cookies
    const { accessToken } = req.cookies;

    // if token is missing, throw erroe
    if(!accessToken){
      throw new Error();
    }

    // get the user data 
    const userData = await verifyAccessToken(accessToken);


    // if user is not matched, throw error
    if(!userData){
      throw new Error();
    }
    
    req.user = userData;
    next();

  } catch (error) {
    res.status(401).json({error : "Authorization failed!!"})
  }
};

export default userAuth;
