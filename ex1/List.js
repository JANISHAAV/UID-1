import React from 'react';

const items = [
  {
    name: 'Laptop',
    description: 'A high-performance laptop for professionals.',
    image: process.env.PUBLIC_URL + '/images/laptop.jpg'
  },
  {
    name: 'Headphones',
    description: 'Noise-cancelling over-ear headphones.',
    image: process.env.PUBLIC_URL + '/images/headphones.jpg'
  },
  {
    name: 'Smartphone',
    description: 'Latest model smartphone with powerful camera.',
    image: process.env.PUBLIC_URL + '/images/smartphone.jpg'
  },
  {
    name: 'Smartwatch',
    description: 'Track your fitness and notifications on the go.',
    image: process.env.PUBLIC_URL + '/images/smartwatch.jpg'
  }
];

export default function List() {
  return (
    <section className="products-section">
      <h2>Our Products</h2>
      <div className="products-flex">
        {items.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
