
function Home() {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-white font-bold text-5xl">
          Welcome <span className="text-blue-700">{user.email}</span>
        </h1>
      </div>
    </>
  );
}

export default Home;
