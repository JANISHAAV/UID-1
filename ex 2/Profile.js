import React from 'react';

export default function Profile(props) {
  return (
    <section className="profile">
      <img src={props.image} alt={props.name} />
      <h2>{props.name}</h2>
      <p><strong>Email:</strong> {props.email}</p>
      <p><strong>Location:</strong> {props.location}</p>
      <p><strong>Phone:</strong> {props.phone}</p>
      <p><strong>Bio:</strong> {props.bio}</p>
      <button onClick={() => alert(`Contacting ${props.name}...`)}>Contact Me</button>
    </section>
  );
}
