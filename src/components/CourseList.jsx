import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses from your database in Supabase
        const fetchCourses = async () => {
            let { data: courses, error } = await supabase
                .from('courses')
                .select('*');
            if (error) console.log('error', error);
            else setCourses(courses);
        }

        fetchCourses();
    }, []);

    return  (
        <div>
            <h1>Courses</h1>
            <p>List of courses</p>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;
