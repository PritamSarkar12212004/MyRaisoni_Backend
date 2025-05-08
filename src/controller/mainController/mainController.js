import User from "../../models/userModel.js";

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options).then((res) => {
      console.log(`Response received from ${url}`);
      return res;
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const mainController = async (req, res) => {
  const { id, token } = req.body.data;
  const user = await User.findOne({ userId: id });
  if (!user) {
    const data = await User.create({ userId: id });
    await data.save();
  }
  const fetchUserDetails = async () => {
    const url1 = "https://ghrua.cybervidya.net/api/info/student/fetch";
    const url2 =
      "https://ghrua.cybervidya.net/api/student/dashboard/performance";
    const url3 =
      "https://ghrua.cybervidya.net/api/admission/student/assets/get";
    const url4 =
      "https://ghrua.cybervidya.net/api/student/dashboard/attendance";

    const headers = {
      accept: "application/json, text/plain, */*",
      authorization: `GlobalEducation ${token}`,
      uid: id.toString(),
    };
    const header2 = {
      accept: "application/json, text/plain, */*",
      authorization: `GlobalEducation ${token}`,
    };

    try {
      let response1, response2, response3, response4;
      try {
        console.log("Fetching URL 1...");
        response1 = await fetchWithTimeout(url1, { method: "GET", headers });
        console.log("API 1 success");
      } catch (err) {
        console.error("API 1 failed:", err.message);
      }

      try {
        console.log("Fetching URL 2...");
        response2 = await fetchWithTimeout(url2, { method: "GET", headers });
        console.log("API 2 success");
      } catch (err) {
        console.error("API 2 failed:", err.message);
      }

      try {
        console.log("Fetching URL 3...");
        response3 = await fetchWithTimeout(url3, {
          method: "GET",
          headers: header2,
        });
        console.log("API 3 success");
      } catch (err) {
        console.error("API 3 failed:", err.message);
      }

      try {
        console.log("Fetching URL 4...");
        response4 = await fetchWithTimeout(url4, {
          method: "GET",
          headers: header2,
        });
        console.log("API 4 success");
      } catch (err) {
        console.error("API 4 failed:", err.message);
      }

      // Check if any response is missing or not ok, then send null
      if (
        !response1?.ok ||
        !response2?.ok ||
        !response3?.ok ||
        !response4?.ok
      ) {
        return res.status(500).json({
          data: null,
          status: 500,
          message: "Failed to fetch data",
        });
      }

      const data1 = await response1.json();
      const data2 = await response2.json();
      const data4 = await response4.json();
      console.log(data4);

      let base64Image = null;
      let image = null;

      if (response3?.ok) {
        try {
          const arrayBuffer = await response3.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64Image = buffer.toString("base64");
          const imageType =
            response3.headers.get("content-type") || "image/jpeg";

          if (base64Image && base64Image.trim() !== "") {
            image = `data:${imageType};base64,${base64Image}`;
          }
        } catch (err) {
          console.error("Error processing image:", err.message);
          image = null;
        }
      }

      // If the required data from API 1 is missing, send null
      if (!data1?.data) {
        return res.status(200).json({
          data: null,
          status: 200,
          message: "No user data found",
        });
      }

      // Destructure the necessary data
      const {
        registrationNumber,
        rollNumber,
        firstName: userFirstName,
        middleName,
        lastName,
        displayName,
        maritalStatus,
        dateOfBirth,
        personalEmail,
        mobileNumber,
        nationalityId,
        religionId,
        casteId,
        categoryId,
        branchId,
        degreeId,
        schemeId,
        sessionId,
        semesterId,
        yearId,
        sectionId,
        admissionBatchId,
        admissionBatchName,
        studentGroupId,
        dateOfAdmission,
        branchName,
        degreeName,
        sessionName,
        semesterName,
        yearName,
        sectionName,
        nationalityName,
        religionName,
        casteName,
        categoryName,
        studentPersonalInformation,
        studentAddressList,
        studentParentDetailsList,
      } = data1.data;

      const userDetails = {
        registrationNumber: registrationNumber || "",
        rollNumber: rollNumber || "",
        userFirstName: userFirstName || "",
        middleName: middleName || "",
        lastName: lastName || "",
        displayName: displayName || "",
        maritalStatus: maritalStatus || "",
        dateOfBirth: dateOfBirth || "",
        personalEmail: personalEmail || "",
        mobileNumber: mobileNumber || "",
      };

      const idDetails = {
        nationalityId: nationalityId || "",
        religionId: religionId || "",
        casteId: casteId || "",
        categoryId: categoryId || "",
        branchId: branchId || "",
        degreeId: degreeId || "",
        schemeId: schemeId || "",
        sessionId: sessionId || "",
        semesterId: semesterId || "",
        yearId: yearId || "",
        sectionId: sectionId || "",
        admissionBatchId: admissionBatchId || "",
        admissionBatchName: admissionBatchName || "",
        studentGroupId: studentGroupId || "",
      };

      const courseDetails = {
        dateOfAdmission: dateOfAdmission || "",
        branchName: branchName || "",
        degreeName: degreeName || "",
        sessionName: sessionName || "",
        semesterName: semesterName || "",
        yearName: yearName || "",
        sectionName: sectionName || "",
        cgpaData: data2?.data || "",
      };

      const personalInformation = {
        domicileStateName: studentPersonalInformation?.domicileStateName || "",
        motherTongueName: studentPersonalInformation?.motherTongueName || "",
        birthPlace: studentPersonalInformation?.birthPlace || "",
        aadhaarNumber: studentPersonalInformation?.aadhaarNumber || "",
        isPhysicallyChallenged: studentPersonalInformation?.isPhysicallyChallenged || "",
        bloodGroupName: studentPersonalInformation?.bloodGroupName || "",
      };

      const studentAddress = {
        address: studentAddressList[0]?.address || "",
        pincode: studentAddressList[0]?.pincode || "",
        addressType: studentAddressList[0]?.addressType || "",
        stateName: studentAddressList[0]?.stateName || "",
        districtName: studentAddressList[0]?.districtName || "",
        cityName: studentAddressList[0]?.cityName || "",
        countryName: studentAddressList[0]?.countryName || "",
      };

      const fatherDetails = {
        fatherParentType: studentParentDetailsList[0]?.parentType || "",
        fatherFirstName: studentParentDetailsList[0]?.firstName || "",
        fatherLastName: studentParentDetailsList[0]?.lastName || "",
        fatherMobileNo: studentParentDetailsList[0]?.mobileNo || "",
        fatherOccupationName: studentParentDetailsList[0]?.occupationName || "",
        fatherAnnualIncome: studentParentDetailsList[0]?.annualIncome || "",
        fatherFullName: studentParentDetailsList[0]?.fullName || "",
        fatherAnnualIncomeWithExt: studentParentDetailsList[0]?.annualIncomeWithExt || "",
      };

      const castAndReligion = {
        nationalityName: nationalityName || "",
        religionName: religionName || "",
        casteName: casteName || "",
        categoryName: categoryName || "",
      };

      console.log("Data fetched successfully.");

      res.status(200).json({
        data: {
          userDetails,
          idDetails,
          courseDetails,
          personalInformation,
          studentAddress,
          fatherDetails,
          castAndReligion,
          image,
          attandance: data4?.data, // Check if attendance data exists
        },
        status: 200,
        message: "Success",
      });
    } catch (err) {
      console.error("Unhandled error:", err.message);
      res.status(501).json({
        data: null,
        status: 501,
        message: "Failed to process request",
      });
    }
  };

  fetchUserDetails();
};

export default mainController;
