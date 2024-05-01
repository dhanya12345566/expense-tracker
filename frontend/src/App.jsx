import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/queries/user.query"; // Ensure the path is correct
import { Toaster } from "react-hot-toast";

// Main App component
// - Uses useQuery to fetch the authenticated user data
// - Handles loading and error states
// - Routes to different pages based on user authentication status
function App() {
    const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);

    // Display a loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle the error state appropriately
    if (error) {
        return <div>Error loading data.</div>;
    }

    return (
        <>
            {/* Display the header if user is authenticated */}
            {data?.authUser && <Header />}
            <Routes>
                {/* Define routing based on authentication status */}
                <Route path='/' element={data?.authUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path='/login' element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path='/SignUp' element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route
                    path='/transaction/:id'
                    element={data?.authUser ? <TransactionPage /> : <Navigate to="/login" />}
                />
                {/* Define catch-all route for 404 Not Found page */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            {/* Include Toaster for handling notifications */}
            <Toaster />
        </>
    );
}

export default App;
