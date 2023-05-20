import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabase';
import ReCAPTCHA from "react-google-recaptcha";

const CustomerReview = ({ onReviewSubmit }) => {
    const router = useRouter();
    const { courseId } = router.query;
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value);
    setNewReview({ ...newReview, rating: selectedRating });
  };

  const handleCommentChange = (event) => {
    const comment = event.target.value;
    setNewReview({ ...newReview, comment: comment });
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    // if (!captchaValue) {
    //   console.error('reCAPTCHA validation failed.');
    //   return;
    // }

    try {
      // Insert the new review into the course_review table
      const { error } = await supabase.from('course_review').insert([{ course_id: courseId, ...newReview }]);

      if (error) throw error;

      setNewReview({ rating: 0, comment: '' });
      onReviewSubmit();
    } catch (error) {
      console.error('Error submitting course review:', error.message);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= newReview.rating ? <ColoredStarIcon /> : <GreyStarIcon />;
      stars.push(
        <label key={i} className="mr-1">
          <input
            type="radio"
            name="rating"
            value={i}
            checked={newReview.rating === i}
            onChange={handleRatingChange}
            className="hidden"
          />
          {starIcon}
        </label>
      );
    }
    return stars;
  };

  const ColoredStarIcon = () => (
    <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24">
      <path d="M12 2l2.352 7.166h7.649l-5.541 4.028 2.33 7.137L12 17.914l-6.79 4.527 2.33-7.137-5.54-4.028h7.648z" />
    </svg>
  );

  const GreyStarIcon = () => (
    <svg className="w-5 h-5 fill-current text-gray-300" viewBox="0 0 24 24">
      <path d="M12 2l2.352 7.166h7.649l-5.541 4.028 2.33 7.137L12 17.914l-6.79 4.527 2.33-7.137-5.54-4.028h7.648z" />
    </svg>
  );

  return (
    <div>
      <h2>Customer Reviews</h2>
      <div className="flex items-center mb-2">
        <label htmlFor="rating" className="text-lg font-bold mr-2">
          Rating:
        </label>
        <div className="flex">
          {renderStars()}
        </div>
      </div>

      <form onSubmit={handleSubmitReview} className="mb-6">
        <div>
          <label htmlFor="comment" className="text-lg font-bold mb-2">
            Comment:
          </label>
        </div>
        <textarea
          name="comment"
          value={newReview.comment}
          onChange={handleCommentChange}
          className="w-full p-2 border border-gray-300 rounded resize-none"
          placeholder="Write your review..."
          rows={4}
          style={{ maxWidth: '80%' }}
        />
        <br />
        <button
          type="submit"
          disabled={newReview.rating === 0 || newReview.comment === ''}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
        >
          Submit Review
        </button>
        {/* <ReCAPTCHA sitekey={process.env.reCAPTCHA_SITE_KEY} onChange={handleCaptchaChange} /> */}
      </form>
    </div>
  );
};

export default CustomerReview;