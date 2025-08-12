/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { Teacher } from "./techer.model";
import User from "../user/user.model";
import { TecherService } from "./techer.service";
import sendResponse from "../../utils/sendResponse";

const createTeacher = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, subjects, assignedClasses, contactPhone, address, joinDate } = req.body;

    // Check this user
    const existingTeacher = await Teacher.findOne({ userId }).session(session);
    if (existingTeacher) {
      throw new Error("Teacher userId already exists");
    }

    // Find User and update role Techer ...
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    await User.findByIdAndUpdate(
            userId,
            { role: 'TEACHER' },
            { session, new: true }
        );

    // Auto generate employeeId
    const lastTeacher = await Teacher.findOne().sort({ createdAt: -1 }).session(session);
    const newIdNumber = lastTeacher
      ? parseInt(lastTeacher.employeeId.split("-")[1]) + 1
      : 1;
    const employeeId = `EMP-${String(newIdNumber).padStart(3, "0")}`;

    // teacher data
    const teacherData = {
      userId,
      employeeId,
      subjects,
      assignedClasses,
      contactPhone,
      address,
      joinDate
    };


    const result = await TecherService.techerCrateInDb(teacherData);
    // console.log(result,"main data")

    await session.commitTransaction();
    session.endSession();

    sendResponse(res, {
      status: true,
      statusCode: httpStatus.CREATED,
      message: "Teacher profile created & role updated successfully",
      data: result
    });

  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
});

// get all techer
const getAllTecher = catchAsync(async(req , res)=>{
  const  result = await TecherService.techerGetAllInDb()

   sendResponse(res, {
      status: true,
      statusCode: httpStatus.CREATED,
      message: "Teacher All Retrieve successfully",
      data: result
    });
})


const deleteTeacher = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await TecherService.teacherDeleteInDb(id)

    sendResponse(res, {
        status: true,
        statusCode: httpStatus.CREATED,
        message: 'Teacher Delete successfully',
        data: result,
    });
})

const updateTeacher = catchAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const updateData = req.body;

    const result = await TecherService.updateTeacherInDb(id, updateData);

    sendResponse(res, {
        status: true,
        statusCode: httpStatus.OK,
        message: 'Teacher updated successfully',
        data: result,
    });
});


const getMyStudents = catchAsync(async (req, res) => {
  const teacherId = req.params.id; 
  const students = await TecherService.getAssignedStudents(teacherId);

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: "Assigned students fetched successfully",
    data: students,
  });
});




export const teacherController = {
  createTeacher,
  getAllTecher,
  deleteTeacher,
  updateTeacher,
  getMyStudents
};
