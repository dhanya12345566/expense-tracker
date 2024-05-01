const TransactionFormSkeleton = () => {
    // This functional component represents a skeleton screen
    // for the transaction form when data is being loaded.
    // It uses classes from Tailwind CSS for styling.

    return (
        <div className='h-screen max-w-xl mx-auto py-10'>
            {/* Placeholder for the form header, using animated pulse effect */}
            <h3 className='h-6 bg-gray-200 rounded animate-pulse'></h3>

            {/* Placeholder for form fields in a flex layout */}
            <ul className='mt-5 flex gap-3'>
                <li className='w-full h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse'></li>
                <li className='w-full h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse'></li>
                <li className='w-full h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse'></li>
            </ul>

            {/* More placeholders for form fields */}
            <ul className='mt-5 flex gap-3'>
                <li className='w-full h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse'></li>
                <li className='w-full h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse'></li>
            </ul>
            <ul className='mt-5 flex gap-3'>
                <li className='w-full h-6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse'></li>
            </ul>
        </div>
    );
};

export default TransactionFormSkeleton;
