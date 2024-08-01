<article className="p-6 mb-3 text-base border-t border-gray-200">
<footer className="flex justify-between items-center mb-2">
    <div className="flex items-center">
        <p className="inline-flex items-center mr-3 text-sm text-gray-900"><img
                className="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie Green"/>Bonnie Green</p>
        <p className="text-sm text-gray-600"><time pubdate dateTime="2022-03-12"
                title="March 12th, 2022">Mar. 12, 2022</time></p>
    </div>
    <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
        type="button">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
        </svg>
        <span className="sr-only">Comment settings</span>
    </button>
    {/* Dropdown menu */}
    <div id="dropdownComment3"
        className="hidden z-10 w-36 rounded divide-y divide-gray-100 shadow">
        <ul className="py-1 text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
                <a href="#"
                    className="block py-2 px-4 hover:bg-gray-100">Edit</a>
            </li>
            <li>
                <a href="#"
                    className="block py-2 px-4 hover:bg-gray-100">Remove</a>
            </li>
            <li>
                <a href="#"
                    className="block py-2 px-4 hover:bg-gray-100">Report</a>
            </li>
        </ul>
    </div>
</footer>
<p className="text-gray-500">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
<div className="flex items-center mt-4 space-x-4">
    <button type="button"
        className="flex items-center text-sm text-gray-500 hover:underline font-medium">
        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
        </svg>
        Reply
    </button>
</div>
</article>