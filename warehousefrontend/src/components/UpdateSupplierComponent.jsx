import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/supplierStyles.css';

const UpdateSupplierComponent = () => {
    const { supplierId } = useParams(); // Retrieve the supplier ID from the URL
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/api/suppliers';
    const [supplier, setSupplier] = useState({
        companyName: '',
        contactDetails: '',
        email: '',
        phoneNumber: ''
    });

    // Fetch the current supplier data when the component loads
    useEffect(() => {
        if (supplierId) {
            axios.get(`${API_BASE_URL}/getSupplierById/${supplierId}`)
                .then(response => {
                    setSupplier({
                        companyName: response.data.companyName,
                        contactDetails: response.data.contactDetails,
                        email: response.data.email,
                        phoneNumber: response.data.phoneNumber
                    });
                })
                .catch(error => console.error('Error fetching supplier:', error));
        }
    }, [supplierId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier(prev => ({ ...prev, [name]: value }));
        console.log(name, value);  // Log name and new value for verification
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supplier); // Log the data to be sent
        if (supplierId) {
            try {
                const response = await axios.put(`${API_BASE_URL}/updateSupplier/${supplierId}`, supplier);
                console.log('Supplier Updated:', response.data);
                navigate('/suppliers'); // Redirect to the supplier list after updating
            } catch (error) {
                console.error('Failed to update supplier:', error);
            }
        } else {
            console.error('Supplier ID is undefined');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="companyName" value={supplier.companyName} onChange={handleChange} required />
            <input type="text" name="contactDetails" value={supplier.contactDetails} onChange={handleChange} required />
            <input type="email" name="email" value={supplier.email} onChange={handleChange} required />
            <input type="text" name="phoneNumber" value={supplier.phoneNumber} onChange={handleChange} required />
            <button type="submit">Update Supplier</button>
        </form>
    );
};

export default UpdateSupplierComponent;
