import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import supabase from '../../lib/supabase';
import Layout from '../../components/Layout';

const CoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;

      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error.message);
    }
  };

  if (!course) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='flex justify-center' style={{ marginInline: '15%', width: '70%' }}>
        <div className="container mx-auto py-8 mt-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600">Category: {course.category}</p>
          <p className="text-gray-600">Price: ${course.price}</p>
          <p className="mt-6 text-gray-800">{course.description}</p>

          <div className="mt-8 space-x-4">
            <Link href={`/courses/${courseId}/overview`} passHref>
              <p className="text-blue-500 font-semibold hover:underline">Overview</p>
            </Link>
            <span className="text-gray-400 mx-2">|</span>
            <Link href={`/courses/${courseId}/curriculum`} passHref>
              <p className="text-blue-500 font-semibold hover:underline">Curriculum</p>
            </Link>
            <span className="text-gray-400 mx-2">|</span>
            <Link href={`/courses/${courseId}/reviews`} passHref>
              <p className="text-blue-500 font-semibold hover:underline">Reviews</p>
            </Link>
            <span className="text-gray-400 mx-2">|</span>
            <Link href={`/courses/${courseId}/enroll`} passHref>
              <p className="text-blue-500 font-semibold hover:underline">Enroll</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;