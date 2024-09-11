import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterStudent() {
  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let student = {
        name: name,
        cms_id: cms,
        room_no: room_no,
        batch: batch,
        dept: dept,
        course: course,
        email: email,
        father_name: fatherName,
        contact: contact,
        address: address,
        dob: dob,
        cnic: cnic,
        hostel: hostel,
        password: password
      };
      const res = await fetch("http://localhost:3000/api/student/register-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      })
      const data = await res.json();

      if (data.success) {
        toast.success(
          'Student ' + data.student.name + ' Registered Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setCms("");
        setName("");
        setRoomNo("");
        setBatch("");
        setDept("");
        setCourse("");
        setEmail("");
        setFatherName("");
        setContact("");
        setAddress("");
        setDob("");
        setCnic("");
        setPassword("");
        setLoading(false);
      } else {
        // console.log(cms);
        data.errors.forEach((err) => {
          toast.error(
            err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          })
        })
        setLoading(false);

      }
    } catch (err) {
      toast.error(
        err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      )
      setLoading(false);
    }
  };

  const hostel = JSON.parse(localStorage.getItem("hostel")).name;
  const [cms, setCms] = useState();
  const [name, setName] = useState();
  const [room_no, setRoomNo] = useState();
  const [batch, setBatch] = useState();
  const [dept, setDept] = useState();
  const [course, setCourse] = useState();
  const [email, setEmail] = useState();
  const [fatherName, setFatherName] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();
  const [cnic, setCnic] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Register Student
      </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form method="post" onSubmit={registerStudent} className="flex flex-col gap-3">
          <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "cms",
                placeholder: "Student CMS",
                type: "number",
                req: true,
                value: cms,
                onChange: (e) => setCms(e.target.value),
              }}
            />
            <Input
              field={{
                name: "dob",
                placeholder: "Student dob",
                type: "date",
                req: true,
                value: dob,
                onChange: (e) => setDob(e.target.value),
              }}
            />
            <Input
              field={{
                name: "cnic",
                placeholder: "Student CNIC",
                type: "text",
                req: true,
                value: cnic,
                onChange: (e) => setCnic(e.target.value),
              }}
            />
          </div>
          <div className="flex gap-5 w-full flex-wrap justify-center">
            <Input
              field={{
                name: "email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "contact",
                placeholder: "Student Contact",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "father_name",
                placeholder: "Student's Father Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
          </div>
          <div className="mx-12">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-5 w-full justify-center">
            <Input
              field={{
                name: "room",
                placeholder: "Student Room",
                type: "number",
                req: true,
                value: room_no,
                onChange: (e) => setRoomNo(e.target.value),
              }}
            />
            <Input
              field={{
                name: "hostel",
                placeholder: "Student Hostel",
                type: "text",
                req: true,
                value: hostel,
                disabled: true,
              }}
            />
            <Input
              field={{
                name: "dept",
                placeholder: "Student Department",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Input
              field={{
                name: "course",
                placeholder: "Student Course",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            />
            <Input
              field={{
                name: "batch",
                placeholder: "Student Batch",
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
              }}
            />
          </div>
          <div className="mx-12">
            <Input
              field={{
                name: "password",
                placeholder: "Student Password",
                type: "password",
                req: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <>
                  <Loader /> Registering...
                </>
              ) : (
                <span>Register Student</span>
              )}
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;
