import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "C:/Users/USER/OneDrive/Desktop/redo/frontend/graphql/queries/user.query";

const Cards = () => {
    // Query to get all transactions
    const { data, loading } = useQuery(GET_TRANSACTIONS);
    
    // Query to get authenticated user's data
    const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
    
    // Query to get the authenticated user along with their transactions
    const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
        variables: {
            userId: authUser?.authUser?._id, // Passes the authenticated user's ID as a variable
        },
    });

    // Log retrieved data for debugging purposes
    console.log("userAndTransactions:", userAndTransactions);
    console.log("cards:", data);

    // Render the Cards component
    return (
        <div className='w-full px-10 min-h-[40vh]'>
            {/* Display the title "History" */}
            <p className='text-5xl font-bold text-center my-10'>History</p>

            {/* Create a grid layout to display each transaction as a Card */}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
                {/* Render each transaction as a Card if data is available */}
                {!loading &&
                    data.transactions.map((transaction) => (
                        <Card key={transaction._id} transaction={transaction} authUser={authUser.authUser} />
                    ))
                }
            </div>

            {/* If there are no transactions, display a message */}
            {!loading && data?.transactions?.length === 0 && (
                <p className='text-2xl font-bold text-center w-full'>No transaction history found.</p>
            )}
        </div>
    );
};

export default Cards;
