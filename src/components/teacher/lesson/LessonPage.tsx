import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/lib/firebase'; // Adjust the import based on your Firebase setup
import { doc, getDoc } from 'firebase/firestore';

export function LessonPage() {
  const router = useRouter();
  const { lessonId } = router.query;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonId) return;
      const lessonDoc = doc(db, 'lessons', lessonId);
      const lessonSnapshot = await getDoc(lessonDoc);
      if (lessonSnapshot.exists()) {
        setLesson(lessonSnapshot.data());
      } else {
        console.error('No such lesson!');
      }
      setLoading(false);
    };
    fetchLesson();
  }, [lessonId]);

  if (loading) return <div>Loading...</div>;
  if (!lesson) return <div>No lesson found.</div>;

  return (
    <div className="lesson-page">
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      <h2>Learning Objectives</h2>
      <ul>
        {lesson.objectives.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
      <h2>Resources</h2>
      <ul>
        {lesson.resources.map((resourceId) => (
          <li key={resourceId}>Resource ID: {resourceId}</li> // Replace with actual resource fetching logic
        ))}
      </ul>
      <h2>Assignments</h2>
      <ul>
        {lesson.assignments.map((assignmentId) => (
          <li key={assignmentId}>Assignment ID: {assignmentId}</li> // Replace with actual assignment fetching logic
        ))}
      </ul>
    </div>
  );
}
