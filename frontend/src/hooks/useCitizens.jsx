import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'sonner';

const useCitizens = () => {
    const { backendUrl } = useContext(AppContext);
    const [citizens, setCitizens] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchCitizens = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/staff/citizens`, { withCredentials: true });

                if  (data.success) {
                setCitizens(data.citizens);
                } else {
                    toast.error(data.message || "Failed to load citizens");
                }
            } catch (error) {
                toast.error(error.message || "Error connecting to server");
            } finally {
                setLoading(false);
            }
        }
        fetchCitizens();
    }, [backendUrl])

  return {  citizens, loading }
}

export default useCitizens