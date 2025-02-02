import alumniModel from "../models/alumniModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from "path";
import {uploadToCloudinary,deleteFromCloudinary} from "../utils/cloudinary.js"

export const signupController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      year,
      batch,
      phone,
      position,
      currentLocation,
      company,
      bio,
      instagram,
      linkedin,
      profileImage
    } = req.body;

    if (!name || !email || !password || !year || !batch || !phone || !position || !currentLocation || !company) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
   }
   


    let profileImageUrl = '';
    if (req.file) {
      profileImageUrl = await uploadToCloudinary(req.file.path);
      fs.unlinkSync(req.file.path); // Remove local file after upload
    }

    const emailExists = await alumniModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email ID already registered.",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAlumni = new alumniModel({
      name,
      email,
      password: hashedPassword,
      year,
      batch,
      phone,
      position,
      currentLocation,
      company,
      bio,
      linkedin,
      instagram,
      profileImage,
    });

    await newAlumni.save();

    res.status(201).json({
      message: "Alumni registered successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const alumni = await alumniModel.findOne({ email });
    if (!alumni) {
      return res.status(400).json({
        message: "Invalid Email or Password.",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password.",
        success: false,
      });
    }

    
    const token = jwt.sign({ id: alumni._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login Successful!",
      success: true,
      token,
      alumni: {
        id: alumni._id,
        name: alumni.name,
        email: alumni.email,
        year: alumni.year,
        batch: alumni.batch,
        phone: alumni.phone,
        position: alumni.position,
        currentLocation: alumni.currentLocation,
        company: alumni.company,
        bio: alumni.bio,
        linkedin: alumni.linkedin,
        instagram: alumni.instagram,
        profileImage: alumni.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

export const getAlumniProfile = async (req, res) => {
  try {
    console.log("Request Alumni:", req.alumni); // Debugging

    if (!req.alumni || !req.alumni.id) {
      return res.status(400).json({ message: "User ID missing", success: false });
    }

    const alumni = await alumniModel
      .findById(req.alumni.id)
      .select("-password");

    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found", success: false });
    }

    res.status(200).json({
      success: true,
      alumni,
      token: req.token, // Sending token in response
    });

    console.log("Fetched Alumni:", alumni); // Debugging
  } catch (error) {
    console.error("Error fetching alumni profile:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      success: false,
    });
  }
};
export const getAllAlumnis = async (req, res) => {
  try {
    const alumniList = await alumniModel.find().select("-password"); // Excluding passwords for security

    if (!alumniList || alumniList.length === 0) {
      return res.status(404).json({
        message: "No alumni found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      alumni: alumniList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};




export const editAlumniProfile = async (req, res) => {
  try {
    console.log("Request received to update profile:", req.body);

    // Find the alumni profile by ID
    const alumni = await alumniModel.findById(req.alumni.id).select("-password");
    if (!alumni) {
      return res.status(404).json({ msg: "Alumni profile not found" });
    }

    const { name, email, bio, position, currentLocation } = req.body;
    let profileImage = alumni.profileImage; // Keep existing image

    console.log("Existing profile image:", profileImage);
    console.log("Uploaded file:", req.file);

    // Handle profile image update
    if (req.file) {
      try {
        const filePath = req.file.path;
        
        // Check if the uploaded file exists before deleting
        if (fs.existsSync(filePath)) {
          console.log("File exists:", filePath);
          
          // Delete old image from Cloudinary (if exists)
          if (alumni.profileImage) {
            const publicId = alumni.profileImage.split("/").pop().split(".")[0];
            await deleteFromCloudinary(publicId);
          }

          // Upload new image
          const uploadedImage = await uploadToCloudinary(filePath);
          profileImage = uploadedImage.secure_url || uploadedImage.url; // Ensure correct URL is used
          
          // Delete local file after successful upload
          fs.unlinkSync(filePath);
        } else {
          console.log("File does not exist:", filePath);
        }
      } catch (err) {
        console.error("Error handling image upload:", err);
        return res.status(500).json({ msg: "Image upload failed" });
      }
    }

    // Update alumni fields
    alumni.name = name || alumni.name;
    alumni.email = email || alumni.email;
    alumni.bio = bio || alumni.bio;
    alumni.position = position || alumni.position;
    alumni.currentLocation = currentLocation || alumni.currentLocation;
    alumni.profileImage = profileImage;

    // Save the updated profile
    await alumni.save();
    res.status(200).json({ msg: "Profile updated successfully", alumni });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};





export const connectAlumni = async (req, res) => {
  try {
    const { alumniId } = req.body; // The ID of the alumni to connect with
    const loggedInAlumni = await alumniModel.findById(req.alumni.id);

    if (!loggedInAlumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    if (loggedInAlumni.connections.includes(alumniId)) {
      return res.status(400).json({ message: "Already connected" });
    }

    
    loggedInAlumni.connections.push(alumniId);
    await loggedInAlumni.save();

    const otherAlumni = await alumniModel.findById(alumniId);
    if (!otherAlumni) {
      return res.status(404).json({ message: "Alumni to connect not found" });
    }
    otherAlumni.connections.push(req.alumni.id);
    await otherAlumni.save();

    res.status(200).json({ message: "Connected successfully", connections: loggedInAlumni.connections });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const disconnectAlumni = async (req, res) => {
  try {
    const { alumniId } = req.body; 
    console.log(alumniId);

    const loggedInAlumni = await alumniModel.findById(req.alumni.id);
    if (!loggedInAlumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    if (!loggedInAlumni.connections.includes(alumniId)) {
      return res.status(400).json({ message: "Not connected with this alumni" });
    }

    await alumniModel.updateOne(
      { _id: req.alumni.id },
      { $pull: { connections: alumniId } }
    );

    // Use $pull to remove loggedInAlumni from the otherAlumni's connections
    await alumniModel.updateOne(
      { _id: alumniId },
      { $pull: { connections: req.alumni.id } }
    );

    res.status(200).json({ message: "Disconnected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};







export const getConnectedAlumni = async (req, res) => {
  try {
    
    const loggedInAlumni = await alumniModel
      .findById(req.alumni.id)
      .populate("connections", "_id name email profileImage year batch");

    if (!loggedInAlumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    
    res.status(200).json({ connections: loggedInAlumni.connections });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// In your alumni controller
export const getAlumniById = async (req, res) => {
  try {
    const userId = req.params.userId; 
    console.log("Received request for userId:", userId); // Debug log

    const alumni = await alumniModel.findById(userId);
    console.log("Found alumni:", alumni); // Debug log

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    res.status(200).json({
      success: true,
      alumni
    });
  } catch (error) {
    console.error("Controller error:", error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


