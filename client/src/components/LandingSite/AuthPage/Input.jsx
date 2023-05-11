import PropTypes from "prop-types";

Input.propTypes = {
    field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      req: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
  };
  

function Input({ field }) {
    const name = field.name;
    const placeholder = field.placeholder;
    const required = field.req;
    const type = field.type;
    const value = field.value;
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-white">Your {name}</label>
            <input type={type} name={name} id={name} className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder={placeholder} required={required} value={value} onChange={field.onChange} />
        </div>
    );
}


export { Input };