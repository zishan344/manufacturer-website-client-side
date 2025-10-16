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
    <div className="max-w-4xl mx-auto p-6">
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-xl font-medium text-white">
                    {getInitials(user?.displayName)}
                  </span>
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.displayName || "User"}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setEdit(!edit)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
        <div className="p-6">
          {!edit ? (
            /* Display Mode - Compact Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {profileFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 min-h-[60px]">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{field.label}</p>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {field.value || (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </p>
                    </div>
                    {field.value && !field.editable && (
                      <div className="flex-shrink-0">
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Edit Mode - Compact Form Layout */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Non-editable fields in grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pb-6 border-b border-gray-200">
                {profileFields.filter(field => !field.editable).map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 min-h-[60px]">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{field.label}</p>
                        <p className="text-sm text-gray-600 mt-1 truncate">{field.value}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Editable fields in grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileFields.filter(field => field.editable).map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <IconComponent size={16} />
                        <span>{field.label}</span>
                      </label>
                      <input
                        name={field.name}
                        type={field.name === 'phone' ? 'tel' : field.name === 'linkedin' ? 'url' : 'text'}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        defaultValue={field.value || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
