import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { 
  FiUser, 
  FiMail, 
  FiMapPin, 
  FiPhone, 
  FiBook, 
  FiLinkedin,
  FiEdit2,
  FiSave,
  FiX,
  FiCheck
} from "react-icons/fi";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
const MyProfile = () => {
  const [user, loading, Urror] = useAuthState(auth);
  const [edit, setEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery("profile", () =>
    fetch(`https://autovantis.onrender.com/user/${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  const fullName = user?.displayName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const location = e.target.location.value;
    const education = e.target.education.value;
    const phone = e.target.phone.value;
    const linkedin = e.target.linkedin.value;
    
    const updateData = {
      location,
      education,
      phone,
      linkedin,
    };

    if (location || education || phone || linkedin) {
      try {
        const response = await fetch(`https://autovantis.onrender.com/profile/${user?.email}`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updateData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          refetch();
          toast.success("Profile updated successfully!");
          setEdit(false);
          e.target.reset();
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        toast.error("An error occurred while updating profile");
      }
    } else {
      toast.error("Please fill at least one field");
    }
    
    setIsUpdating(false);
  };

  const profileFields = [
    { 
      icon: FiUser, 
      label: "Full Name", 
      value: user?.displayName,
      editable: false
    },
    { 
      icon: FiMail, 
      label: "Email Address", 
      value: user?.email,
      editable: false
    },
    { 
      icon: FiMapPin, 
      label: "Location", 
      value: profile?.location,
      editable: true,
      name: "location"
    },
    { 
      icon: FiPhone, 
      label: "Phone Number", 
      value: profile?.phone,
      editable: true,
      name: "phone"
    },
    { 
      icon: FiBook, 
      label: "Education", 
      value: profile?.education,
      editable: true,
      name: "education"
    },
    { 
      icon: FiLinkedin, 
      label: "LinkedIn", 
      value: profile?.linkedin,
      editable: true,
      name: "linkedin"
    }
  ];

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Simple Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Profile</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your account information</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Profile Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0 self-center sm:self-auto">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-lg sm:text-xl font-medium text-white">
                    {getInitials(user?.displayName)}
                  </span>
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {user?.displayName || "User"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 break-all sm:break-normal">{user?.email}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setEdit(!edit)}
              className={`inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors w-full sm:w-auto ${
                edit 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {edit ? <FiX size={16} /> : <FiEdit2 size={16} />}
              <span>{edit ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>
        </div>
        {/* Profile Content */}
        <div className="p-4 sm:p-6">
          {!edit ? (
            /* Display Mode - Responsive Grid Layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
              {profileFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 min-h-[50px] sm:min-h-[60px] p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{field.label}</p>
                      <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">
                        {field.value || (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </p>
                    </div>
                    {field.value && !field.editable && (
                      <div className="flex-shrink-0 mt-1">
                        <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Edit Mode - Responsive Form Layout */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Non-editable fields in responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 pb-4 sm:pb-6 border-b border-gray-200">
                {profileFields.filter(field => !field.editable).map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 min-h-[50px] sm:min-h-[60px] p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{field.label}</p>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">{field.value}</p>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Editable fields in responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileFields.filter(field => field.editable).map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                        <IconComponent size={14} className="sm:w-4 sm:h-4" />
                        <span>{field.label}</span>
                      </label>
                      <input
                        name={field.name}
                        type={field.name === 'phone' ? 'tel' : field.name === 'linkedin' ? 'url' : 'text'}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        defaultValue={field.value || ''}
                        className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-end pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
