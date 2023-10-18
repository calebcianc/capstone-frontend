import React from "react";

export default function ProfilePage({
  isAuthenticated,
  LoginButton,
  LogoutButton,
}) {
  return (
    <div>
      <h3>This is the Profile page</h3>
      {!isAuthenticated && LoginButton}
      {isAuthenticated && LogoutButton}
    </div>
  );
}
