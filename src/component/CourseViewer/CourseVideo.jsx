function CourseVideo({ url }) {
  return (
    <>
      <iframe width="800" height="460" src={url} allowFullScreen frameBorder="0"></iframe>
    </>
  );
}
export default CourseVideo;