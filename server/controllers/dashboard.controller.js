import SupportRequest from "../models/supportRequest.model.js";
import Volunteer from "../models/volunteer.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalRequests = await SupportRequest.countDocuments();

    const totalVolunteers = await Volunteer.countDocuments();

    const highPriorityCases =
      await SupportRequest.countDocuments({
        priority: "High",
      });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRequests =
      await SupportRequest.countDocuments({
        createdAt: {
          $gte: today,
        },
      });

    res.status(200).json({
      success: true,
      data: {
        totalRequests,
        totalVolunteers,
        highPriorityCases,
        todayRequests,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};