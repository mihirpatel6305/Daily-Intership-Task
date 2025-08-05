function PersonalInput({ formData, handleChange }) {
  return (
    <>
      <input
        type="date"
        name="dob"
        placeholder="Date of Birth"
        value={formData.dob || ""}
        onChange={handleChange}
      />

      <select
        name="gender"
        value={formData.gender || ""}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio || ""}
        onChange={handleChange}
      ></textarea>
    </>
  );
}

export default PersonalInput;
