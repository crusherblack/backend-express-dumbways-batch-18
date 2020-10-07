const { user, profiles, Job } = require("../../../models");

/* exports.readUser = async (req, res) => {
  try {
    const usersData = await user.findAll({
      include: {
        as: "profiles",
        model: profiles,
      },
    });

    res.send({
      message: "User successfully loaded",
      data: {
        users: usersData,
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

exports.readProfile = async (req, res) => {
  try {
    const profileData = await profiles.findAll({
      include: user,
    });

    res.send({
      message: "Profiles successfully loaded",
      data: {
        profile: profileData,
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
}; */

exports.getUserJobs = async (req, res) => {
  try {
    const userJobsData = await user.findAll({
      include: {
        model: Job,
        as: "jobs",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["profileId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Success!!!",
      data: {
        user: userJobsData,
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
