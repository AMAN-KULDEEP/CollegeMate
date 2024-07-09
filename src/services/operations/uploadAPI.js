import { fileUploadEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const { LOCAL_FILE_UPLOAD } = fileUploadEndpoints;

function logFormData(formData) {
    for (let pair of formData.entries()) {
        console.log(`hello ${pair[0]}: ${pair[1]}`);
    }
}

export function localfileUpload(formData, token) {
    return async (dispatch) => {
        try {
            console.log("printing formData" , formData);
            const uploadFormData = new FormData();

            // Append each key-value pair from formData to the FormData instance
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    uploadFormData.append(key, formData[key]);
                }
            }

            // Log the FormData contents
            logFormData(uploadFormData);

            const response = await apiConnector("POST", LOCAL_FILE_UPLOAD, uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log("local file upload api response:", response);

            toast.success("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("File upload failed");
        }
    }
}
