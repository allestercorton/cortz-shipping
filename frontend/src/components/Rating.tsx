import { Star, StarHalf, Star as StarOutline } from 'lucide-react';

const Rating = (props: {
  rating: number;
  numReviews?: number;
  caption?: string;
}) => {
  const { rating, numReviews, caption } = props;

  return (
    <div className='rating flex items-center space-x-1'>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          {rating >= index ? (
            <Star size={16} fill='gold' stroke='gold' />
          ) : rating >= index - 0.5 ? (
            <StarHalf size={16} fill='gold' stroke='gold' />
          ) : (
            <StarOutline size={16} stroke='gray' />
          )}
        </span>
      ))}
      {caption ? (
        <span>{caption}</span>
      ) : numReviews !== 0 ? (
        <span>{' ' + numReviews + ' reviews'}</span>
      ) : null}
    </div>
  );
};

export default Rating;
