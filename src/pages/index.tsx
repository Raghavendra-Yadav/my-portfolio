import Layout from "../components/layout/Layout";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <section className="container mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <p className="mt-4 text-lg">
          Im a passionate web developer, designer, and author. I love building
          websites and creative projects.
        </p>
      </section>

      <section className="container mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold">My Work</h2>
        <p className="mt-4 text-lg">
          Check out my portfolio of projects and creative works.
        </p>
      </section>
    </Layout>
  );
};

export default HomePage;
