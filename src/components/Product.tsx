import React from 'react';
import tumbaImg from '../assets/tumba.png';
import heartSvg from '../assets/heart.svg';
import cartSvg from '../assets/cart.svg';

import Stars from './Stars';

export interface IProductProps {
  title: string;
  rating: number;
  price: {
    new: number;
    old: number;
    hot?: boolean;
  };
  color: string;
  material: string;
  size: string;
  mechanism: string;
  seller: string;
}

const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const Product: React.FC<IProductProps> = ({
  title,
  rating,
  price,
  color,
  material,
  size,
  mechanism,
  seller,
}) => {
  return (
    <div className="product">
      <div className="product__overlay"></div>
      <ul className="columns columns--product">
        <li>
          <div className="columns__preview">
            <div className="columns__preview-image">
              <img width="148" src={tumbaImg} alt="Тумба" />
            </div>
            <h5>{title}</h5>
          </div>
        </li>
        <li className="columns__rating">
          <Stars count={Math.floor(rating)} />
          <b>{rating}</b>
        </li>
        <li className={`columns__price ${price.hot ? 'columns__price--hot' : ''}`}>
          <span>{formatPrice(price.new)} Р</span>
          <s>{formatPrice(price.old)} Р</s>
        </li>
        <li>{color}</li>
        <li>{material}</li>
        <li>{size}</li>
        <li>{mechanism}</li>
        <li>
          <a href="/">{seller}</a>
        </li>
        <li>
          <button className="button button--like">
            <img src={heartSvg} alt="Heart" />
          </button>
          <button className="button button--cart">
            <img src={cartSvg} alt="Cart" />
            <span>Купить</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Product;
