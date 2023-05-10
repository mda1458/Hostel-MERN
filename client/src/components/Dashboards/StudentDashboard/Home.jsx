
function Home() {

  let student = JSON.parse(localStorage.getItem("student"));

  return (
    <div className="w-full h-screen flex items-center justify-center" >
      <h1 className="text-gray-900 font-bold text-5xl" >Welcome <span className="text-blue-500">{student.name}!</span></h1>
      <p>{
          // for loop for printing all key value pairs of student object
          Object.keys(student).map((key, index) => {
            return <p key={index}>{key} : {student[key]}</p>
          }
          )
        }</p>
    </div>
  )
}

export default Home;
