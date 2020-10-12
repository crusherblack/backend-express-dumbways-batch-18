const { User } = require("../../../models");

//hasing or salting cridential data like password
const bycript = require("bcrypt");
//make token for auth
const jwt = require("jsonwebtoken");

//inport validator
const joi = require("@hapi/joi");

//key for decrypt jwt token
const jwtKey = process.env.JWT_KEY;

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    //>>>>>>>>>>>>>>>>>>>>>>>VALIDATION START<<<<<<<<<<<<<<<<<<<<<<<
    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error existed then throw validation error messages
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //>>>>>>>>>>>>>>>>>>>>>>>VALIDATION END<<<<<<<<<<<<<<<<<<<<<<<

    //check if email already been existed
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    //send response if email already been taken
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already been existed",
        },
      });
    }

    //salt strength
    const saltRounds = 10;
    //salting password
    const hashedPassword = await bycript.hash(password, saltRounds);

    //create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    //create new jwt token after register success
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //send request with user data & jwt token
    res.send({
      message: "You has been registered",
      data: {
        email: user.email,
        fullName,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    //get email dan password from body
    const { email, password } = req.body;

    //>>>>>>>>>>>>>>>>>>>>>>>VALIDATION START<<<<<<<<<<<<<<<<<<<<<<<

    //validate email and password with certain recruitment
    const schema = joi.object({
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error existed then throw validation error messages
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //>>>>>>>>>>>>>>>>>>>>>>>VALIDATION END<<<<<<<<<<<<<<<<<<<<<<<

    //check user in database
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //if user not existed then throw error
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or password invalid || Email not existed",
        },
      });
    }
    //if user existed
    //check password / compare password from req.body and password from database
    const validPassword = await bycript.compare(password, user.password);
    //if password not valid then throw error
    if (!validPassword) {
      return res.status(400).send({
        error: {
          message: "Email or password invalid || password invalid",
        },
      });
    }

    //if email & password existed and valid then create new token
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //send new response
    res.send({
      message: "Login Success",
      data: {
        email: user.email,
        fullName: user.fullName,
        token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
