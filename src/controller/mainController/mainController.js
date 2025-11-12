import UserModel from "../../models/userData/UserDataModal.js";
import User from "../../models/userModel.js";

const fetchWithTimeout = (url, options, timeout = 8000) => {
  return Promise.race([
    fetch(url, options).then((res) => {
      console.log(`Response received from ${url}`);
      return res;
    }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request to ${url} timed out`)),
        timeout
      )
    ),
  ]);
};

const mainController = async (req, res) => {
  const { id, token } = req.body.data;
  const { username } = req.body;
  console.log(req.body)

  if (!id || !token) {
    return res.status(400).json({
      data: null,
      status: 400,
      message: "User ID or token missing",
    });
  }

  try {
    let user = await User.findOne({ userId: id });
    if (!user) {
      user = await User.create({ userId: id });
    }

    const urls = {
      info: "https://ghrua.cybervidya.net/api/info/student/fetch",
      performance:
        "https://ghrua.cybervidya.net/api/student/dashboard/performance",
      image: "https://ghrua.cybervidya.net/api/admission/student/assets/get",
      attendance:
        "https://ghrua.cybervidya.net/api/student/dashboard/attendance",
    };

    const headers = {
      accept: "application/json, text/plain, */*",
      authorization: `GlobalEducation ${token}`,
      uid: id.toString(),
    };

    const headerWithoutUID = {
      ...headers,
    };
    delete headerWithoutUID.uid;

    const [res1, res2, res3, res4] = await Promise.allSettled([
      fetchWithTimeout(urls.info, { method: "GET", headers }),
      fetchWithTimeout(urls.performance, { method: "GET", headers }),
      fetchWithTimeout(urls.image, {
        method: "GET",
        headers: headerWithoutUID,
      }),
      fetchWithTimeout(urls.attendance, {
        method: "GET",
        headers: headerWithoutUID,
      }),
    ]);

    const safeJson = async (res) => (res?.ok ? await res.json() : null);

    const data1 = await safeJson(res1.value);
    const data2 = await safeJson(res2.value);
    const attendanceData = await safeJson(res4.value);

    // Process image
    let image = null;
    if (res3.status === "fulfilled" && res3.value.ok) {
      try {
        const arrayBuffer = await res3.value.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");
        const contentType =
          res3.value.headers.get("content-type") || "image/jpeg";
        if (base64Image && base64Image.trim() !== "") {
          image = `data:${contentType};base64,${base64Image}`;
        }
      } catch (err) {
        console.error("Error processing image:", err.message);
      }
    }

    if (!data1?.data) {
      return res.status(200).json({
        data: null,
        status: 200,
        message: "No student info found",
      });
    }

    const {
      registrationNumber,
      rollNumber,
      firstName,
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
      registrationNumber,
      rollNumber,
      userFirstName: firstName,
      middleName,
      lastName,
      displayName,
      maritalStatus,
      dateOfBirth,
      personalEmail,
      mobileNumber,
    };

    const idDetails = {
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
    };

    const courseDetails = {
      dateOfAdmission,
      branchName,
      degreeName,
      sessionName,
      semesterName,
      yearName,
      sectionName,
      cgpaData: data2?.data || null,
    };

    const personalInformation = {
      domicileStateName: studentPersonalInformation?.domicileStateName || "",
      motherTongueName: studentPersonalInformation?.motherTongueName || "",
      birthPlace: studentPersonalInformation?.birthPlace || "",
      aadhaarNumber: studentPersonalInformation?.aadhaarNumber || "",
      isPhysicallyChallenged:
        studentPersonalInformation?.isPhysicallyChallenged || false,
      bloodGroupName: studentPersonalInformation?.bloodGroupName || "",
    };

    const studentAddress = {
      address: studentAddressList?.[0]?.address || "",
      pincode: studentAddressList?.[0]?.pincode || "",
      addressType: studentAddressList?.[0]?.addressType || "",
      stateName: studentAddressList?.[0]?.stateName || "",
      districtName: studentAddressList?.[0]?.districtName || "",
      cityName: studentAddressList?.[0]?.cityName || "",
      countryName: studentAddressList?.[0]?.countryName || "",
    };

    const fatherDetails = {
      fatherParentType: studentParentDetailsList?.[0]?.parentType || "",
      fatherFirstName: studentParentDetailsList?.[0]?.firstName || "",
      fatherLastName: studentParentDetailsList?.[0]?.lastName || "",
      fatherMobileNo: studentParentDetailsList?.[0]?.mobileNo || "",
      fatherOccupationName: studentParentDetailsList?.[0]?.occupationName || "",
      fatherAnnualIncome: studentParentDetailsList?.[0]?.annualIncome || "",
      fatherFullName: studentParentDetailsList?.[0]?.fullName || "",
      fatherAnnualIncomeWithExt:
        studentParentDetailsList?.[0]?.annualIncomeWithExt || "",
    };

    const castAndReligion = {
      nationalityName,
      religionName,
      casteName,
      categoryName,
    };
    console.log("username", username);
    const PhoneData = await UserModel.find({
      User_Id: username,
    });
    return res.status(200).json({
      data: {
        userDetails,
        idDetails,
        courseDetails,
        personalInformation,
        studentAddress,
        fatherDetails,
        castAndReligion,
        image,
        attandance: attendanceData?.data || null,
        PhoneLinkData: PhoneData && PhoneData.length > 0 ? true : null,
      },
      status: 200,
      message: "Success",
    });
  } catch (err) {
    console.error("❌ Error in mainController:", err.message);
    return res.status(500).json({
      data: null,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default mainController;
