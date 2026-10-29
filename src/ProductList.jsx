import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';

// Draws a small potted-plant illustration and returns it as an image data URI,
// so the shop works without depending on external image hosts.
// Replace `image` in the data below with real photo URLs any time.
function plantArt(shape, leaf, pot, bg) {
  const fill = `fill="${leaf}"`;
  let foliage = '';
  if (shape === 'spiky') {
    foliage = [-50, -30, -12, 6, 24, 44]
      .map((a) => `<ellipse cx="150" cy="135" rx="9" ry="72" ${fill} transform="rotate(${a} 150 205)"/>`)
      .join('');
  } else if (shape === 'fan') {
    foliage = [-62, -38, -14, 12, 36, 60]
      .map((a) => `<ellipse cx="150" cy="140" rx="17" ry="62" ${fill} transform="rotate(${a} 150 205)"/>`)
      .join('');
  } else if (shape === 'tall') {
    foliage =
      `<rect x="147" y="70" width="6" height="135" fill="${leaf}"/>` +
      [90, 120, 150, 178]
        .map(
          (y, i) =>
            `<ellipse cx="${i % 2 ? 122 : 178}" cy="${y}" rx="30" ry="14" ${fill} transform="rotate(${i % 2 ? -25 : 25} ${i % 2 ? 122 : 178} ${y})"/>`
        )
        .join('') +
      `<ellipse cx="150" cy="66" rx="14" ry="26" ${fill}/>;
  } else {
    foliage = [
      [150, 130, 38], [112, 160, 32], [188, 160, 32], [128, 105, 28], [172, 105, 28],
    ]
      .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill}/>`)
      .join('');
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">` +
    `<rect width="300" height="300" fill="${bg}"/>` +
    `<ellipse cx="150" cy="266" rx="70" ry="8" fill="#000" opacity="0.1"/>` +
    foliage +
    `<path d="M108 204H192L183 262H117Z" fill="${pot}"/>` +
    `<rect x="102" y="194" width="96" height="16" rx="4" fill="${pot}"/>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const POT = '#B7694A';
const POT2 = '#E8E2D4';
const POT3 = '#2F4A3C';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    blurb: 'These plants filter indoor air and keep bedrooms, offices and living rooms feeling fresh.',
    plants: [
      { name: 'Snake Plant', description: 'Produces oxygen at night and tolerates almost any light.', cost: 15, shape: 'spiky', leaf: '#3C7A4E', pot: POT, bg: '#E3EEDD' },
      { name: 'Spider Plant', description: 'Removes common household toxins and is safe for pets.', cost: 12, shape: 'fan', leaf: '#6FA85A', pot: POT2, bg: '#EAF1DC' },
      { name: 'Peace Lily', description: 'Removes mold spores and flowers with white blooms.', cost: 18, shape: 'tall', leaf: '#2D6B47', pot: POT3, bg: '#E0ECE4' },
      { name: 'Boston Fern', description: 'Adds humidity to dry rooms and filters formaldehyde.', cost: 20, shape: 'bush', leaf: '#4F9A5B', pot: POT, bg: '#E6F0DA' },
      { name: 'Rubber Plant', description: 'Big glossy leaves that soak up airborne pollutants.', cost: 17, shape: 'tall', leaf: '#245B3A', pot: POT2, bg: '#DDE9DD' },
      { name: 'Areca Palm', description: 'A feathery natural humidifier for bright living rooms.', cost: 24, shape: 'fan', leaf: '#5E9E4B', pot: POT3, bg: '#E9F1D9' },
    ],
  },
  {
    category: 'Aromatic Plants',
    blurb: 'Brush a leaf or open a window and these plants fill the room with scent.',
    plants: [
      { name: 'Lavender', description: 'Calming purple blooms with a classic relaxing fragrance.', cost: 20, shape: 'tall', leaf: '#8E7BB8', pot: POT, bg: '#EDE9F3' },
      { name: 'Jasmine', description: 'Sweet night-time perfume from delicate white flowers.', cost: 18, shape: 'bush', leaf: '#4E9060', pot: POT2, bg: '#E8F0E1' },
      { name: 'Rosemary', description: 'Woody, piney herb that is as good in the kitchen as the hall.', cost: 15, shape: 'spiky', leaf: '#4B7F5E', pot: POT3, bg: '#E3ECE2' },
      { name: 'Mint', description: 'Fast-growing and cooling; perfect for tea and cocktails.', cost: 12, shape: 'bush', leaf: '#58B068', pot: POT, bg: '#E4F2DE' },
      { name: 'Lemon Balm', description: 'Bright lemony scent that repels mosquitoes.', cost: 14, shape: 'bush', leaf: '#9CC24F', pot: POT2, bg: '#F0F4D9' },
      { name: 'Scented Geranium', description: 'Leaves smell of rose, lemon or mint when touched.', cost: 16, shape: 'bush', leaf: '#3F8A55', pot: POT3, bg: '#E5EFDF' },
    ],
  },
  {
    category: 'Medicinal Plants',
    blurb: 'Traditional healing plants for teas, soothing remedies and a well-stocked windowsill.',
    plants: [
      { name: 'Aloe Vera', description: 'Gel from the leaves soothes burns and dry skin.', cost: 14, shape: 'spiky', leaf: '#6AAE7A', pot: POT, bg: '#E6F1E4' },
      { name: 'Echinacea', description: 'Daisy-like flowers used to support the immune system.', cost: 19, shape: 'tall', leaf: '#4C8D55', pot: POT2, bg: '#F0E8E2' },
      { name: 'Holy Basil', description: 'Also called tulsi; used in teas for stress and colds.', cost: 13, shape: 'bush', leaf: '#3E8B4F', pot: POT3, bg: '#E2EEDD' },
      { name: 'Chamomile', description: 'Gentle flowers brewed into a tea for sleep and digestion.', cost: 12, shape: 'tall', leaf: '#8DB85A', pot: POT, bg: '#F2F2DC' },
      { name: 'Calendula', description: 'Orange petals used in balms for irritated skin.', cost: 15, shape: 'bush', leaf: '#D49A38', pot: POT2, bg: '#F6EEDB' },
      { name: 'Feverfew', description: 'A hardy herb traditionally used for headaches.', cost: 16, shape: 'fan', leaf: '#5C9A58', pot: POT3, bg: '#E8F0DE' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant, image) => {
    dispatch(
      addItem({
        name: plant.name,
        image,
        description: plant.description,
        cost: plant.cost,
      })
    );
  };

  return (
    <div className="product-list">
      <div className="page-heading">
        <h1>Our plants</h1>
        <p>Pick a plant, add it to your cart, and change quantities any time.</p>
      </div>

      {plantsArray.map((section) => (
        <section className="plant-section" key={section.category}>
          <h2>{section.category}</h2>
          <p className="section-blurb">{section.blurb}</p>
          <div className="product-grid">
            {section.plants.map((plant) => {
              const image = plantArt(plant.shape, plant.leaf, plant.pot, plant.bg);
              const added = isInCart(plant.name);
              return (
                <article className="product-card" key={plant.name}>
                  <img className="product-image" src={image} alt={plant.name} />
                  <div className="product-body">
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-cost">${plant.cost}</p>
                    <button
                      type="button"
                      className={`btn ${added ? 'btn-added' : 'btn-primary'}`}
                      onClick={() => handleAddToCart(plant, image)}
                      disabled={added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
