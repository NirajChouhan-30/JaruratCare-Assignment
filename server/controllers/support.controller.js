import SupportRequest from "../models/supportRequest.model.js";
import { analyzeSupportRequest } from "../services/gemini.service.js";
import Volunteer from "../models/volunteer.model.js";


export const createSupportRequest = async (
  req,
  res
) => {
  try {
    const {
      description,
      ...rest
    } = req.body;

    const aiAnalysis =
      await analyzeSupportRequest(description);

    const supportRequest =
      await SupportRequest.create({
        ...rest,
        description,

        aiSummary:
          aiAnalysis.summary,

        priority:
          aiAnalysis.priority,

        category:
          aiAnalysis.category,

        recommendedAction:
          aiAnalysis.recommendedAction,
      });

    res.status(201).json({
      success: true,
      data: supportRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupportRequests = async (req, res) => {
  try {
    const requests =
  await SupportRequest.find()
    .populate(
      "assignedVolunteer",
      "name city phone"
    )
    .sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupportRequestById = async (req, res) => {
  try {
    const request = await SupportRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignVolunteer = async (
  req,
  res
) => {
  try {
    const { volunteerId } = req.body;

    const request =
      await SupportRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const volunteer =
      await Volunteer.findById(
        volunteerId
      );

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found",
      });
    }

    request.assignedVolunteer =
      volunteerId;

    request.status = "Assigned";

    await request.save();

    res.json({
      message:
        "Volunteer assigned successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};