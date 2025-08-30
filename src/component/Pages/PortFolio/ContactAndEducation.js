const ContactAndEducation=()=>{
    return(
        <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:-translate-y-1 transition-transform">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                </span>
                Contact Information
            </h2>
            <div className="space-y-4">
                <div className="flex items-start">
                <span className="text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>
                <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">maroufulislam.zishan@gmail.com</p>
                </div>
                </div>
                <div className="flex items-start">
                <span className="text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
            </span>
            <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">+880 018102-72303</p>
            </div>
                </div>
                <div className="flex items-start">
            <span className="text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            </span>
            <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">Chattogram, Bangladesh</p>
            </div>
                </div>
        </div>
            </div>
            
            {/* Education */}
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:-translate-y-1 transition-transform">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                </span>
                Education
            </h2>
            <div className="space-y-6">
                <div>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">HSC</h3>
                    <span className="text-blue-600 text-sm font-medium">2024 - 2025</span>
                </div>
                <p className="text-gray-700">Bakolia Govt College, Chattogram</p>
                </div>
                <div>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">SSC</h3>
                    <span className="text-blue-600 text-sm font-medium">2022 - 2023</span>
                </div>
                <p className="text-gray-700">Raipur Gawsia Hasemia Madrasha, Chattogram</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    )
}
export default ContactAndEducation;