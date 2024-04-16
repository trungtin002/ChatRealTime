import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
	
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullname, username, password, email, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullname, username,email, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/v1/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullname, username,email, password, confirmPassword, gender }),
			});

			const data = await res.json();
            console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullname, username,email, password, confirmPassword, gender }) {
	if (!fullname || !username || !password ||!email|| !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

    
	if (password.length < 8 ) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	return true;
}