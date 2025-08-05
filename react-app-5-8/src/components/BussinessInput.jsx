function BussinessInput({ formData, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName || ""}
        onChange={handleChange}
      />

      <select
        name="businessCategory"
        value={formData.businessCategory || ""}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        <option value="IT">IT</option>
        <option value="Retail">Retail</option>
        <option value="Finance">Finance</option>
      </select>

      <textarea
        name="businessDescription"
        placeholder="Business Description"
        value={formData.businessDescription || ""}
        onChange={handleChange}
      ></textarea>
    </>
  );
}

export default BussinessInput;
