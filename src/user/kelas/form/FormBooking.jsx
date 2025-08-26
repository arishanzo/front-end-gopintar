const FormBooking = ( { formData, handleChange }) => {

    return (

         <div>
              <h2 className="text-xl font-semibold mb-4">Step== 2: Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-green-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-green-500"
                />
                <input
                  type="text"
                  name="postal"
                  placeholder="Postal Code"
                  value={formData.postal}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-green-500"
                />
              </div>
            </div>
    )
}

export default FormBooking;