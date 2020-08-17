import React, { SyntheticEvent, MouseEvent, useState } from "react";
import { Link } from "react-micro-router";
import set from "lodash/set";

import { User } from "../types";

export default ({
  loggedInUser,
  setLoggedInUser,
}: {
  loggedInUser: User;
  setLoggedInUser: Function;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(loggedInUser);

  const toggleEditing = (event: MouseEvent) => {
    event.preventDefault();
    setIsEditing(!isEditing);
    setProfile(loggedInUser);
  };

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { checked, name, type, value } = target;
    const newProfile = Object.assign({}, profile);

    if (type === "checkbox") {
      set(newProfile, name, !!checked);
    } else {
      set(newProfile, name, value);
    }

    setProfile(newProfile);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    setLoggedInUser(profile);
  };

  return (
    <div className={`${!isEditing ? "readOnly" : ""}`}>
      <h1>Profile</h1>
      <form
        onChange={handleChange}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label>
            First name:
            <input
              name="firstName"
              value={profile.firstName}
              readOnly={!isEditing}
            />
          </label>
        </div>
        <div>
          <label>
            Other names:
            <input
              name="otherNames"
              value={profile.otherNames}
              readOnly={!isEditing}
            />
          </label>
        </div>

        <fieldset>
          <legend>Address</legend>
          <div>
            <label>
              Street:
              <input
                name="address.street"
                value={profile.address.street}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div>
            <label>
              Town:
              <input
                name="address.town"
                value={profile.address.town}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div>
            <label>
              County:
              <input
                name="address.county"
                value={profile.address.county}
                readOnly={!isEditing}
              />
            </label>
          </div>
          <div>
            <label>
              Post code:
              <input
                name="address.postcode"
                value={profile.address.postcode}
                readOnly={!isEditing}
              />
            </label>
          </div>
        </fieldset>

        <div>
          <label>
            Mobile:
            <input name="mobile" value={profile.mobile} readOnly={!isEditing} />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input name="email" value={profile.email} readOnly={!isEditing} />
          </label>
        </div>
        <div>
          <label>
            Company:
            <input
              name="company"
              value={profile.company}
              readOnly={!isEditing}
            />
          </label>
        </div>

        <div>
          <h2>Preferences</h2>
        </div>

        <fieldset disabled={!isEditing}>
          <legend>Contact preferences</legend>

          <label>
            Mail:
            <input
              type="checkbox"
              name="preferences.contact.mail"
              checked={profile.preferences.contact.mail}
              readOnly={!isEditing}
            />
          </label>

          <label>
            SMS:
            <input
              type="checkbox"
              name="preferences.contact.sms"
              checked={profile.preferences.contact.sms}
              readOnly={!isEditing}
            />
          </label>
        </fieldset>

        {isEditing ? (
          <div>
            <button type="submit">Save</button>
            <button onClick={toggleEditing} type="button">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button onClick={toggleEditing} type="button">
              Edit
            </button>
            <Link to="/">Cancel</Link>
          </div>
        )}
      </form>
    </div>
  );
};
