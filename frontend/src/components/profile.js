import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../web.css";

function Profile() {
  const location = useLocation();
  const profilename = location.state.profilename;

  const [profile, setProfile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const profilePic = (name) => {
    axios
      .post("https://linkedin-lite-t1zn.onrender.com/user/profile", { firstname: name })
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
    <div>
      
      <div className="profile container1">
        {selectedUser === profilename && profile && (
          <div className="profilepic">
            <strong>
              ID : <p>{profile._id}</p>
            </strong>
            <strong>
              NAME :
              <p>
                {profile.firstname} {profile.lastname}
              </p>
            </strong>
            <strong>
              EMAIL :<p>{profile.email}</p>
            </strong>
            <strong>
              BIO :<p>{profile.bio}</p>
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

