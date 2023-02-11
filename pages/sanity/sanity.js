import { createClient } from "next-sanity";

const client = createClient({
    projectId: "8x8qod9z",
    dataset: "production",
    apiVersion: "2023-02-02",
    useCdn: false
});
export default function IndexPage({ students }) {
    return (
        <>
            <header>
                <h1>Sanity + Next.js</h1>
            </header>
            <main>
                <h2>students</h2>
                {students.length > 0 && (
                    <ul>
                        {students.map((student) => (
                            <li key={student._id}>{student?.name}</li>
                        ))}
                    </ul>
                )}
                {!students.length > 0 && <p>No students to show</p>}
                {students.length > 0 && (
                    <div>
                        <pre>{JSON.stringify(students, null, 2)}</pre>
                    </div>
                )}
                {!students.length > 0 && (
                    <div>
                        <div>¯\_(ツ)_/¯</div>
                        <p>
                            Your data will show up here when you've configured everything
                            correctly
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}

export async function getStaticProps() {
    // const students = [
    /* {
      _createdAt: "2022-03-08T09:28:00Z",
      _id: "1f69c53d-418a-452f-849a-e92466bb9c75",
      _rev: "xnBg0xhUDzo561jnWODd5e",
      _type: "student",
      _updatedAt: "2022-03-08T09:28:00Z",
      name: "Capybara"
    } */
    // ];

    const students = await client.fetch(`*[_type == "student"]`);

    return {
        props: {
            students
        }
    };
}