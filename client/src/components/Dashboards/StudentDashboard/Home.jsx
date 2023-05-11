
function Home() {

  let student = JSON.parse(localStorage.getItem("student"));

  return (
    <div className="w-full h-screen flex items-center justify-center" >
      <h1 className="text-white font-bold text-5xl" >Welcome <span className="text-blue-500">{student.name}!</span></h1>
    </div>
  )
}

export default Home;
