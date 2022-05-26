import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
const MyProfile = () => {
  const [user, loading, Urror] = useAuthState(auth);
  const [edit, setEdit] = useState(false);
  // const [profile, setProfile] = useState({});
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery("profile", () =>
    fetch(`https://desolate-citadel-69075.herokuapp.com/user/${user?.email}`, {
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
  console.log(profile);
  const handleSubmit = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const education = e.target.education.value;
    const phone = e.target.phone.value;
    const linkedin = e.target.linkedin.value;
    const cart = {
      location,
      education,
      phone,
      linkedin,
    };
    if (location || education || phone || linkedin) {
      fetch(
        `https://desolate-citadel-69075.herokuapp.com/profile/${user?.email}`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(cart),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          refetch();
          console.log(data);
        });
      setEdit(false);
    } else {
      toast.error("minimum fill up 1 input");
    }

    e.target.reset();
    console.log(cart);
  };
  return (
    <div class="card max-w-lg mx-auto bg-base-100 shadow-xl items-center">
      {user?.photoURL ? (
        <div class="avatar flex justify-center mt-4">
          <div class="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="Shoes" className="rounded-xl" />
          </div>
        </div>
      ) : (
        <div class="avatar flex justify-center mt-4">
          <div
            style={{ display: "flex" }}
            class="w-28 rounded-full ring ring-primary bg-primary ring-offset-base-100 ring-offset-2 justify-center items-center"
          >
            <span className="rounded-xl text-3xl font-bold text-secondary">
              {fullName}
            </span>
          </div>
        </div>
      )}
      <div class="card-body ">
        <div className="tex-xl flex flex-col font-bold gap-5">
          <h2>
            Name{" "}
            <span className="text-secondary font-bold">
              {user?.displayName}
            </span>{" "}
          </h2>
          <h2>
            Email:{" "}
            <span className="text-secondary font-bold">{user?.email}</span>{" "}
          </h2>

          {profile?.location && (
            <h2>
              Location:{" "}
              <span className="text-secondary font-bold">
                {profile?.location}
              </span>{" "}
            </h2>
          )}
          {profile?.education && (
            <h2>
              Educations/Qualification:{" "}
              <span className="text-secondary font-bold">
                {profile?.education}
              </span>{" "}
            </h2>
          )}
          {profile?.phone && (
            <h2>
              Phone:{" "}
              <span className="text-secondary font-bold">{profile?.phone}</span>{" "}
            </h2>
          )}
          {profile?.linkedin && (
            <h2>
              linkedin :{" "}
              <span className="text-secondary font-bold">
                {profile?.linkedin}
              </span>{" "}
            </h2>
          )}
        </div>

        <div class="card-actions justify-center">
          <label class="swap ">
            <input onClick={() => setEdit(!edit)} type="checkbox" />
            <div class="swap-on btn btn-ghost text-xl font-bold ">X</div>
            <div class="swap-off link btn btn-active btn-link text-secondary">
              Edit Profile
            </div>
          </label>
        </div>
        {edit && (
          <>
            <h2 className="text-secondary text-2xl font-bold">
              Update your profile
            </h2>
            <form onSubmit={handleSubmit}>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">update location</span>
                </label>
                <input
                  name="location"
                  type="text"
                  placeholder="Location"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Educational/Qualification</span>
                </label>
                <input
                  name="education"
                  type="text"
                  placeholder="Educational/Qualification"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Phone</span>
                </label>
                <input
                  name="phone"
                  type="number"
                  placeholder="Phone number"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">LinkedIn profile</span>
                </label>
                <input
                  name="linkedin"
                  type="text"
                  placeholder="LinkedIn profile"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
              <button className="btn btn-primary mt-4 btn-sm">Save</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default MyProfile;
