const Users = require("../models/userModel");
const Orders = require("../models/orderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const fetch = require("node-fetch");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

const userCtrl = {
  signup: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = await Users.findOne({ username });
      //do something

      //save
    } catch (err) {
      return res.json({ err });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      await Users.findByIdAndDelete({ _id: req.params.id });
      res.json("Delete account user successfully!");
    } catch (err) {
      return res.json({ err });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, address, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "The email is already exist" }); //Check exist
      }
      //Check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });
      //Encode password
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        address,
        password: passwordHash,
      });
      /* ---------This code for register basic------------
      //Save on cloud MongoDB
      await newUser.save();

      //Using jwt to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
*/
      const activationtoken = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activationtoken}`;
      sendMail(
        email,
        url,
        `<h4>Hi ${name},</h4>
      <p>????y l?? email x??c nh???n k??ch ho???t t??i kho???n c???a b???n. Vui l??ng click v??o n??t m??u xanh b??n d?????i ????? tr??? th??nh th??nh vi??n c???a ch??ng t??i!<p>
      <span>Tr??n tr???ng,<br/>
      CHUANG BOOKSTORE</span>`
      );

      res.json({
        msg: "Wellcome u with us, please check your email to activate account",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activation: async (req, res) => {
    try {
      const { activationtoken } = req.body;
      const user = jwt.verify(
        activationtoken,
        process.env.ACTIVATE_TOKEN_SECRET
      );

      const { name, email, address, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email is already exist!" });

      const newUser = new Users({
        name,
        email,
        password,
        address,
      });
      await newUser.save();

      //After activate create accesstoken to authenticate
      //Using jwt to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ msg: "Account has been activated!", accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Sign in failed. Please try again!" });

      // If login success, create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logout success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      console.log(req.cookies.refreshtoken);
      if (!rf_token)
        return res.status(600).json({ msg: "Please login or register1" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please login or register" });
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist!" });

      const accesstoken = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${accesstoken}`;
      sendMail(
        email,
        url,
        `<h4>Hi ${user.name},</h4>
      <p>????y l?? email x??c nh???n t???o m???t kh???u m???i cho t??i kho???n. Vui l??ng click v??o n??t m??u xanh b??n d?????i ????? cho ch??ng t??i bi???t ???? l?? b???n.<p>
      <p>N???u b???n kh??ng c?? nhu c???u n??y h??y c???nh gi??c v???i t??i kho???n c???a m??nh v?? c?? ai ???? ??ang c??? x??m nh???p t??i kho???n n??y.<p>
      <span>Tr??n tr???ng,<br/>
      CHUANG BOOKSTORE</span>`
      );

      res.json({
        msg: "Re-send the password, please check your email to change",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "Password has change successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, newPassword } = req.body;
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ msg: "New password must be least 6 character" });
      const user = await Users.findOne({ _id: req.user.id });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Password is wrong. Unable change pass" });

      const passwordHash = await bcrypt.hash(newPassword, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "Password has change successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const features = new UsersFeatures(Users.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      // const countTotal
      const countCalc = new UsersFeatures(Users.find(), req.query)
        .filtering()
        .sorting();
      const countTotal = await countCalc.query.count();
      const users = await features.query; //Users.find();

      res.json({
        totalResult: countTotal,
        result: users.length,
        users,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, email, address, phone, role, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "The email is already exist" }); //Check exist
      }
      //Check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });
      //Encode password
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        address,
        password: passwordHash,
        phone,
        role,
      });
      // ---------This code for register basic------------
      //Save on cloud MongoDB
      await newUser.save();

      res.json({ msg: "Account has been created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      // if (password) {
      //   if (password.length < 6)
      //     return res
      //       .status(400)
      //       .json({ msg: "Password is at least 6 characters" });
      //   var passwordHash = await bcrypt.hash(password, 12);
      //   return passwordHash;
      // }
      // console.log(passwordHash);

      // if (!password)
      //   return res.status(400).json({ msg: "Please confirm password!" });
      // if (password.length < 6)
      //   return res
      //     .status(400)
      //     .json({ msg: "Password is at least 6 characters" });
      // const passwordHash = await bcrypt.hash(password, 12);
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          address,
          phone,
        }
      );
      res.json({ msg: "Update infomation successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAllUsers: async (req, res) => {
    try {
      const { name, address, phone, role } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          address,
          phone,
          role,
        }
      );
      res.json({ msg: "Update infomation user successfully}!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUsers: async (req, res) => {
    try {
      await Users.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Delete account user successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addtoCart: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Add to cart successfully" });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  orderInfo: async (req, res) => {
    try {
      const orderInfo = await Orders.find({ user_id: req.user.id });
      res.json(orderInfo);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const { status } = req.body;
      const orderInfo = await Orders.findOne({ _id: req.params.id });
      if (orderInfo.status !== 0)
        return res
          .status(400)
          .json({ msg: "The order has been approved by the administrator." });

      await Orders.findOneAndUpdate({ _id: req.params.id }, { status: status });
      res.json({ msg: `Cancelled order ${orderInfo.orderID} success` });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },

  //new
  loginGoogle: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const { email_verified, email } = verify.payload;

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification fail!!" });

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Account does not exist" });
      const password = email + process.env.GOOGLE_SECRET;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is inccorect!" });
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  registerGoogle: async (req, res) => {
    const { tokenId } = req.body;
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.MAILING_SERVICE_CLIENT_ID,
    });

    const { email_verified, email, name } = verify.payload;
    if (!email_verified)
      return res.status(400).json({ msg: "Email verification fail!!" });
    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "Account has been exist" });
    const password = email + process.env.GOOGLE_SECRET;
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new Users({
      email,
      name,
      password: passwordHash,
    });
    await newUser.save();
    res.json({ msg: "Register success. Login to join with us" });
  },
  loginFacebook: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;
      console.log(accessToken, userID);
      const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email } = data;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Account does not exist" });
      const password = email + process.env.FACEBOOK_SECRET;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is inccorect!" });
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  registerFacebook: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;
      console.log(accessToken, userID);
      const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email, name } = data;
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "Account has been exist" });
      const password = email + process.env.FACEBOOK_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({
        email,
        name,
        password: passwordHash,
      });
      await newUser.save();
      res.json({ msg: "Register success. Login to join with us" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createActivationToken = (user) => {
  return jwt.sign(user.toJSON(), process.env.ACTIVATE_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "300s" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

// Filter, sort and paginate
class UsersFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.body
    console.log({ before: queryObj });

    const excludedFields = ["count", "page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log({ after: queryObj });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(eq|gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    console.log({ queryObj, queryStr });

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    //const countTotal = this.query.count({"users"});
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = userCtrl;
