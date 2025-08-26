const ReviewForm = ( { formData }) => {

    return (

           <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Review & Submit</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Name:</strong> {formData.name}</li>
                <li>
                  <strong>Address:</strong> {formData.street}, {formData.city}, {formData.postal}
                </li>
              </ul>
            </div>
    )
}

export default ReviewForm;