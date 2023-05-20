import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import supabase from '../../../lib/supabase';

const Overview = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
  
      if (courseError) throw courseError;
  
      const { data: curriculumData, error: curriculumError } = await supabase
        .from('course_curriculum')
        .select('*')
        .eq('course_id', courseId);
  
      if (curriculumError) throw curriculumError;
  
      const courseWithCurriculum = { ...courseData, curriculum: curriculumData };
      setCourse(courseWithCurriculum);
      console.log(courseWithCurriculum);
    } catch (error) {
      console.error('Error fetching course:', error.message);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-500 mb-4">{course.description}</p>
      <p className="text-gray-500 mb-4">Category: {course.category}</p>
      <p className="text-gray-500 mb-4">Price: ${course.price}</p>

      <div className="border border-gray-300 rounded p-4">
        <h2 className="text-lg font-bold mb-2">Course Curriculum</h2>
        {(course.curriculum) ? course.curriculum.map((item, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-base font-bold">{item.title}</h3>
            <ul className="ml-4 list-disc">
              <li>{item.content}</li>
            </ul>
          </div>
        )) : <></>}
      </div>
    </div>
  );
};

export default Overview;
