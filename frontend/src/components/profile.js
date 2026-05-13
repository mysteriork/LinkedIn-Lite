import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Mail, User, BadgeCheck, FileText, Hash } from "lucide-react";
import "../web.css";

function Profile() {
  const location = useLocation();
  const profilename = location.state.profilename;

  const firstLetter = profilename.charAt(0).toUpperCase();
  const [profile, setProfile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const profilePic = (name) => {
    axios
      .get("https://minilinked-in.onrender.com/api/posts/profile", {
        params: {
          firstname: name,
        },
      })
      .then((result) => {
        setProfile(result.data);
        setSelectedUser(name);
      })
      .catch((err) => {
        console.log("error in getting profile", err);
      });
  };

  useEffect(() => {
    profilePic(profilename);
  }, [profilename]);

  return (
    <div className="profile-container">
      {selectedUser === profilename && profile && (
        <div className="modern-card">
          <div className="card-top">
            <div className="avatar">{firstLetter ? firstLetter : "UD"}</div>

            <div>
              <h2>
                {profile.firstname} {profile.lastname}
              </h2>
              <p>@{profile.username}</p>
            </div>
          </div>

          <div className="bio-box">
            <p>{profile.bio || "No bio added yet."}</p>
          </div>

          <div className="profile-details">
            {/* <div className="detail-item">
              <Hash size={18} />
              <div>
                <small>ID</small>
                <p>{profile._id}</p>
              </div>
            </div> */}

            <div className="detail-item">
              <Mail size={18} />
              <div>
                <small>Email</small>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="detail-item">
              <BadgeCheck size={18} />
              <div>
                <small>Username</small>
                <p>{profile.username}</p>
              </div>
            </div>

            <div className="detail-item">
              <User size={18} />
              <div>
                <small>Name</small>
                <p>
                  {profile.firstname} {profile.lastname}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
