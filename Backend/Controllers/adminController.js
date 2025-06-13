import User from "../Models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res
        .status(401)
        .json({ success: false, message: "Isers not found" });
    }

    if (users.length !== 0) {
      return res.json({ message: "No user in database" });
    }

    return res.status(200).json({
      success: true,
      data: users,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (req.user.id === userId) {
      return res
        .status(404)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    const deleteUsers = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
