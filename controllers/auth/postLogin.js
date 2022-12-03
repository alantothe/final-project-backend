const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
        //user input
    const { email, password } = req.body;
        //search mongo for user
    const user = await User.findOne({ email: email.toLowerCase() });
        // bcrypt matches passwords
    if (user && (await bcrypt.compare(password, user.password))) {
        // send new token
        const token = jwt.sign(
          {
              userID: user._id,
              email
          },
          process.env.TOKEN_KEY,
          {
              expiresIn: '1h'
          }

      )
      return res.status(200).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
        },

      });
    }
        return res.status(400).send("Invalid login.Please try again");


}

catch (err) {
    return res.status(500).send("Error, Please try again");
  }
};

module.exports = postLogin;