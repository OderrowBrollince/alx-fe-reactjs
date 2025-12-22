const UserProfile = (props) => {
  return (
    <div  style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center' }}>
      <h2 style={{ color: 'blue' }}>{props.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}> </span>{props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;