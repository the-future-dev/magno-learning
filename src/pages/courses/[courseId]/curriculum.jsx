import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../../lib/supabase';
import Layout from '../../../components/Layout';

const Curriculum = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    if (courseId) {
      fetchCurriculum();
    }
  }, [courseId]);

  const fetchCurriculum = async () => {
    try {
      const { data, error } = await supabase
        .from('course_curriculum')
        .select('*')
        .eq('course_id', courseId);

      if (error) throw error;

      setCurriculum(data);
    } catch (error) {
      console.error('Error fetching course curriculum:', error.message);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 mt-8" style={{ marginInline: '15%', width: '70%' }}>
        <h1 className="text-3xl font-bold mb-6">Course Curriculum</h1>
        {curriculum.length > 0 ? (
          <ul className="space-y-4">
            {curriculum.map((item) => (
              <li key={item.id}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No curriculum available for this course.</p>
        )}
      </div>
    </Layout>
  );
};

export default Curriculum;
