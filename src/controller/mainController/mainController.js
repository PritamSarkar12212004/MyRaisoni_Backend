const mainController = (req, res) => {
  const { id, token } = req.body.data;

  const fetchUserDetails = async () => {
    const url = "https://ghrua.cybervidya.net/api/info/student/fetch";
    const url2 =
      "https://ghrua.cybervidya.net/api/student/dashboard/performance";
    const url3 =
      "https://ghrua.cybervidya.net/api/admission/student/assets/get";
    const url4 =
      "https://ghrua.cybervidya.net/api/student/dashboard/attendance";
    // Headers from your provided request
    const headers = {
      accept: "application/json, text/plain, */*",
      authorization: `GlobalEducation ${token}`,
      uid: toString(id),
    };
    const header2 = {
      accept: "application/json, text/plain, */*",
      authorization: `GlobalEducation ${token}`,
    };
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const response2 = await fetch(url2, {
        method: "GET",
        headers: headers,
      });
      const response3 = await fetch(url3, {
        method: "GET",
        headers: header2,
      });
      const respose4 = await fetch(url4, {
        method: "GET",
        headers: header2,
      });

      if (response.ok && response2.ok && response3.ok && respose4.ok) {
        const data = await response.json(); // Parse response as JSON
        const data2 = await response2.json(); // Parse response as JSON
        const data4 = await respose4.json(); // Parse response as JSON

        const arrayBuffer = await response3.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");
        const imageType = response3.headers.get("content-type") || "image/jpeg";
        const image = `data:${imageType};base64,${base64Image}`;

        const { data: cgpa } = data2;
        const cgpaData = cgpa;
        // User data
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
        } = data.data;

        const userDetails = {
          registrationNumber,
          rollNumber,
          userFirstName,
          middleName,
          lastName,
          displayName,
          maritalStatus,
          dateOfBirth,
          personalEmail,
          mobileNumber,
        };

        // ID section
        const {
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
        } = data.data;

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
        // Course section
        const {
          dateOfAdmission,
          branchName,
          degreeName,
          sessionName,
          semesterName,
          yearName,
          sectionName,
        } = data.data;

        const courseDetails = {
          dateOfAdmission,
          branchName,
          degreeName,
          sessionName,
          semesterName,
          yearName,
          sectionName,
          cgpaData,
        };

        // Personal information
        const {
          domicileStateName,
          motherTongueName,
          birthPlace,
          aadhaarNumber,
          isPhysicallyChallenged,
          bloodGroupName,
        } = data.data.studentPersonalInformation;
        const personalInformation = {
          domicileStateName,
          motherTongueName,
          birthPlace,
          aadhaarNumber,
          isPhysicallyChallenged,
          bloodGroupName,
        };

        // Student address
        const {
          address,
          pincode,
          addressType,
          stateName,
          districtName,
          cityName,
          countryName,
        } = data.data.studentAddressList[0];
        const studentAddress = {
          address,
          pincode,
          addressType,
          stateName,
          districtName,
          cityName,
          countryName,
        };

        // Student parent details - Father
        const {
          parentType: fatherParentType,
          firstName: fatherFirstName,
          lastName: fatherLastName,
          mobileNo: fatherMobileNo,
          occupationName: fatherOccupationName,
          annualIncome: fatherAnnualIncome,
          fullName: fatherFullName,
          annualIncomeWithExt: fatherAnnualIncomeWithExt,
        } = data.data.studentParentDetailsList[0];
        const fatherDetails = {
          fatherParentType,
          fatherFirstName,
          fatherLastName,
          fatherMobileNo,
          fatherOccupationName,
          fatherAnnualIncome,
          fatherFullName,
          fatherAnnualIncomeWithExt,
        };
        // Student parent details - Mother

        // Cast and religion
        const { nationalityName, religionName, casteName, categoryName } =
          data.data;
        const castAndReligion = {
          nationalityName,
          religionName,
          casteName,
          categoryName,
        };

        res.status(200).json({
          data: {
            userDetails: userDetails,
            idDetails: idDetails,
            courseDetails: courseDetails,
            personalInformation: personalInformation,
            studentAddress: studentAddress,
            fatherDetails: fatherDetails,
            castAndReligion: castAndReligion,
            image: image,
            attandance: data4,
          },
          status: 200,
          message: "Success",
        });
      } else {
        console.log("error");
        res.status(500).json({
          data: null,
          status: 500,
          message: "Failed sending data",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(501).json({
        data: null,
        status: 500,
        message: "Failed",
      });
    }
  };
  fetchUserDetails();
};
export default mainController;
