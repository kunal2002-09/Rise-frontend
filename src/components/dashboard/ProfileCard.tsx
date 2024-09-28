import React from 'react';

interface ProfileCardProps {
  user: {
    id: number;
    name: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
    </div>
  );
};

export default ProfileCard;
