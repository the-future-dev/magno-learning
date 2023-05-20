import React, { useEffect, useState } from 'react';

import supabase from '../../lib/supabase';

import CourseCard from '../../components/CourseCard';
import Layout from '../../components/Layout';
import { FaSearch } from 'react-icons/fa';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`*, categories:categories_id ( name )`)
        .order('title', { ascending: true });
      
      console.log(data)
      if (error) throw error;

      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };
  
  const fetchCategories = async () => {
    const {data: categories, error} = await supabase
      .from('categories').select('*');
    if (error) console.log('Error fetching categories:', error.message);
    else setCategories(categories);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const filtederCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = async () => {
    try{
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', {ascending: false});

        if (error) throw error;

        setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      //handle search error
    }
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 mt-8">
        <h1 className="text-2xl font-bold mb-4">All Courses</h1>
        <div className="flex justify-between items-center space-x-4 mb-4">
          <div className="flex-1 relative mr-4">
            <input
              type="text"
              placeholder='Search courses...'
              className='w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-base px-4 py-2'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch 
              className='absolute right-3 top-3 text-gray-400 cursor-pointer'
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtederCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              category={course.categories !== undefined ? course.categories.name : ''}
              price={course.price}
              id={course.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;