import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    let ignore = false;

    async function fetchCourses() {
      try {
        const response = await getCourses();

        if (!ignore) {
          setCourses(response.data);
        }

      } catch (err) {

        if (!ignore) {
          setError(
              "Unable to load courses. Check the backend and try again."
          );
        }

      } finally {

        if (!ignore) {
          setLoading(false);
        }

      }
    }

    fetchCourses();

    return () => {
      ignore = true;
    };

  }, []);


  if (loading) {
    return <h3>Loading courses...</h3>;
  }


  if (error) {
    return <h3>{error}</h3>;
  }


  return (
      <div>

        <h2>Course Management</h2>

        <h4>Total Courses: {courses.length}</h4>


        {
          courses.length === 0 ? (
              <h3>No courses available.</h3>
          ) : (

              <table>

                <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Credits</th>
                </tr>
                </thead>


                <tbody>

                {
                  courses.map((course)=>(
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.code}</td>
                        <td>{course.title}</td>
                        <td>{course.credits}</td>
                      </tr>
                  ))
                }

                </tbody>

              </table>

          )
        }


      </div>
  );
}