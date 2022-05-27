import React from "react";

type Props = {
    currentPage: number,
    amountOfPages: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination = (props: Props) => {
    const { currentPage, amountOfPages, setCurrentPage } = props;

    return (
        <div className="flex mx-auto place-content-center mb-6">
            <div onClick={() => setCurrentPage(currentPage - 1)} className={`${currentPage === 1 ? `cursor-not-allowed` : `cursor-pointer`} flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md dark:bg-gray-900 dark:text-gray-600`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            {[...Array(amountOfPages)].map((_, idx) =>
                <div key={idx} onClick={() => setCurrentPage(idx + 1)} className={`pointer-click hidden px-4 py-2 mx-1 ${idx === currentPage - 1 ? `text-orange-700 font-bold` : `text-gray-700`} transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-gray-200`}>
                    {idx + 1}
                </div>)
            }
            <div onClick={() => setCurrentPage(currentPage + 1)} className={`${currentPage === amountOfPages ? `cursor-not-allowed` : `cursor-pointer`} flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md dark:bg-gray-900 dark:text-gray-600`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}