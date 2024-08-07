const File = require("../models/FileUpload")

exports.localFileUpload = async (req, res) => {
    
     try {
        const {firstName,lastName, Department , subject , year , fileName} = req.body;
        console.log("print req user",req.user);
        const files = req.file;
        const userId = req.user.id;
       //console.log("printing file ", req.file);
        console.log("Printing user id ", userId);

        const newFile = new File({
            firstName,
            lastName,
            Department,
            year,
            subject,
            fileName,
            filePath:files.path,
           uploadedBy: userId, 
        });
        console.log("Printing new file",newFile);

        try {
            await newFile.save();
            return res.status(200).json({
                success:true,
                message: "file uploaded and data saved",
            });
        } catch (error) {
            console.log("Printing error in saving data ", error.message);
            return res.status(500).json({
                success:false,
                message:"Error in file data saving",
            });
        }
    }
    catch (error) {
        console.log("Printing error in file uploading", error.message);
        return res.status(500).json({
            success: false,
            message: "file not uploaded",
        });
    }
}

exports.fileUploadUsingDriveLink = async (req, res) => {
    
  try {
    console.log("Printing req.body", req.body);
     const {firstName,lastName, Department , subject , year , fileName, driveLink} = req.body;
    // console.log("print req user",req.user);
     const userId = req.user.id;
    //console.log("printing file ", req.file);
     //console.log("Printing user id ", userId);
     const newFile = new File({
         firstName,
         lastName,
         Department,
         year,
         subject,
         fileName,
         driveLink,
        uploadedBy: userId, 
     });
     console.log("Printing new file",newFile);

     try {
         await newFile.save();
         return res.status(200).json({
             success:true,
             message: "file uploaded and data saved",
         });
     } catch (error) {
         console.log("Printing error in saving data ", error.message);
         return res.status(500).json({
             success:false,
             message:"Error in file data saving",
         });
     }
 }
 catch (error) {
     console.log("Printing error in file uploading", error.message);
     return res.status(500).json({
         success: false,
         message: "file not uploaded",
     });
 }
}

exports.getSubjectName = async (req, res) => {
    try {
    //  console.log("print req.query",req.query)
      const { Department } = req.query;
  
      // Validate required parameters
      if (!Department) {
        return res.status(400).json({
          success: false,
          message: "Missing required parameters: year and department",
        });
      }
  
      const response = await File.find({
        Department, 
      }).distinct('subject'); 

      return res.status(200).json({
        success: true,
        message: "Subject names found",
        subjects: response, // Rename 'response' to 'subjects' for clarity
      });
    } catch (error) {
      console.error("Error in getting subject names:", error.message);
      return res.status(500).json({
        success: false,
        message: "Subject names cannot be fetched",
      });
    }
  };


exports.getFilesByDepartmentAndSubject = async (req, res) => {
  try {
      const { Department, subjectName } = req.query;
    console.log("print req.query",req.query);
      console.log("Department:", Department, "Subject Name:", subjectName);
      if (!Department || !subjectName) {
          return res.status(400).json({
              success: false,
              message: "Missing required parameters: Department or Subject Name",
          });
      }

      const files = await File.find({
          Department,
          subject: subjectName
      });

      console.log("Files found:", files);
      return res.status(200).json({
          success: true,
          message: "Files found",
          files,
      });
  } catch (error) {
      console.error("Error in getting files:", error.message);
      return res.status(500).json({
          success: false,
          message: "Files cannot be fetched",
      });
  }
};


