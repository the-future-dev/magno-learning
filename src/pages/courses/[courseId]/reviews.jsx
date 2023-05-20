import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../../lib/supabase';
import Layout from '../../../components/Layout';
import ReCAPTCHA from 'react-google-recaptcha';
import CustomerReview from '@/components/CustomerReview';

const Reviews = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('course_review')
        .select('*')
        .eq('course_id', courseId);

      if (error) throw error;

      setReviews(data);
    } catch (error) {
      console.error('Error fetching course reviews:', error.message);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 mt-8" style={{ marginInline: '15%', width: '70%' }}>
        <h1 className="text-3xl font-bold mb-6">Course Reviews</h1>
        <p className="text-lg mb-6">
          Total Reviews: <span className="font-bold">{reviews.length}</span>
        </p>
          <CustomerReview onReviewSubmit={fetchReviews}/>
        {reviews.length > 0 ? (
          <ul className="space-y-4" style={{ maxWidth: '80%' }}>
            {reviews.map((review) => (
              <li key={review.id} className="border p-4">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-bold mr-2">{review.rating}/5</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 fill-current text-yellow-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l2.352 7.166h7.649l-5.541 4.028 2.33 7.137L12 17.914l-6.79 4.527 2.33-7.137-5.54-4.028h7.648z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No reviews available for this course.</p>
        )}
      </div>
    </Layout>
  );
};

export default Reviews;
