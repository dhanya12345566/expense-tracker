import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/queries/user.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
    // Use GraphQL query to fetch transaction statistics data
    const { data } = useQuery(GET_TRANSACTION_STATISTICS);
    
    // Fetch authenticated user data
    const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

    // Define mutation for logging out the user
    const [logout, { loading, client }] = useMutation(LOGOUT, {
        refetchQueries: ["GetAuthenticatedUser"],
    });

    // State variable to hold chart data
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "$",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                borderRadius: 0,
                spacing: 10,
                cutout: 130,
            },
        ],
    });

    // Update chart data whenever transaction statistics data changes
    useEffect(() => {
        if (data?.categoryStatistics) {
            const categories = data.categoryStatistics.map((stat) => stat.category);
            const totalAmounts = data.categoryStatistics.map((stat) => stat.totalAmount);

            // Define background and border colors based on category
            const backgroundColors = [];
            const borderColors = [];

            // Assign colors for different categories
            categories.forEach((category) => {
                if (category === "saving") {
                    backgroundColors.push("rgba(75, 192, 192, 0.8)");
                    borderColors.push("rgba(75, 192, 192, 0.8)");
                } else if (category === "expense") {
                    backgroundColors.push("rgba(255, 99, 132, 0.8)");
                    borderColors.push("rgba(255, 99, 132, 0.8)");
                } else if (category === "investment") {
                    backgroundColors.push("rgba(54, 162, 235, 0.8)");
                    borderColors.push("rgba(54, 162, 235, 0.8)");
                }
            });

            // Update chart data state
            setChartData((prev) => ({
                labels: categories,
                datasets: [
                    {
                        ...prev.datasets[0],
                        data: totalAmounts,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                    },
                ],
            }));
        }
    }, [data]);

    // Handle user logout
    const handleLogout = async () => {
        // Show a confirmation dialog box
        const confirmLogout = window.confirm("Are you sure you want to exit?");

        // If the user clicks "OK", proceed with logout
        if (confirmLogout) {
            try {
                // Perform logout mutation
                await logout();

                // Reset Apollo client cache
                client.resetStore();
            } catch (error) {
                console.error("Error logging out:", error);
                toast.error(error.message);
            }
        }
    };

    // Render the HomePage component
    return (
        <>
            <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
                <div className="flex items-center">
                    <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
                        Spend wisely, track wisely
                    </p>
                    <img
                        src={authUserData?.authUser.profilePicture}
                        className="w-11 h-11 rounded-full border cursor-pointer"
                        alt="Avatar"
                    />
                    {!loading && (
                        // Render logout button when not loading
                        <MdLogout
                            className="mx-2 w-5 h-5 cursor-pointer"
                            onClick={handleLogout}
                        />
                    )}
                    {/* Loading spinner while logging out */}
                    {loading && (
                        <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
                    )}
                </div>
                <div className="flex flex-wrap w-full justify-center items-center gap-6">
                    {/* Display Doughnut chart if there is transaction statistics data */}
                    {data?.categoryStatistics.length > 0 && (
                        <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
                            <Doughnut data={chartData} />
                        </div>
                    )}
                    {/* Render the TransactionForm component */}
                    <TransactionForm />
                </div>
                {/* Render the Cards component */}
                <Cards />
            </div>
        </>
    );
};
export default HomePage;