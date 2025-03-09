import User from "../Models/userModel.js";

export const getUser = async (_, res) => {
  try {
    const getAllUser = await User.find();
    if (!getAllUser) {
      return res
        .status(401)
        .json({ success: false, message: "Something went wrong" });
    }
    if (getAllUser.length === 0) {
      return res.json({ message: "No user in database" });
    }
    return res.status(200).json({
      success: true,
      data: getAllUser,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return (
      res.status(500),
      json({ success: false, message: "Internal server error" })
    );
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await User.findById(userId);

    if (checkAdmin.role === "admin") {
      return res
        .status(404)
        .json({ success: false, message: "You cannot delete yourself" });
    }
    const deleteUser = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return (
      res.status(500),
      json({ success: false, message: "Internal server error" })
    );
  }
};
