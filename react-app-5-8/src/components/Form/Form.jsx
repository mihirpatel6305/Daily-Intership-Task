import { useState } from "react";
import BussinessInput from "../BussinessInput";
import PersonalInput from "../PersonalInput";
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    companyName: "",
    businessCategory: "",
    businessDescription: "",
    dob: "",
    gender: "",
    bio: "",
  });
  const [isBussiness, setIsBussiness] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("formData>>", formData);
    console.log("form is submited");
  }

  function handleChange(e) {
    const name = e.target?.name;
    const value = e.target?.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsBussiness((prev) => !prev);
          setFormData({
            name: "",
            email: "",
            number: "",
            companyName: "",
            businessCategory: "",
            businessDescription: "",
            dob: "",
            gender: "",
            bio: "",
          });
        }}
      >
        {isBussiness ? "Go with Personal" : "Go with Bussiness"}
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          placeholder="Enter Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          placeholder="Enter Email Address"
          onChange={handleChange}
        />
        <input
          type="number"
          name="number"
          value={formData.number || ""}
          placeholder="Contact Number"
          onChange={handleChange}
        />
        {isBussiness ? (
          <BussinessInput formData={formData} handleChange={handleChange} />
        ) : (
          <PersonalInput formData={formData} handleChange={handleChange} />
        )}
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default Form;
