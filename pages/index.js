import PostCreate from '../components/postCreate';
import PostList from '../components/postList';

const IndexPage = ({ data }) => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <hr />
      <PostList dataPosts={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8000/posts');
  const data = await res.json();

  return {
      props: {data}
  };
}

export default IndexPage;