export type Course = {
  id: number;
  title: string;
};

export async function getCourses(): Promise<Course[]> {
  const response = await fetch('https://api.codingthailand.com/api/course');
  const courseResponse = await response.json();
  return courseResponse.data;
}
