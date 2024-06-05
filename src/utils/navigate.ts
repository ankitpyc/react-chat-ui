import { useNavigate } from 'react-router-dom';

const useCustomNavigate = () => {
    const navigate = useNavigate();
    return navigate;
};

export default useCustomNavigate;
