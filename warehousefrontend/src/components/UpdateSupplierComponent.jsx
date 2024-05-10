import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const UpdateSupplierComponent = () => {
    const { supplierId } = useParams(); // استرجاع المعرف من URL
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/api/suppliers';
    const [supplier, setSupplier] = useState({
        companyName: '',          // تغيير من name إلى companyName للتطابق مع الخادم
        contactDetails: '',       // الاحتفاظ بنفس الاسم
        email: '',                // الاحتفاظ بنفس الاسم
        phoneNumber: ''           // الاحتفاظ بنفس الاسم
    });

    // تحميل بيانات المورد الحالية عند تحميل المكون
    useEffect(() => {
        if (supplierId) {
            axios.get(`${API_BASE_URL}/getSupplierById/${supplierId}`)
                .then(response => {
                    setSupplier({
                        companyName: response.data.companyName,
                        contactDetails: response.data.contactDetails,
                        email: response.data.email,
                        phoneNumber: response.data.phoneNumber
                    }); // تحديث حالة النموذج بالبيانات المسترجعة
                })
                .catch(error => console.error('Error fetching supplier:', error));
        }
    }, [supplierId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier(prev => ({ ...prev, [name]: value }));
        console.log(name, value);  // لطباعة الاسم والقيمة الجديدة للتحقق
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supplier); // طباعة البيانات التي ستُرسل
        if (supplierId) {
            axios.put(`${API_BASE_URL}/updateSupplier/${supplierId}`, supplier)
                .then(response => {
                    console.log('Supplier Updated:', response.data);
                    navigate('/suppliers'); // العودة إلى قائمة الموردين بعد التحديث
                })
                .catch(error => {
                    console.error('Failed to update supplier:', error);
                });
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
