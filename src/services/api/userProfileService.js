import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const createUserProfile = async (profileData) => {
  try {
    const apperClient = getApperClient();
    
    // Map the profile data to database field names
    const userData = {
      Name: profileData.name || `Profile-${Date.now()}`,
      education_country: profileData.educationCountry,
      english_education: profileData.englishEducation,
      test_scores: profileData.testScores ? JSON.stringify(profileData.testScores) : null,
      education_level: profileData.educationLevel,
      has_license: profileData.hasLicense,
      years_experience: profileData.yearsExperience,
      recent_practice: profileData.recentPractice,
      country_preferences: profileData.countryPreferences,
      priority_preferences: profileData.priorityPreferences
    };

    const params = {
      records: [userData]
    };

    const response = await apperClient.createRecord("user_profile", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }

    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      if (result.success) {
        toast.success("Profile created successfully!");
        return result.data;
      } else {
        if (result.errors) {
          result.errors.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
        }
        if (result.message) {
          toast.error(result.message);
        }
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error("Error creating user profile:", error);
    toast.error("Failed to create user profile");
    return null;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "education_country" } },
        { field: { Name: "english_education" } },
        { field: { Name: "test_scores" } },
        { field: { Name: "education_level" } },
        { field: { Name: "has_license" } },
        { field: { Name: "years_experience" } },
        { field: { Name: "recent_practice" } },
        { field: { Name: "country_preferences" } },
        { field: { Name: "priority_preferences" } }
      ],
      where: [
        {
          FieldName: "Owner",
          Operator: "EqualTo",
          Values: [userId]
        }
      ],
      orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }]
    };

    const response = await apperClient.fetchRecords("user_profile", params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.data && response.data.length > 0) {
      const profile = response.data[0];
      return {
        Id: profile.Id,
        name: profile.Name,
        educationCountry: profile.education_country,
        englishEducation: profile.english_education,
        testScores: profile.test_scores ? JSON.parse(profile.test_scores) : null,
        educationLevel: profile.education_level,
        hasLicense: profile.has_license,
        yearsExperience: profile.years_experience,
        recentPractice: profile.recent_practice,
        countryPreferences: profile.country_preferences,
        priorityPreferences: profile.priority_preferences
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (profileId, profileData) => {
  try {
    const apperClient = getApperClient();
    
    // Map the profile data to database field names
    const userData = {
      Id: profileId,
      Name: profileData.name || `Profile-${Date.now()}`,
      education_country: profileData.educationCountry,
      english_education: profileData.englishEducation,
      test_scores: profileData.testScores ? JSON.stringify(profileData.testScores) : null,
      education_level: profileData.educationLevel,
      has_license: profileData.hasLicense,
      years_experience: profileData.yearsExperience,
      recent_practice: profileData.recentPractice,
      country_preferences: profileData.countryPreferences,
      priority_preferences: profileData.priorityPreferences
    };

    const params = {
      records: [userData]
    };

    const response = await apperClient.updateRecord("user_profile", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }

    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      if (result.success) {
        toast.success("Profile updated successfully!");
        return result.data;
      } else {
        if (result.errors) {
          result.errors.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
        }
        if (result.message) {
          toast.error(result.message);
        }
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error("Error updating user profile:", error);
    toast.error("Failed to update user profile");
    return null;
  }
};

export const getAllUserProfiles = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "education_country" } },
        { field: { Name: "english_education" } },
        { field: { Name: "test_scores" } },
        { field: { Name: "education_level" } },
        { field: { Name: "has_license" } },
        { field: { Name: "years_experience" } },
        { field: { Name: "recent_practice" } },
        { field: { Name: "country_preferences" } },
        { field: { Name: "priority_preferences" } },
        { field: { Name: "CreatedOn" } }
      ],
      orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }]
    };

    const response = await apperClient.fetchRecords("user_profile", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    toast.error("Failed to load user profiles");
    return [];
  }
};

export const deleteUserProfile = async (profileId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [profileId]
    };

    const response = await apperClient.deleteRecord("user_profile", params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }

    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      if (result.success) {
        toast.success("Profile deleted successfully!");
        return true;
      } else {
        if (result.message) {
          toast.error(result.message);
        }
        return false;
      }
    }

    return false;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    toast.error("Failed to delete user profile");
    return false;
  }
};